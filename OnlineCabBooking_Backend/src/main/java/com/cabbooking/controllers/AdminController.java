package com.cabbooking.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cabbooking.dto.ApiResponse;
import com.cabbooking.dto.DriverAdminResponseDto;
import com.cabbooking.dto.DriverStatusUpdateRequest;
import com.cabbooking.dto.RideAdminResponseDto;
import com.cabbooking.dto.RideCancellationRequest;
import com.cabbooking.dto.UserAdminResponseDto;
import com.cabbooking.dto.UserUpdateRequest;
import com.cabbooking.entities.Driver;
import com.cabbooking.entities.Ride;
import com.cabbooking.entities.User;
import com.cabbooking.services.IAdminService;

import jakarta.validation.Valid;

/**
 * REST controller exposing admin management endpoints.
 */
@RestController
@RequestMapping("/admins")
public class AdminController {

    private final IAdminService adminService;

    public AdminController(IAdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/drivers/{driverId}/approve")
    public ResponseEntity<ApiResponse<DriverAdminResponseDto>> approveDriver(@PathVariable Long driverId) {
        Driver driver = adminService.approveDriver(driverId);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Driver approved successfully.",
                toDriverAdminResponseDto(driver)));
    }

    @PostMapping("/drivers/{driverId}/block")
    public ResponseEntity<ApiResponse<DriverAdminResponseDto>> blockDriver(@PathVariable Long driverId) {
        Driver driver = adminService.blockDriver(driverId);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Driver blocked successfully.",
                toDriverAdminResponseDto(driver)));
    }

    @PutMapping("/drivers/{driverId}/status")
    public ResponseEntity<ApiResponse<DriverAdminResponseDto>> updateDriverStatus(@PathVariable Long driverId,
            @Valid @RequestBody DriverStatusUpdateRequest request) {
        Driver driver = adminService.updateDriverStatus(driverId, request);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Driver status updated successfully.",
                toDriverAdminResponseDto(driver)));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserAdminResponseDto>>> getAllUsers() {
        List<UserAdminResponseDto> users = adminService.getAllUsers()
                .stream()
                .map(this::toUserAdminResponseDto)
                .toList();

        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Users fetched successfully.", users));
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<UserAdminResponseDto>> getUserById(@PathVariable Long userId) {
        User user = adminService.getUserById(userId);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "User fetched successfully.",
                toUserAdminResponseDto(user)));
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<UserAdminResponseDto>> updateUser(@PathVariable Long userId,
            @Valid @RequestBody UserUpdateRequest request) {
        User user = adminService.updateUser(userId, request);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "User updated successfully.",
                toUserAdminResponseDto(user)));
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<Object>> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "User deleted successfully.", null));
    }

    @PostMapping("/rides/{rideId}/cancel")
    public ResponseEntity<ApiResponse<RideAdminResponseDto>> cancelRide(@PathVariable Long rideId,
            @Valid @RequestBody RideCancellationRequest request) {
        Ride ride = adminService.cancelRide(rideId, request);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Ride cancelled successfully.",
                toRideAdminResponseDto(ride)));
    }

    @GetMapping("/reports/bookings")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getBookingReport() {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Booking report generated.",
                adminService.getBookingReport()));
    }

    @GetMapping("/reports/revenue")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getRevenueReport() {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Revenue report generated.",
                adminService.getRevenueReport()));
    }

    @GetMapping("/reports/drivers")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDriverReport() {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Driver report generated.",
                adminService.getDriverReport()));
    }

    private DriverAdminResponseDto toDriverAdminResponseDto(Driver driver) {
        Long userId = driver.getUser() != null ? driver.getUser().getId() : null;
        String userName = driver.getUser() != null ? driver.getUser().getName() : null;

        return new DriverAdminResponseDto(
                driver.getId(),
                userId,
                userName,
                driver.getLicenseNumber(),
                driver.getStatus(),
                driver.getAvailability(),
                driver.getRating(),
                driver.getTotalRides()
        );
    }

    private UserAdminResponseDto toUserAdminResponseDto(User user) {
        return new UserAdminResponseDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole(),
                user.getIsVerified(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }

    private RideAdminResponseDto toRideAdminResponseDto(Ride ride) {
        Long passengerId = ride.getPassenger() != null ? ride.getPassenger().getId() : null;
        Long driverId = ride.getDriver() != null ? ride.getDriver().getId() : null;

        return new RideAdminResponseDto(
                ride.getId(),
                passengerId,
                driverId,
                ride.getPickupLocation(),
                ride.getDropLocation(),
                ride.getFare(),
                ride.getStatus(),
                ride.getCreatedAt(),
                ride.getUpdatedAt()
        );
    }
}