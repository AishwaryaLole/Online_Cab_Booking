package com.cabbooking.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cabbooking.dto.ApiResponse;
import com.cabbooking.dto.RatingRequestDto;
import com.cabbooking.dto.RatingResponseDto;
import com.cabbooking.dto.RatingUpdateRequestDto;
import com.cabbooking.entities.Rating;
import com.cabbooking.services.IRatingService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    private final IRatingService ratingService;

    public RatingController(IRatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<RatingResponseDto>> giveRating(@Valid @RequestBody RatingRequestDto request) {
        Rating rating = ratingService.giveRating(request);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Rating submitted successfully.", toResponse(rating)));
    }

    @PutMapping("/{ratingId}")
    public ResponseEntity<ApiResponse<RatingResponseDto>> updateRating(@PathVariable Long ratingId,
            @Valid @RequestBody RatingUpdateRequestDto request) {
        Rating rating = ratingService.updateRating(ratingId, request);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Rating updated successfully.", toResponse(rating)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RatingResponseDto>>> getAllRatings() {
        List<RatingResponseDto> ratings = ratingService.getAllRatings().stream().map(this::toResponse).toList();
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Ratings fetched successfully.", ratings));
    }

    @GetMapping("/{ratingId}")
    public ResponseEntity<ApiResponse<RatingResponseDto>> getRatingById(@PathVariable Long ratingId) {
        Rating rating = ratingService.getRatingById(ratingId);
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Rating fetched successfully.", toResponse(rating)));
    }

    @GetMapping("/rides/{rideId}")
    public ResponseEntity<ApiResponse<List<RatingResponseDto>>> getRatingsByRide(@PathVariable Long rideId) {
        List<RatingResponseDto> ratings = ratingService.getRatingsByRide(rideId).stream().map(this::toResponse).toList();
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Ride ratings fetched successfully.", ratings));
    }

    @GetMapping("/drivers/{driverId}")
    public ResponseEntity<ApiResponse<List<RatingResponseDto>>> getRatingsByDriver(@PathVariable Long driverId) {
        List<RatingResponseDto> ratings = ratingService.getRatingsByDriver(driverId).stream().map(this::toResponse).toList();
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Driver ratings fetched successfully.", ratings));
    }

    @GetMapping("/passengers/{passengerId}")
    public ResponseEntity<ApiResponse<List<RatingResponseDto>>> getRatingsByPassenger(@PathVariable Long passengerId) {
        List<RatingResponseDto> ratings = ratingService.getRatingsByPassenger(passengerId).stream().map(this::toResponse).toList();
        return ResponseEntity.ok(new ApiResponse<>(HttpStatus.OK.value(), true, "Passenger ratings fetched successfully.", ratings));
    }

    private RatingResponseDto toResponse(Rating rating) {
        return new RatingResponseDto(
                rating.getId(),
                rating.getRide() != null ? rating.getRide().getId() : null,
                rating.getPassenger() != null ? rating.getPassenger().getId() : null,
                rating.getDriver() != null ? rating.getDriver().getId() : null,
                rating.getRating(),
                rating.getComments(),
                rating.getCreatedAt()
        );
    }
}
