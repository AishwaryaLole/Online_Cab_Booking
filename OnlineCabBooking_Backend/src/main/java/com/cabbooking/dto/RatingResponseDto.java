package com.cabbooking.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingResponseDto {

    private Long id;
    private Long rideId;
    private Long passengerId;
    private Long driverId;
    private Integer rating;
    private String comments;
    private LocalDateTime createdAt;
}