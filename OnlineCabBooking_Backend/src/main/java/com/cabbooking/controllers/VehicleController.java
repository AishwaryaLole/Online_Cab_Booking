package com.cabbooking.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cabbooking.dto.ApiResponse;
import com.cabbooking.dto.VehicleDto;
import com.cabbooking.services.VehicleService;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<VehicleDto>> addVehicle(@RequestBody VehicleDto dto) {
        VehicleDto saved = vehicleService.addVehicle(dto);
        return new ResponseEntity<>(
                new ApiResponse<>(HttpStatus.CREATED.value(), true, "Vehicle added successfully.", saved),
                HttpStatus.CREATED);
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<ApiResponse<VehicleDto>> getVehicleByDriverId(@PathVariable Long driverId) {
        VehicleDto vehicle = vehicleService.getVehicleByDriverId(driverId);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Vehicle fetched successfully.", vehicle));
    }

    @PutMapping("/{vehicleId}")
    public ResponseEntity<ApiResponse<VehicleDto>> updateVehicle(@PathVariable Long vehicleId, @RequestBody VehicleDto dto) {
        VehicleDto updated = vehicleService.updateVehicle(vehicleId, dto);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Vehicle updated successfully.", updated));
    }
}