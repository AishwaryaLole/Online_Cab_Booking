package com.cabbooking.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cabbooking.dto.DriverAvailabilityDto;
import com.cabbooking.dto.DriverDto;
import com.cabbooking.services.DriverService;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

	private final DriverService driverService;
	
	public DriverController(DriverService driverService) {
		this.driverService = driverService;
	}
	
	//Add Driver
	@PostMapping
    public ResponseEntity<DriverDto> addDriver(
            @RequestBody DriverDto driverDto) {

        DriverDto savedDriver = driverService.addDriver(driverDto);

        return new ResponseEntity<>(savedDriver, HttpStatus.CREATED);
    }
	
	// Get Driver By ID
	@GetMapping("/{driverId}")
	public ResponseEntity<DriverDto> getDriverById(@PathVariable Long driverId) {

	    DriverDto driver = driverService.getDriverById(driverId);

	    return ResponseEntity.ok(driver);
	}
	
	// Get All Drivers
	@GetMapping
	public ResponseEntity<List<DriverDto>> getAllDrivers() {

	    List<DriverDto> drivers = driverService.getAllDrivers();

	    return ResponseEntity.ok(drivers);
	}
	
	// Update Driver
	@PutMapping("/{driverId}")
	public ResponseEntity<DriverDto> updateDriver(
	        @PathVariable Long driverId,
	        @RequestBody DriverDto driverDto) {

	    DriverDto updatedDriver = driverService.updateDriver(driverId, driverDto);

	    return ResponseEntity.ok(updatedDriver);
	}
	
	// Update Driver Availability
	@PutMapping("/{driverId}/availability")
	public ResponseEntity<DriverAvailabilityDto> updateAvailability(
	        @PathVariable Long driverId,
	        @RequestBody DriverAvailabilityDto availabilityDto) {

	    DriverAvailabilityDto updatedStatus =
	            driverService.updateAvailability(driverId, availabilityDto);

	    return ResponseEntity.ok(updatedStatus);
	}
}

