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

    default List<Ride> findAllRides() {
        return findAll();
    }

    List<Ride> findAllByStatus(RideStatus status);

    default Ride saveRide(Ride ride) {
        return save(ride);
    }
}