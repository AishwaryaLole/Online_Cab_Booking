package com.cabbooking.services;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cabbooking.dto.DriverStatusUpdateRequest;
import com.cabbooking.dto.RideCancellationRequest;
import com.cabbooking.dto.UserUpdateRequest;
import com.cabbooking.entities.Driver;
import com.cabbooking.entities.Payment;
import com.cabbooking.entities.Ride;
import com.cabbooking.entities.User;
import com.cabbooking.enums.DriverStatus;
import com.cabbooking.enums.PaymentStatus;
import com.cabbooking.enums.RideStatus;
import com.cabbooking.enums.Role;
import com.cabbooking.exception.BadRequestException;
import com.cabbooking.exception.ResourceNotFoundException;
import com.cabbooking.repository.DriverRepository;
import com.cabbooking.repository.PaymentRepository;
import com.cabbooking.repository.RideRepository;
import com.cabbooking.repository.UserRepository;

@Service

public class AdminServiceImpl implements IAdminService {

    private final DriverRepository driverRepository;
    private final UserRepository userRepository ;
    private final RideRepository rideRepository;
    private final PaymentRepository paymentRepository;

    public AdminServiceImpl(DriverRepository driverRepository,
                        UserRepository userRepository,
                        RideRepository rideRepository,
                        PaymentRepository paymentRepository) {
        this.driverRepository = driverRepository;
        this.userRepository = userRepository;
        this.rideRepository = rideRepository;
        this.paymentRepository = paymentRepository;
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
        if (userRepository.findByUserId(userId).isEmpty()) {
            throw new ResourceNotFoundException("User not found with id " + userId);
        }

        userRepository.deleteUser(userId);
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

        long totalBookings = rides.size();
        long completedBookings = rides.stream()
                .filter(ride -> ride.getStatus() == RideStatus.COMPLETED)
                .count();
        long cancelledBookings = rides.stream()
                .filter(ride -> ride.getStatus() == RideStatus.CANCELLED)
                .count();

        double totalRevenue = paymentRepository.findAllPayments().stream()
                .filter(payment -> payment.getPaymentStatus() == PaymentStatus.SUCCESS)
                .mapToDouble(Payment::getAmount)
                .sum();

        Map<String, Object> report = new LinkedHashMap<>();
        report.put("totalBookings", totalBookings);
        report.put("completedBookings", completedBookings);
        report.put("cancelledBookings", cancelledBookings);
        report.put("totalRevenue", totalRevenue);

        return report;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getRevenueReport() {
        List<Payment> payments = paymentRepository.findAllPayments();

        double totalRevenue = payments.stream()
                .filter(payment -> payment.getPaymentStatus() == PaymentStatus.SUCCESS)
                .mapToDouble(Payment::getAmount)
                .sum();

        long successfulPayments = payments.stream()
                .filter(payment -> payment.getPaymentStatus() == PaymentStatus.SUCCESS)
                .count();

        Map<String, Object> report = new LinkedHashMap<>();
        report.put("totalRevenue", totalRevenue);
        report.put("successfulPayments", successfulPayments);
        report.put("pendingPayments", payments.stream()
                .filter(payment -> payment.getPaymentStatus() == PaymentStatus.PENDING)
                .count());

        return report;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getDriverReport() {
        List<Driver> drivers = driverRepository.findAll();

        long approvedDrivers = drivers.stream()
                .filter(driver -> driver.getStatus() == DriverStatus.APPROVED)
                .count();
        long pendingDrivers = drivers.stream()
                .filter(driver -> driver.getStatus() == DriverStatus.PENDING)
                .count();
        long blockedDrivers = drivers.stream()
                .filter(driver -> driver.getStatus() == DriverStatus.BLOCKED)
                .count();

        Map<String, Object> report = new LinkedHashMap<>();
        report.put("totalDrivers", drivers.size());
        report.put("approvedDrivers", approvedDrivers);
        report.put("pendingDrivers", pendingDrivers);
        report.put("blockedDrivers", blockedDrivers);

        return report;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Object> getUserReport() {
        List<User> users = userRepository.findAllUsers();

        long totalUsers = users.size();
        long verifiedUsers = users.stream()
                .filter(user -> Boolean.TRUE.equals(user.getIsVerified()))
                .count();
        long passengerUsers = users.stream()
                .filter(user -> user.getRole() == Role.PASSENGER)
                .count();
        long driverUsers = users.stream()
                .filter(user -> user.getRole() == Role.DRIVER)
                .count();
        long adminUsers = users.stream()
                .filter(user -> user.getRole() == Role.ADMIN)
                .count();

        Map<String, Object> report = new LinkedHashMap<>();
        report.put("totalUsers", totalUsers);
        report.put("verifiedUsers", verifiedUsers);
        report.put("passengerUsers", passengerUsers);
        report.put("driverUsers", driverUsers);
        report.put("adminUsers", adminUsers);

        return report;
    }

    private Driver findDriverOrThrow(Long driverId) {
        return driverRepository.findByDriverId(driverId)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id " + driverId));
    }
}
