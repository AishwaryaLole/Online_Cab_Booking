package com.cabbooking.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
