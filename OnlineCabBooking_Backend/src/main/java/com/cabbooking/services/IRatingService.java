package com.cabbooking.services;

import java.util.List;

import com.cabbooking.dto.RatingRequestDto;
import com.cabbooking.dto.RatingUpdateRequestDto;
import com.cabbooking.entities.Rating;

public interface IRatingService {

    Rating giveRating(RatingRequestDto request);

    Rating updateRating(Long ratingId, RatingUpdateRequestDto request);

    List<Rating> getAllRatings();

    Rating getRatingById(Long ratingId);

    List<Rating> getRatingsByRide(Long rideId);

    List<Rating> getRatingsByDriver(Long driverId);

    List<Rating> getRatingsByPassenger(Long passengerId);
}
