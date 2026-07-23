package com.cabbooking.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cabbooking.dto.RideRequestDTO;
import com.cabbooking.dto.RideResponseDTO;
import com.cabbooking.services.RideService;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/rides")
public class RideController {
	private final RideService rideService;
	
	//Constructor Injection
	
	public RideController(RideService rideService)
	{
		this.rideService = rideService;
	}
	
	//Book a new ride
	
	@PostMapping("/book")
	public ResponseEntity<RideResponseDTO> bookRide(@RequestBody RideRequestDTO request)
	{
		RideResponseDTO response = rideService.bookRide(request);
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/{rideId}")
	public ResponseEntity<RideResponseDTO> getRideById(
	        @PathVariable Long rideId) {

	    RideResponseDTO response = rideService.getRideById(rideId);

	    return ResponseEntity.ok(response);
	}
}

