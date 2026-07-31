package com.cabbooking.services;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.Comparator;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cabbooking.dto.BookingAdminResponseDto;
import com.cabbooking.dto.DriverReportDto;
import com.cabbooking.dto.DriverReportItemDto;
import com.cabbooking.dto.DriverStatusUpdateRequest;
import com.cabbooking.dto.DriverSummaryDto;
import com.cabbooking.dto.RevenueReportDto;
import com.cabbooking.dto.RevenueSummaryDto;
import com.cabbooking.dto.RevenueTransactionDto;
import com.cabbooking.dto.RideCancellationRequest;
import com.cabbooking.dto.UserUpdateRequest;
import com.cabbooking.entities.Driver;
import com.cabbooking.entities.Payment;
import com.cabbooking.entities.Ride;
import com.cabbooking.entities.User;
import com.cabbooking.entities.Vehicle;
import com.cabbooking.enums.DriverStatus;
import com.cabbooking.enums.PaymentStatus;
import com.cabbooking.enums.RideStatus;
import com.cabbooking.exception.BadRequestException;
import com.cabbooking.exception.ResourceNotFoundException;
import com.cabbooking.repository.DriverLocationRepository;
import com.cabbooking.repository.DriverRepository;
import com.cabbooking.repository.PaymentRepository;
import com.cabbooking.repository.RideRepository;
import com.cabbooking.repository.UserRepository;
import com.cabbooking.repository.VehicleRepository;
import com.cabbooking.entities.Rating;
import com.cabbooking.repository.RatingRepository;

@Service
public class AdminServiceImpl implements IAdminService {

    private final DriverRepository driverRepository;
    private final UserRepository userRepository;
    private final RideRepository rideRepository;
    private final PaymentRepository paymentRepository;
    private final RatingRepository ratingRepository;
    private final DriverLocationRepository driverLocationRepository;
    private final VehicleRepository vehicleRepository;

    public AdminServiceImpl(DriverRepository driverRepository,
                            UserRepository userRepository,
                            RideRepository rideRepository,
                            PaymentRepository paymentRepository,
                            RatingRepository ratingRepository,
                            DriverLocationRepository driverLocationRepository,
                            VehicleRepository vehicleRepository) {
        this.driverRepository = driverRepository;
        this.userRepository = userRepository;
        this.rideRepository = rideRepository;
        this.paymentRepository = paymentRepository;
        this.ratingRepository = ratingRepository;
        this.vehicleRepository =  vehicleRepository;
        this.driverLocationRepository =  driverLocationRepository;
    }

    @Override
    @Transactional
    public Driver approveDriver(Long driverId) {
        Driver driver = findDriverOrThrow(driverId);

        if (driver.getStatus() == DriverStatus.APPROVED) {
            return driver;
        }

        driver.setStatus(DriverStatus.APPROVED);
        driver.setAvailability(true);

        return driverRepository.saveDriver(driver);
    }

    @Override
    @Transactional
    public Driver blockDriver(Long driverId) {
        Driver driver = findDriverOrThrow(driverId);

        if (driver.getStatus() == DriverStatus.BLOCKED) {
            return driver;
        }

        driver.setStatus(DriverStatus.BLOCKED);
        driver.setAvailability(false);

        return driverRepository.saveDriver(driver);
    }

    @Override
    @Transactional
    public Driver updateDriverStatus(Long driverId, DriverStatusUpdateRequest request) {
        if (request == null || request.getStatus() == null) {
            throw new BadRequestException("Driver status is required.");
        }

        Driver driver = findDriverOrThrow(driverId);
        DriverStatus requestedStatus = request.getStatus();

        if (requestedStatus == DriverStatus.APPROVED) {
            driver.setAvailability(true);
        } else if (requestedStatus == DriverStatus.BLOCKED) {
            driver.setAvailability(false);
        }

        driver.setStatus(requestedStatus);

        return driverRepository.saveDriver(driver);
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAllUsers();
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserById(Long userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
    }

    @Override
    @Transactional
    public User updateUser(Long userId, UserUpdateRequest request) {
        if (request == null) {
            throw new BadRequestException("User update request is required.");
        }

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));

        if (request.getName() != null && !request.getName().isBlank()) {
            user.setName(request.getName());
        }
        if (request.getPhone() != null && !request.getPhone().isBlank()) {
            user.setPhone(request.getPhone());
        }
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            user.setEmail(request.getEmail());
        }
        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }
        if (request.getIsVerified() != null) {
            user.setIsVerified(request.getIsVerified());
        }

        return userRepository.saveUser(user);
    }

    @Override
@Transactional
public void deleteUser(Long userId) {

    User user = userRepository.findByUserId(userId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("User not found with id " + userId));

    // ============================
    // Passenger Rides
    // ============================

    List<Ride> userRides = rideRepository.findByPassenger_Id(userId);

    boolean hasActiveRide = userRides.stream().anyMatch(ride ->
            ride.getStatus() == RideStatus.REQUESTED ||
            ride.getStatus() == RideStatus.ACCEPTED ||
            ride.getStatus() == RideStatus.ASSIGNED ||
            ride.getStatus() == RideStatus.IN_PROGRESS);

    if (hasActiveRide) {
        throw new BadRequestException(
                "User cannot be deleted because the user has an active ride.");
    }

    boolean hasIncompleteRide = userRides.stream().anyMatch(ride ->
            ride.getStatus() != RideStatus.COMPLETED &&
            ride.getStatus() != RideStatus.CANCELLED);

    if (hasIncompleteRide) {
        throw new BadRequestException(
                "User cannot be deleted because the user has incomplete rides.");
    }

    boolean hasPendingPayment = paymentRepository.findByRidePassengerId(userId)
            .stream()
            .anyMatch(payment ->
                    payment.getPaymentStatus() == PaymentStatus.PENDING);

    if (hasPendingPayment) {
        throw new BadRequestException(
                "User cannot be deleted because pending payments exist.");
    }

    // ============================
    // Delete Passenger Rides
    // ============================

    for (Ride ride : userRides) {

        if (ride.getPayment() != null) {
            paymentRepository.delete(ride.getPayment());
        }

        if (ride.getRating() != null) {
            ratingRepository.delete(ride.getRating());
        }

        rideRepository.delete(ride);
    }

    // ============================
    // Delete Passenger Ratings
    // ============================

    ratingRepository.findAllByPassenger_Id(userId)
            .forEach(ratingRepository::delete);

    // ============================
    // Delete Driver (if user is driver)
    // ============================

    if (user.getDriver() != null) {

        Driver driver = user.getDriver();

        // Delete rides assigned to driver
        List<Ride> driverRides = rideRepository.findByDriver_Id(driver.getId());

        for (Ride ride : driverRides) {

            if (ride.getPayment() != null) {
                paymentRepository.delete(ride.getPayment());
            }

            if (ride.getRating() != null) {
                ratingRepository.delete(ride.getRating());
            }

            rideRepository.delete(ride);
        }

        // Delete ratings received by driver
        ratingRepository.findAllByDriver_Id(driver.getId())
                .forEach(ratingRepository::delete);

        // Delete vehicles
        vehicleRepository.deleteByDriver_Id(driver.getId());

        // Delete driver location
        driverLocationRepository.deleteByDriver_Id(driver.getId());

        // Break User <-> Driver relationship
        user.setDriver(null);
        driver.setUser(null);

        userRepository.saveUser(user);

        // Delete driver
        driverRepository.delete(driver);
    }

    // ============================
    // Finally Delete User
    // ============================

    userRepository.delete(user);
}

    @Override
    @Transactional
    public Ride cancelRide(Long rideId, RideCancellationRequest request) {
        if (request == null || request.getReason() == null || request.getReason().isBlank()) {
            throw new BadRequestException("Cancellation reason is required.");
        }

        Ride ride = rideRepository.findByRideId(rideId)
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found with id " + rideId));

        if (ride.getStatus() == RideStatus.CANCELLED) {
            return ride;
        }

        ride.setStatus(RideStatus.CANCELLED);
        return rideRepository.saveRide(ride);
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getBookingReport() {
        List<Ride> rides = rideRepository.findAllRides();

        long completed = rides.stream()
                .filter(ride -> ride.getStatus() == RideStatus.COMPLETED)
                .count();

        long cancelled = rides.stream()
                .filter(ride -> ride.getStatus() == RideStatus.CANCELLED)
                .count();

        long pending = rides.size() - completed - cancelled;

        List<Map<String, Object>> bookings = rides.stream().map(ride -> {
            Map<String, Object> booking = new LinkedHashMap<>();
            booking.put("bookingId", ride.getId());
            booking.put("passengerName", ride.getPassenger() != null ? ride.getPassenger().getName() : null);
            booking.put("driverName", ride.getDriver() != null && ride.getDriver().getUser() != null
                    ? ride.getDriver().getUser().getName() : null);
            booking.put("fare", ride.getFare());
            booking.put("bookingDate", ride.getCreatedAt());
            booking.put("status", ride.getStatus() == RideStatus.COMPLETED
                    ? "COMPLETED"
                    : ride.getStatus() == RideStatus.CANCELLED
                        ? "CANCELLED"
                        : "PENDING");
            return booking;
        }).toList();

        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("totalBookings", rides.size());
        summary.put("completed", completed);
        summary.put("pending", pending);
        summary.put("cancelled", cancelled);

        Map<String, Object> report = new LinkedHashMap<>();
        report.put("summary", summary);
        report.put("bookings", bookings);

        return report;
    }

    @Override
    @Transactional(readOnly = true)
    public RevenueReportDto getRevenueReport() {

        List<Payment> payments = paymentRepository.findAllPayments();

        RevenueSummaryDto summary = new RevenueSummaryDto();

        summary.setTotalRevenue(
                payments.stream()
                        .filter(p -> p.getPaymentStatus() == PaymentStatus.SUCCESS)
                        .mapToDouble(Payment::getAmount)
                        .sum());

        summary.setPaidPayments(
                payments.stream()
                        .filter(p -> p.getPaymentStatus() == PaymentStatus.SUCCESS)
                        .count());

        summary.setPendingPayments(
                payments.stream()
                        .filter(p -> p.getPaymentStatus() == PaymentStatus.PENDING)
                        .count());

        List<RevenueTransactionDto> transactions =
                payments.stream()
                        .map(this::mapRevenueTransaction)
                        .toList();

        RevenueReportDto dto = new RevenueReportDto();

        dto.setSummary(summary);
        dto.setTransactions(transactions);

        return dto;
    }

    @Override
    @Transactional(readOnly = true)
    public DriverReportDto getDriverReport() {

        List<Driver> driverList = driverRepository.findAll();

        DriverSummaryDto summary = new DriverSummaryDto();

        summary.setTotalDrivers((long) driverList.size());

        summary.setApprovedDrivers(
                driverList.stream()
                        .filter(d -> d.getStatus() == DriverStatus.APPROVED)
                        .count());

        summary.setPendingDrivers(
                driverList.stream()
                        .filter(d -> d.getStatus() == DriverStatus.PENDING)
                        .count());

        summary.setSuspendedDrivers(
                driverList.stream()
                        .filter(d -> d.getStatus() == DriverStatus.BLOCKED)
                        .count());

        List<DriverReportItemDto> drivers =
                driverList.stream()
                        .map(this::mapDriverReport)
                        .toList();

        DriverReportDto dto = new DriverReportDto();

        dto.setSummary(summary);

        dto.setDrivers(drivers);

        return dto;
    }

    private Driver findDriverOrThrow(Long driverId) {
        return driverRepository.findById(driverId)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id " + driverId));
    }

    @Override
    public Map<String, Object> getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalDrivers = driverRepository.count();
        long totalBookings = rideRepository.count();

        double totalRevenue = paymentRepository.findAllPayments().stream()
                .filter(payment -> payment.getPaymentStatus() == PaymentStatus.SUCCESS)
                .mapToDouble(Payment::getAmount)
                .sum();

        List<Ride> recentRides = rideRepository.findAllRides().stream()
                .sorted(Comparator.comparing(
                        Ride::getCreatedAt,
                        Comparator.nullsLast(Comparator.reverseOrder())
                ))
                .limit(5)
                .toList();

        List<Map<String, Object>> recentBookings = recentRides.stream().map(ride -> {
            Map<String, Object> booking = new LinkedHashMap<>();
            booking.put("bookingId", ride.getId());
            booking.put("passengerName", ride.getPassenger() != null ? ride.getPassenger().getName() : null);
            booking.put("driverName", ride.getDriver() != null && ride.getDriver().getUser() != null
                    ? ride.getDriver().getUser().getName() : null);
            booking.put("fare", ride.getFare());
            booking.put("status", ride.getStatus() == RideStatus.COMPLETED
                    ? "COMPLETED"
                    : ride.getStatus() == RideStatus.CANCELLED
                        ? "CANCELLED"
                        : "PENDING");
            return booking;
        }).toList();

        List<Driver> activeDriversList = driverRepository.findAll().stream()
                .filter(driver -> driver.getStatus() == DriverStatus.APPROVED
                        && Boolean.TRUE.equals(driver.getAvailability()))
                .limit(5)
                .toList();

        List<Map<String, Object>> activeDrivers = activeDriversList.stream().map(driver -> {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("driverId", driver.getId());
            item.put("name", driver.getUser() != null ? driver.getUser().getName() : null);
            return item;
        }).toList();

        List<Driver> pendingDriversList = driverRepository.findAll().stream()
                .filter(driver -> driver.getStatus() == DriverStatus.PENDING)
                .limit(3)
                .toList();

        List<Map<String, Object>> pendingDrivers = pendingDriversList.stream().map(driver -> {
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("driverId", driver.getId());
            item.put("name", driver.getUser() != null ? driver.getUser().getName() : null);
            return item;
        }).toList();

        Map<String, Object> dashboardData = new LinkedHashMap<>();
        dashboardData.put("totalUsers", totalUsers);
        dashboardData.put("totalDrivers", totalDrivers);
        dashboardData.put("totalBookings", totalBookings);
        dashboardData.put("totalRevenue", totalRevenue);
        dashboardData.put("recentBookings", recentBookings);
        dashboardData.put("activeDrivers", activeDrivers);
        dashboardData.put("pendingDrivers", pendingDrivers);

        return dashboardData;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    private RevenueTransactionDto mapRevenueTransaction(Payment payment) {

    RevenueTransactionDto dto = new RevenueTransactionDto();

    dto.setId(payment.getId());

    dto.setBookingId(payment.getRide().getId());

    dto.setPassengerName(
            payment.getRide().getPassenger().getName());

    dto.setDriverName(
            payment.getRide().getDriver() == null
                    ? "Not Assigned"
                    : payment.getRide().getDriver().getUser().getName());

    dto.setAmount(payment.getAmount());

    dto.setPaymentStatus(
            payment.getPaymentStatus().name());

    dto.setPaymentMethod(
            payment.getPaymentMethod().name());

    dto.setPaymentDate(
            payment.getPaymentDate());

    return dto;
}
    
    @Override
    @Transactional(readOnly = true)
    public List<BookingAdminResponseDto> getAllBookings() {

        return rideRepository.findAll()
                .stream()
                .map(this::mapBooking)
                .toList();
    }
    
    private BookingAdminResponseDto mapBooking(Ride ride) {

        BookingAdminResponseDto dto =
                new BookingAdminResponseDto();

        dto.setId(ride.getId());

        dto.setBookingId(ride.getId());

        dto.setPassengerName(
                ride.getPassenger().getName());

        if (ride.getDriver() != null) {
            dto.setDriverName(
                    ride.getDriver()
                            .getUser()
                            .getName());
        } else {
            dto.setDriverName("Not Assigned");
        }

        dto.setPickupLocation(
                ride.getPickupLocation());

        dto.setDropLocation(
                ride.getDropLocation());

        dto.setFare(
                ride.getFare());

        dto.setDistanceKm(
                ride.getDistanceKm());

        dto.setStatus(
                ride.getStatus().name());

        dto.setBookingDate(
                ride.getCreatedAt().toString());

        return dto;
    }
    private DriverReportItemDto mapDriverReport(Driver driver) {

        DriverReportItemDto dto = new DriverReportItemDto();

        dto.setId(driver.getId());

        dto.setName(driver.getUser().getName());

        dto.setEmail(driver.getUser().getEmail());

        dto.setPhone(driver.getUser().getPhone());

        // Vehicle Number
        if (driver.getVehicles() != null && !driver.getVehicles().isEmpty()) {
        	dto.setVehicleNumber(
        	        driver.getVehicles()
        	              .stream()
        	              .map(Vehicle::getVehicleNumber)
        	              .collect(Collectors.joining(", "))
        	);
        } else {
            dto.setVehicleNumber("N/A");
        }

        // Total Trips
        dto.setTotalTrips(driver.getTotalRides());

        dto.setStatus(driver.getStatus().name());

        return dto;
    }
}