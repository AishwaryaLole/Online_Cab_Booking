package com.cabbooking.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cabbooking.dto.ApiResponse;
import com.cabbooking.dto.RideRequestDTO;
import com.cabbooking.dto.RideResponseDTO;
import com.cabbooking.services.RideService;

@RestController
@RequestMapping("/api/rides")
public class RideController {

    private final RideService rideService;

    // Constructor Injection
    public RideController(RideService rideService) {
        this.rideService = rideService;
    }

    // Book a new Ride
    @PostMapping("/book")
    public ResponseEntity<ApiResponse<RideResponseDTO>> bookRide(
            @RequestBody RideRequestDTO request) {

        RideResponseDTO response = rideService.bookRide(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK.value(),
                        true,
                        "Ride booked successfully.",
                        response
                )
        );
    }

    // Get Ride By ID
    @GetMapping("/{rideId}")
    public ResponseEntity<ApiResponse<RideResponseDTO>> getRideById(
            @PathVariable Long rideId) {

        RideResponseDTO response = rideService.getRideById(rideId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK.value(),
                        true,
                        "Ride fetched successfully.",
                        response
                )
        );
    }

    // Get Ride History
    @GetMapping("/history/{passengerId}")
    public ResponseEntity<ApiResponse<List<RideResponseDTO>>> getRideHistory(
            @PathVariable Long passengerId) {

        List<RideResponseDTO> response = rideService.getRideHistory(passengerId);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK.value(),
                        true,
                        "Ride history fetched successfully.",
                        response
                )
        );
    }

    // Cancel Ride
    @PutMapping("/cancel/{id}")
    public ResponseEntity<ApiResponse<RideResponseDTO>> cancelRide(
            @PathVariable Long id) {

        RideResponseDTO response = rideService.cancelRide(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK.value(),
                        true,
                        "Ride cancelled successfully.",
                        response
                )
        );
    }

    // Start Ride
    @PutMapping("/start/{id}")
    public ResponseEntity<ApiResponse<RideResponseDTO>> startRide(
            @PathVariable Long id) {

        RideResponseDTO response = rideService.startRide(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK.value(),
                        true,
                        "Ride started successfully.",
                        response
                )
        );
    }

    // Complete Ride
    @PutMapping("/complete/{id}")
    public ResponseEntity<ApiResponse<RideResponseDTO>> completeRide(
            @PathVariable Long id) {

        RideResponseDTO response = rideService.completeRide(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        HttpStatus.OK.value(),
                        true,
                        "Ride completed successfully.",
                        response
                )
        );
    }
}