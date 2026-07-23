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

	    // Find ride from database
	    Ride ride = rideRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

	    // Convert entity to DTO
	    RideResponseDTO response = modelMapper.map(ride, RideResponseDTO.class);

	    // Set passenger ID manually
	    response.setPassengerId(ride.getPassenger().getId());

	    // Set driver ID if assigned
	    if (ride.getDriver() != null) {
	        response.setDriverId(ride.getDriver().getId());
	    }

	    return response;
	}

	@Override
	public List<RideResponseDTO> getRideHistory(Long passengerId) {

	    // Get all rides of the passenger
	    List<Ride> rides = rideRepository.findByPassenger_Id(passengerId);

	    // Convert Ride list to RideResponseDTO list
	    return rides.stream()
	            .map(ride -> {

	                RideResponseDTO response = modelMapper.map(ride, RideResponseDTO.class);

	                // Set passenger ID
	                response.setPassengerId(ride.getPassenger().getId());

	                // Set driver ID if driver is assigned
	                if (ride.getDriver() != null) {
	                    response.setDriverId(ride.getDriver().getId());
	                }

	                return response;
	            })
	            .toList();
	}

	@Override
	public RideResponseDTO cancelRide(Long id) {

	    // Find ride by ID
	    Ride ride = rideRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

	    // Update ride status
	    ride.setStatus(com.cabbooking.enums.RideStatus.CANCELLED);

	    // Save updated ride
	    Ride updatedRide = rideRepository.save(ride);

	    // Convert entity to DTO
	    RideResponseDTO response = modelMapper.map(updatedRide, RideResponseDTO.class);

	    // Set passenger ID
	    response.setPassengerId(updatedRide.getPassenger().getId());

	    // Set driver ID if assigned
	    if (updatedRide.getDriver() != null) {
	        response.setDriverId(updatedRide.getDriver().getId());
	    }

	    return response;
	}

	@Override
	public RideResponseDTO startRide(Long id) {

	    // Find ride by ID
	    Ride ride = rideRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

	    // Update ride status
	    ride.setStatus(com.cabbooking.enums.RideStatus.IN_PROGRESS);

	    // Save updated ride
	    Ride updatedRide = rideRepository.save(ride);

	    // Convert entity to DTO
	    RideResponseDTO response = modelMapper.map(updatedRide, RideResponseDTO.class);

	    // Set passenger ID
	    response.setPassengerId(updatedRide.getPassenger().getId());

	    // Set driver ID if assigned
	    if (updatedRide.getDriver() != null) {
	        response.setDriverId(updatedRide.getDriver().getId());
	    }

	    return response;
	}

	@Override
	public RideResponseDTO completeRide(Long id) {

	    // Find ride by ID
	    Ride ride = rideRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Ride not found"));

	    // Update ride status
	    ride.setStatus(com.cabbooking.enums.RideStatus.COMPLETED);

	    // Save updated ride
	    Ride updatedRide = rideRepository.save(ride);

	    // Convert entity to DTO
	    RideResponseDTO response = modelMapper.map(updatedRide, RideResponseDTO.class);

	    // Set passenger ID
	    response.setPassengerId(updatedRide.getPassenger().getId());

	    // Set driver ID if assigned
	    if (updatedRide.getDriver() != null) {
	        response.setDriverId(updatedRide.getDriver().getId());
	    }

	    return response;
	}

}
