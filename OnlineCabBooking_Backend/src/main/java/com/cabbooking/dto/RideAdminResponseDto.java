package com.cabbooking.dto;

import java.time.LocalDateTime;

import com.cabbooking.enums.RideStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RideAdminResponseDto {

    private Long id;
    private Long passengerId;
    private Long driverId;
    private String pickupLocation;
    private String dropLocation;
    private Double fare;
    private RideStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
