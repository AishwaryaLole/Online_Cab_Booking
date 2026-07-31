package com.cabbooking.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.cabbooking.dto.RideRequestDTO;
import com.cabbooking.dto.RideResponseDTO;
import com.cabbooking.entities.Ride;
import com.cabbooking.entities.User;
import com.cabbooking.enums.RideStatus;
import com.cabbooking.exception.ResourceNotFoundException;
import com.cabbooking.repository.RideRepository;
import com.cabbooking.repository.UserRepository;

@Service
public class RideServiceImpl implements RideService {

    private final RideRepository rideRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    // Constructor Injection
    public RideServiceImpl(RideRepository rideRepository,
                           UserRepository userRepository,
                           ModelMapper modelMapper) {

        this.rideRepository = rideRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }
    @Override
    public RideResponseDTO bookRide(RideRequestDTO request) {

        User passenger = userRepository.findById(request.getPassengerId())
                .orElseThrow(() -> new ResourceNotFoundException("Passenger not found"));

        Ride ride = new Ride();

        ride.setPassenger(passenger);
        ride.setPickupLocation(request.getPickupLocation());
        ride.setPickupLatitude(request.getPickupLatitude());
        ride.setPickupLongitude(request.getPickupLongitude());

        ride.setDropLocation(request.getDropLocation());
        ride.setDropLatitude(request.getDropLatitude());
        ride.setDropLongitude(request.getDropLongitude());

        ride.setStatus(RideStatus.REQUESTED);

        Ride savedRide = rideRepository.save(ride);

        RideResponseDTO response = new RideResponseDTO();

        response.setId(savedRide.getId());
        response.setPassengerId(savedRide.getPassenger().getId());

        if (savedRide.getDriver() != null) {
            response.setDriverId(savedRide.getDriver().getId());
        }

        response.setPickupLocation(savedRide.getPickupLocation());
        response.setDropLocation(savedRide.getDropLocation());
        response.setDistanceKm(savedRide.getDistanceKm());
        response.setDurationMin(savedRide.getDurationMin());
        response.setFare(savedRide.getFare());
        response.setStatus(savedRide.getStatus());
        response.setCreatedAt(savedRide.getCreatedAt());

        return response;
    }

    @Override
    public RideResponseDTO getRideById(Long id) {

        Ride ride = rideRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

        RideResponseDTO response = modelMapper.map(ride, RideResponseDTO.class);

        response.setPassengerId(ride.getPassenger().getId());

        if (ride.getDriver() != null) {
            response.setDriverId(ride.getDriver().getId());
        }

        return response;
    }

    @Override
    public List<RideResponseDTO> getRideHistory(Long passengerId) {

        List<Ride> rides = rideRepository.findByPassenger_Id(passengerId);

        return rides.stream()
                .map(ride -> {

                    RideResponseDTO response = modelMapper.map(ride, RideResponseDTO.class);

                    response.setPassengerId(ride.getPassenger().getId());

                    if (ride.getDriver() != null) {
                        response.setDriverId(ride.getDriver().getId());
                    }

                    return response;
                })
                .toList();
    }

    @Override
    public RideResponseDTO cancelRide(Long id) {

        Ride ride = rideRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

        ride.setStatus(RideStatus.CANCELLED);

        Ride updatedRide = rideRepository.save(ride);

        RideResponseDTO response = modelMapper.map(updatedRide, RideResponseDTO.class);

        response.setPassengerId(updatedRide.getPassenger().getId());

        if (updatedRide.getDriver() != null) {
            response.setDriverId(updatedRide.getDriver().getId());
        }

        return response;
    }

    @Override
    public RideResponseDTO startRide(Long id) {

        Ride ride = rideRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

        ride.setStatus(RideStatus.IN_PROGRESS);

        Ride updatedRide = rideRepository.save(ride);

        RideResponseDTO response = modelMapper.map(updatedRide, RideResponseDTO.class);

        response.setPassengerId(updatedRide.getPassenger().getId());

        if (updatedRide.getDriver() != null) {
            response.setDriverId(updatedRide.getDriver().getId());
        }

        return response;
    }

    @Override
    public RideResponseDTO completeRide(Long id) {

        Ride ride = rideRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

        ride.setStatus(RideStatus.COMPLETED);

        Ride updatedRide = rideRepository.save(ride);

        RideResponseDTO response = modelMapper.map(updatedRide, RideResponseDTO.class);

        response.setPassengerId(updatedRide.getPassenger().getId());

        if (updatedRide.getDriver() != null) {
            response.setDriverId(updatedRide.getDriver().getId());
        }

        return response;
    }
}