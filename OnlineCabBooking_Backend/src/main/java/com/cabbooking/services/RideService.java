package com.cabbooking.services;



import java.util.List;

import com.cabbooking.dto.RideRequestDTO;
import com.cabbooking.dto.RideResponseDTO;


public interface RideService {
	
	//Book a new Ride
	RideResponseDTO bookRide(RideRequestDTO request);
	
	//Get rides details by ride ID
	RideResponseDTO getRideById(Long id);
	
	//Get all rides of a passenger
	List<RideResponseDTO> getRideHistory(Long passengerId);
	
	//Cancel a booked ride
	RideResponseDTO cancelRide(Long id);
	
	//Start the ride
	RideResponseDTO startRide(Long id);
	
	//Complete the ride
	RideResponseDTO completeRide(Long id);
	
	List<RideResponseDTO> getAssignedRides(Long driverId);
	
	RideResponseDTO acceptRide(Long id);
	
	RideResponseDTO rejectRide(Long id);
	
	List<RideResponseDTO> getRideHistoryByDriver(Long driverId);

	// Called by PaymentServiceImpl right after a UPI/Card prepayment succeeds -
	// this is the moment a PAYMENT_PENDING ride actually gets matched to a
	// nearby driver.
	RideResponseDTO assignNearestDriverAfterPayment(Long rideId);

}
