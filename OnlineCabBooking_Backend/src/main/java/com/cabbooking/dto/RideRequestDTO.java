package com.cabbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RideRequestDTO {

    private Long passengerId;

    private String pickupLocation;

    private Double pickupLatitude;

    private Double pickupLongitude;

    private String dropLocation;

    private Double dropLatitude;

    private Double dropLongitude;
}