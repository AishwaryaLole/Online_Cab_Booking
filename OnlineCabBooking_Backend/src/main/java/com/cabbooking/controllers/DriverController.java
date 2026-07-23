package com.cabbooking.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cabbooking.dto.ApiResponse;
import com.cabbooking.dto.DriverAvailabilityDto;
import com.cabbooking.dto.DriverDto;
import com.cabbooking.dto.DriverLocationDto;
import com.cabbooking.services.DriverService;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    // Add Driver
    @PostMapping
    public ResponseEntity<ApiResponse<DriverDto>> addDriver(
            @RequestBody DriverDto driverDto) {

        DriverDto savedDriver = driverService.addDriver(driverDto);

        ApiResponse<DriverDto> response = new ApiResponse<>(
                HttpStatus.CREATED.value(),
                true,
                "Driver added successfully.",
                savedDriver);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get Driver By ID
    @GetMapping("/{driverId}")
    public ResponseEntity<ApiResponse<DriverDto>> getDriverById(
            @PathVariable Long driverId) {

        DriverDto driver = driverService.getDriverById(driverId);

        ApiResponse<DriverDto> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                "Driver fetched successfully.",
                driver);

        return ResponseEntity.ok(response);
    }

    // Get All Drivers
    @GetMapping
    public ResponseEntity<ApiResponse<List<DriverDto>>> getAllDrivers() {

        List<DriverDto> drivers = driverService.getAllDrivers();

        ApiResponse<List<DriverDto>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                "Drivers fetched successfully.",
                drivers);

        return ResponseEntity.ok(response);
    }

    // Update Driver
    @PutMapping("/{driverId}")
    public ResponseEntity<ApiResponse<DriverDto>> updateDriver(
            @PathVariable Long driverId,
            @RequestBody DriverDto driverDto) {

        DriverDto updatedDriver = driverService.updateDriver(driverId, driverDto);

        ApiResponse<DriverDto> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                "Driver updated successfully.",
                updatedDriver);

        return ResponseEntity.ok(response);
    }

    // Update Driver Availability
    @PutMapping("/{driverId}/availability")
    public ResponseEntity<ApiResponse<DriverAvailabilityDto>> updateAvailability(
            @PathVariable Long driverId,
            @RequestBody DriverAvailabilityDto availabilityDto) {

        DriverAvailabilityDto updatedStatus =
                driverService.updateAvailability(driverId, availabilityDto);

        ApiResponse<DriverAvailabilityDto> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                "Driver availability updated successfully.",
                updatedStatus);

        return ResponseEntity.ok(response);
    }

    // Update Driver Location
    @PutMapping("/{driverId}/location")
    public ResponseEntity<ApiResponse<DriverLocationDto>> updateDriverLocation(
            @PathVariable Long driverId,
            @RequestBody DriverLocationDto locationDto) {

        DriverLocationDto updatedLocation =
                driverService.updateLocation(driverId, locationDto);

        ApiResponse<DriverLocationDto> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                "Driver location updated successfully.",
                updatedLocation);

        return ResponseEntity.ok(response);
    }

    // Delete Driver
    @DeleteMapping("/{driverId}")
    public ResponseEntity<ApiResponse<Void>> deleteDriver(
            @PathVariable Long driverId) {

        driverService.deleteDriver(driverId);

        ApiResponse<Void> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                "Driver deleted successfully.",
                null);

        return ResponseEntity.ok(response);
    }
}