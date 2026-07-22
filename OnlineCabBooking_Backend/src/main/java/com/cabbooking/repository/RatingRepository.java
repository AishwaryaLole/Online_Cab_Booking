package com.cabbooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cabbooking.entities.Rating;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    default Optional<Rating> findByRatingId(Long id) {
        return findById(id);
    }

    default List<Rating> findAllRatings() {
        return findAll();
    }

    default Rating saveRating(Rating rating) {
        return save(rating);
    }

    Optional<Rating> findByRide_Id(Long rideId);

    List<Rating> findAllByDriver_Id(Long driverId);

    List<Rating> findAllByPassenger_Id(Long passengerId);

    List<Rating> findAllByRide_Id(Long rideId);
}
