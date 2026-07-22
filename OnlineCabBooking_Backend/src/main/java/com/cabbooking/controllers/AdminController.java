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
import com.cabbooking.dto.DriverStatusUpdateRequest;
import com.cabbooking.dto.RideCancellationRequest;
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
    public ResponseEntity<ApiResponse<Driver>> approveDriver(@PathVariable Long driverId) {
        Driver driver = adminService.approveDriver(driverId);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Driver approved successfully.", driver));
    }

    @PostMapping("/drivers/{driverId}/block")
    public ResponseEntity<ApiResponse<Driver>> blockDriver(@PathVariable Long driverId) {
        Driver driver = adminService.blockDriver(driverId);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Driver blocked successfully.", driver));
    }

    @PutMapping("/drivers/{driverId}/status")
    public ResponseEntity<ApiResponse<Driver>> updateDriverStatus(@PathVariable Long driverId,
            @Valid @RequestBody DriverStatusUpdateRequest request) {
        Driver driver = adminService.updateDriverStatus(driverId, request);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Driver status updated successfully.", driver));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Users fetched successfully.", adminService.getAllUsers()));
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<User>> getUserById(@PathVariable Long userId) {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "User fetched successfully.", adminService.getUserById(userId)));
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<User>> updateUser(@PathVariable Long userId,
            @Valid @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "User updated successfully.", adminService.updateUser(userId, request)));
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<Object>> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "User deleted successfully.", null));
    }

    @PostMapping("/rides/{rideId}/cancel")
    public ResponseEntity<ApiResponse<Ride>> cancelRide(@PathVariable Long rideId,
            @Valid @RequestBody RideCancellationRequest request) {
        Ride ride = adminService.cancelRide(rideId, request);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Ride cancelled successfully.", ride));
    }

    @GetMapping("/reports/bookings")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getBookingReport() {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Booking report generated.", adminService.getBookingReport()));
    }

    @GetMapping("/reports/revenue")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getRevenueReport() {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Revenue report generated.", adminService.getRevenueReport()));
    }

    @GetMapping("/reports/drivers")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDriverReport() {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Driver report generated.", adminService.getDriverReport()));
    }

   /* @GetMapping("/reports/users")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserReport() {
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "User report generated.", adminService.getUserReport()));
    }*/
}