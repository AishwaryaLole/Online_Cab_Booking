package com.cabbooking.services;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cabbooking.dto.RatingRequestDto;
import com.cabbooking.dto.RatingUpdateRequestDto;
import com.cabbooking.entities.Driver;
import com.cabbooking.entities.Rating;
import com.cabbooking.entities.Ride;
import com.cabbooking.entities.User;
import com.cabbooking.enums.RideStatus;
import com.cabbooking.exception.BadRequestException;
import com.cabbooking.exception.ResourceNotFoundException;
import com.cabbooking.repository.DriverRepository;
import com.cabbooking.repository.RatingRepository;
import com.cabbooking.repository.RideRepository;
import com.cabbooking.repository.UserRepository;

@Service
public class RatingServiceImpl implements IRatingService {

    private final RatingRepository ratingRepository;
    private final RideRepository rideRepository;
    private final UserRepository userRepository;
    private final DriverRepository driverRepository;

    public RatingServiceImpl(RatingRepository ratingRepository,
                             RideRepository rideRepository,
                             UserRepository userRepository,
                             DriverRepository driverRepository) {
        this.ratingRepository = ratingRepository;
        this.rideRepository = rideRepository;
        this.userRepository = userRepository;
        this.driverRepository = driverRepository;
    }

    @Override
    @Transactional
    public Rating giveRating(RatingRequestDto request) {
        if (request == null) {
            throw new BadRequestException("Rating request is required.");
        }
        if (request.getRideId() == null || request.getPassengerId() == null || request.getDriverId() == null) {
            throw new BadRequestException("Ride id, passenger id and driver id are required.");
        }
        if (request.getRating() == null || request.getRating() < 1 || request.getRating() > 5) {
            throw new BadRequestException("Rating must be between 1 and 5.");
        }

        Ride ride = rideRepository.findByRideId(request.getRideId())
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found with id " + request.getRideId()));

        if (ride.getStatus() != RideStatus.COMPLETED) {
            throw new BadRequestException("Rating can only be given for completed rides.");
        }

        if (ride.getPassenger() == null || !Objects.equals(ride.getPassenger().getId(), request.getPassengerId())) {
            throw new BadRequestException("Passenger does not match the requested ride.");
        }

        if (ride.getDriver() == null || !Objects.equals(ride.getDriver().getId(), request.getDriverId())) {
            throw new BadRequestException("Driver does not match the requested ride.");
        }

        User passenger = userRepository.findByUserId(request.getPassengerId())
                .orElseThrow(() -> new ResourceNotFoundException("Passenger not found with id " + request.getPassengerId()));

        Driver driver = driverRepository.findById(request.getDriverId())
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id " + request.getDriverId()));

        ratingRepository.findByRide_Id(request.getRideId()).ifPresent(existing -> {
            throw new BadRequestException("Rating already exists for this ride.");
        });

        Rating rating = new Rating();
        rating.setRide(ride);
        rating.setPassenger(passenger);
        rating.setDriver(driver);
        rating.setRating(request.getRating());
        rating.setComments(request.getComments());

        Rating savedRating = ratingRepository.saveRating(rating);

        List<Rating> ratings = ratingRepository.findAllByDriver_Id(driver.getId());
        double averageRating = ratings.isEmpty() ? 5.0
                : ratings.stream().mapToDouble(Rating::getRating).average().orElse(5.0);

        driver.setRating(Math.round(averageRating * 10.0) / 10.0);
        driverRepository.saveDriver(driver);

        return savedRating;
    }

    @Override
    @Transactional
    public Rating updateRating(Long ratingId, RatingUpdateRequestDto request) {
        if (ratingId == null) {
            throw new BadRequestException("Rating id is required.");
        }
        if (request == null) {
            throw new BadRequestException("Rating update request is required.");
        }

        Rating rating = ratingRepository.findByRatingId(ratingId)
                .orElseThrow(() -> new ResourceNotFoundException("Rating not found with id " + ratingId));

        if (request.getRating() != null) {
            if (request.getRating() < 1 || request.getRating() > 5) {
                throw new BadRequestException("Rating must be between 1 and 5.");
            }
            rating.setRating(request.getRating());
        }

        if (request.getComments() != null) {
            rating.setComments(request.getComments());
        }

        return ratingRepository.saveRating(rating);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Rating> getAllRatings() {
        return ratingRepository.findAllRatings();
    }

    @Override
    @Transactional(readOnly = true)
    public Rating getRatingById(Long ratingId) {
        return ratingRepository.findByRatingId(ratingId)
                .orElseThrow(() -> new ResourceNotFoundException("Rating not found with id " + ratingId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Rating> getRatingsByRide(Long rideId) {
        if (rideId == null) {
            throw new BadRequestException("Ride id is required.");
        }
        return ratingRepository.findAllByRide_Id(rideId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Rating> getRatingsByDriver(Long driverId) {
        if (driverId == null) {
            throw new BadRequestException("Driver id is required.");
        }
        return ratingRepository.findAllByDriver_Id(driverId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Rating> getRatingsByPassenger(Long passengerId) {
        if (passengerId == null) {
            throw new BadRequestException("Passenger id is required.");
        }
        return ratingRepository.findAllByPassenger_Id(passengerId);
    }
}
