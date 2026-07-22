package com.cabbooking.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.cabbooking.dto.RideRequestDTO;
import com.cabbooking.dto.RideResponseDTO;
import com.cabbooking.entities.Ride;
import com.cabbooking.entities.User;
import com.cabbooking.exception.ResourceNotFoundException;
import com.cabbooking.repository.RideRepository;
import com.cabbooking.repository.UserRepository;

@Service

public class RideServiceImpl implements RideService {
	
	private final RideRepository rideRepository ;
	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	
	//Constructor Injection
	public RideServiceImpl(RideRepository rideRepository,UserRepository userRepository,ModelMapper modelMapper)
	{
		this.rideRepository = rideRepository;
		this.userRepository = userRepository;
		this.modelMapper = modelMapper;
	}

	@Override
	public RideResponseDTO bookRide(RideRequestDTO request) {
		 // Get passenger from database
	    User passenger = userRepository.findById(request.getPassengerId())
	            .orElseThrow(() -> new ResourceNotFoundException("Passenger not found"));
	    
	    //Create new ride object
	    Ride ride = new Ride();
	    
	    //Set passenger
	    ride.setPassenger(passenger);
	    
	    // Set pickup details
	    ride.setPickupLocation(request.getPickupLocation());
	    ride.setPickupLatitude(request.getPickupLatitude());
	    ride.setPickupLongitude(request.getPickupLongitude());
	    
	    // Set drop details
	    ride.setDropLocation(request.getDropLocation());
	    ride.setDropLatitude(request.getDropLatitude());
	    ride.setDropLongitude(request.getDropLongitude());
	    
	    // Save ride in database
	    Ride savedRide = rideRepository.save(ride);
	    
	    // Create response object
	    RideResponseDTO response = new RideResponseDTO();

	    response.setId(savedRide.getId());
	    response.setPassengerId(savedRide.getPassenger().getId());

	    if (savedRide.getDriver() != null) {
	        response.setDriverId(savedRide.getDriver().getId());
	    }

	    response.setPickupLocation(savedRide.getPickupLocation());
	    response.setDropLocation(savedRide.getDropLocation());
	    response.setDistanceKm(savedRide.getDistanceKm());
	    response.setDurationMin(savedRide.getDurationMin());
	    response.setFare(savedRide.getFare());
	    response.setStatus(savedRide.getStatus());
	    response.setCreatedAt(savedRide.getCreatedAt());

	    return response;
	    
	
	}

	@Override
	public RideResponseDTO getRideById(Long id) {

	    Ride ride = rideRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

	    return modelMapper.map(ride, RideResponseDTO.class);
	}
	

	@Override
	public List<RideResponseDTO> getRideHistory(Long passengerId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RideResponseDTO cancelRide(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RideResponseDTO startRide(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RideResponseDTO completeRide(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
