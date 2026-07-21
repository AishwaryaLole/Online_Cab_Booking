package com.cabbooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cabbooking.entities.Ride;
import com.cabbooking.enums.RideStatus;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {

    Optional<Ride> findByRideId(Long rideId);

    List<Ride> findAllRides();

    List<Ride> findAllByStatus(RideStatus status);

    Ride saveRide(Ride ride);
}
