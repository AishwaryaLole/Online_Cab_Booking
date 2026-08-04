package com.cabbooking.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.cabbooking.dto.RideRequestDTO;
import com.cabbooking.dto.RideResponseDTO;
import com.cabbooking.entities.Driver;
import com.cabbooking.entities.DriverLocation;
import com.cabbooking.entities.Ride;
import com.cabbooking.entities.User;
import com.cabbooking.enums.DriverStatus;
import com.cabbooking.enums.PaymentMethod;
import com.cabbooking.enums.PaymentStatus;
import com.cabbooking.enums.RideStatus;
import com.cabbooking.exception.BadRequestException;
import com.cabbooking.exception.ResourceNotFoundException;
import com.cabbooking.repository.DriverRepository;
import com.cabbooking.repository.PaymentRepository;
import com.cabbooking.repository.RideRepository;
import com.cabbooking.repository.UserRepository;

@Service
public class RideServiceImpl implements RideService {

	// Ride statuses that mean a driver is currently busy with a ride
	private static final List<RideStatus> ACTIVE_STATUSES =
			Arrays.asList(RideStatus.ASSIGNED, RideStatus.ACCEPTED, RideStatus.IN_PROGRESS);

	// Fare formula - kept in sync with the estimate shown on the frontend's BookRide page
	private static final double BASE_FARE = 12.0;
	private static final double RATE_PER_KM = 14.0;

	// Only auto-assign a driver whose last known location is within this
	// radius of the pickup point - "nearby" instead of "just anyone free".
	private static final double MAX_ASSIGN_RADIUS_KM = 15.0;

	private final RideRepository rideRepository;
	private final UserRepository userRepository;
	private final DriverRepository driverRepository;
	private final PaymentRepository paymentRepository;
	private final ModelMapper modelMapper;

	// Constructor Injection
	public RideServiceImpl(RideRepository rideRepository, UserRepository userRepository,
			DriverRepository driverRepository, PaymentRepository paymentRepository, ModelMapper modelMapper) {
		this.rideRepository = rideRepository;
		this.userRepository = userRepository;
		this.driverRepository = driverRepository;
		this.paymentRepository = paymentRepository;
		this.modelMapper = modelMapper;
	}

	@Override
	public RideResponseDTO bookRide(RideRequestDTO request) {
		// Get passenger from database
		User passenger = userRepository.findById(request.getPassengerId())
				.orElseThrow(() -> new ResourceNotFoundException("Passenger not found"));

		// Create new ride object
		Ride ride = new Ride();
		ride.setPassenger(passenger);

		// Set pickup details
		ride.setPickupLocation(request.getPickupLocation());
		ride.setPickupLatitude(request.getPickupLatitude());
		ride.setPickupLongitude(request.getPickupLongitude());

		// Set drop details
		ride.setDropLocation(request.getDropLocation());
		ride.setDropLatitude(request.getDropLatitude());
		ride.setDropLongitude(request.getDropLongitude());

		// Compute the authoritative fare server-side (never trust a client-supplied fare)
		Double distanceKm = request.getDistanceKm();
		ride.setDistanceKm(distanceKm);
		ride.setDurationMin(request.getDurationMin());
		ride.setFare(BASE_FARE + (distanceKm != null ? distanceKm * RATE_PER_KM : 0.0));

		PaymentMethod method = request.getPaymentMethod() != null ? request.getPaymentMethod() : PaymentMethod.CASH;
		ride.setPaymentMethod(method);

		if (method == PaymentMethod.CASH) {
			// Cash rides pay the driver at drop-off, so we can match a nearby
			// driver and start the trip right away.
			assignNearestDriverOrLeaveRequested(ride);
		} else {
			// UPI / CARD must be paid up front - no driver is matched until
			// the payment succeeds (see assignNearestDriverAfterPayment).
			ride.setStatus(RideStatus.PAYMENT_PENDING);
		}

		Ride savedRide = rideRepository.save(ride);
		return toResponse(savedRide);
	}

	@Override
	public RideResponseDTO getRideById(Long id) {
		Ride ride = rideRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Ride not found"));
		return toResponse(ride);
	}

	@Override
	public List<RideResponseDTO> getRideHistory(Long passengerId) {
		List<Ride> rides = rideRepository.findByPassenger_Id(passengerId);
		return rides.stream().map(this::toResponse).toList();
	}

	@Override
	public RideResponseDTO cancelRide(Long id) {
		Ride ride = rideRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

		ride.setStatus(RideStatus.CANCELLED);
		Ride updatedRide = rideRepository.save(ride);
		return toResponse(updatedRide);
	}

	@Override
	public RideResponseDTO startRide(Long id) {
		Ride ride = rideRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

		ride.setStatus(RideStatus.IN_PROGRESS);
		Ride updatedRide = rideRepository.save(ride);
		return toResponse(updatedRide);
	}

	@Override
	public RideResponseDTO completeRide(Long id) {
		Ride ride = rideRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

		// The ride can only be marked COMPLETED once a successful payment
		// exists for it - for CASH that means the driver has tapped "Collect
		// cash payment" first; for UPI/CARD it was already paid before booking.
		boolean paid = isPaid(id);
		if (!paid) {
			String message = resolveMethod(ride) == PaymentMethod.CASH
					? "Collect the cash payment before completing this ride."
					: "Payment for this ride has not been completed yet.";
			throw new BadRequestException(message);
		}

		ride.setStatus(RideStatus.COMPLETED);
		Ride updatedRide = rideRepository.save(ride);
		return toResponse(updatedRide);
	}

	@Override
	public List<RideResponseDTO> getAssignedRides(Long driverId) {
		// Includes ASSIGNED (pending accept), ACCEPTED, and IN_PROGRESS so the
		// ride stays visible on the driver's screen through the whole trip,
		// not just while it's waiting to be accepted.
		List<Ride> rides = rideRepository.findByDriver_IdAndStatusIn(driverId, ACTIVE_STATUSES);
		return rides.stream().map(this::toResponse).toList();
	}

	@Override
	public RideResponseDTO acceptRide(Long id) {
		Ride ride = rideRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

		ride.setStatus(RideStatus.ACCEPTED);
		Ride updatedRide = rideRepository.save(ride);
		return toResponse(updatedRide);
	}

	@Override
	public RideResponseDTO rejectRide(Long id) {
		Ride ride = rideRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

		Long rejectingDriverId = ride.getDriver() != null ? ride.getDriver().getId() : null;
		ride.setDriver(null);
		ride.setStatus(RideStatus.REQUESTED);

		// Try to hand the ride to another nearby driver instead of leaving it
		// stuck as REQUESTED with nobody looking at it.
		findNearestAvailableDriver(ride.getPickupLatitude(), ride.getPickupLongitude(), rejectingDriverId)
				.ifPresent(nextDriver -> {
					ride.setDriver(nextDriver);
					ride.setStatus(RideStatus.ASSIGNED);
				});

		Ride updatedRide = rideRepository.save(ride);
		return toResponse(updatedRide);
	}

	@Override
	public List<RideResponseDTO> getRideHistoryByDriver(Long driverId) {
		List<Ride> rides = rideRepository.findByDriver_Id(driverId);
		return rides.stream().map(this::toResponse).toList();
	}

	@Override
	public RideResponseDTO assignNearestDriverAfterPayment(Long rideId) {
		Ride ride = rideRepository.findById(rideId)
				.orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

		if (ride.getStatus() == RideStatus.PAYMENT_PENDING) {
			assignNearestDriverOrLeaveRequested(ride);
			ride = rideRepository.save(ride);
		}

		return toResponse(ride);
	}

	// ==========================
	// Helpers
	// ==========================

	private void assignNearestDriverOrLeaveRequested(Ride ride) {
		Optional<Driver> nearest =
				findNearestAvailableDriver(ride.getPickupLatitude(), ride.getPickupLongitude(), null);

		if (nearest.isPresent()) {
			ride.setDriver(nearest.get());
			ride.setStatus(RideStatus.ASSIGNED);
		} else {
			// No driver nearby right now - ride stays REQUESTED until a
			// driver becomes available closer to this pickup point.
			ride.setStatus(RideStatus.REQUESTED);
		}
	}

	// Picks the closest APPROVED driver (by straight-line distance from their
	// last known location to the pickup point) who isn't already busy with
	// another active ride, and who is within MAX_ASSIGN_RADIUS_KM. Drivers
	// with no location on file are skipped - we can't call them "nearby".
	private Optional<Driver> findNearestAvailableDriver(Double pickupLat, Double pickupLng, Long excludeDriverId) {
		if (pickupLat == null || pickupLng == null) {
			return Optional.empty();
		}

		Driver best = null;
		double bestDistanceKm = Double.MAX_VALUE;

		for (Driver driver : driverRepository.findAllByStatus(DriverStatus.APPROVED)) {
			if (excludeDriverId != null && excludeDriverId.equals(driver.getId())) {
				continue;
			}
			if (rideRepository.existsByDriver_IdAndStatusIn(driver.getId(), ACTIVE_STATUSES)) {
				continue; // already busy with another ride
			}

			DriverLocation location = driver.getDriverLocation();
			if (location == null || location.getLatitude() == null || location.getLongitude() == null) {
				continue; // no location on file - can't judge distance
			}

			double distanceKm = haversineKm(pickupLat, pickupLng, location.getLatitude(), location.getLongitude());
			if (distanceKm <= MAX_ASSIGN_RADIUS_KM && distanceKm < bestDistanceKm) {
				bestDistanceKm = distanceKm;
				best = driver;
			}
		}

		return Optional.ofNullable(best);
	}

	// Great-circle (haversine) distance between two lat/lng points, in km.
	private double haversineKm(double lat1, double lon1, double lat2, double lon2) {
		final double earthRadiusKm = 6371.0;
		double dLat = Math.toRadians(lat2 - lat1);
		double dLon = Math.toRadians(lon2 - lon1);
		double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
				+ Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
				* Math.sin(dLon / 2) * Math.sin(dLon / 2);
		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return earthRadiusKm * c;
	}

	private PaymentMethod resolveMethod(Ride ride) {
		return ride.getPaymentMethod() != null ? ride.getPaymentMethod() : PaymentMethod.CASH;
	}

	private boolean isPaid(Long rideId) {
		return paymentRepository.findByRideId(rideId)
				.map(payment -> payment.getPaymentStatus() == PaymentStatus.SUCCESS)
				.orElse(false);
	}

	private RideResponseDTO toResponse(Ride ride) {
		RideResponseDTO response = new RideResponseDTO();

		response.setId(ride.getId());
		response.setPassengerId(ride.getPassenger().getId());

		if (ride.getDriver() != null) {
			response.setDriverId(ride.getDriver().getId());
		}

		response.setPickupLocation(ride.getPickupLocation());
		response.setDropLocation(ride.getDropLocation());
		response.setDistanceKm(ride.getDistanceKm());
		response.setDurationMin(ride.getDurationMin());
		response.setFare(ride.getFare());
		response.setStatus(ride.getStatus());
		response.setPaymentMethod(resolveMethod(ride));
		response.setPaid(isPaid(ride.getId()));
		response.setCreatedAt(ride.getCreatedAt());

		return response;
	}
}
