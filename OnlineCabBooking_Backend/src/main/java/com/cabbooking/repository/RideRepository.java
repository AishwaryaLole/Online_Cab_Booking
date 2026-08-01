package com.cabbooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cabbooking.entities.Ride;
import com.cabbooking.enums.RideStatus;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {

    default Optional<Ride> findByRideId(Long id) {
        return findById(id);
    }
    
    List<Ride> findByDriver_Id(Long driverId);

    default List<Ride> findAllRides() {
        return findAll();
    }

    // Get all rides of a passenger
    List<Ride> findByPassenger_Id(Long passengerId);

    List<Ride> findAllByStatus(RideStatus status);

    default Ride saveRide(Ride ride) {
        return save(ride);
    }
    
    List<Ride> findByDriver_IdAndStatus(Long driverId, RideStatus status);
}