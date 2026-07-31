package com.cabbooking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingAdminResponseDto {

    private Long id;

    private Long bookingId;

    private String passengerName;

    private String driverName;

    private String pickupLocation;

    private String dropLocation;

    private Double fare;

    private Double distanceKm;

    private String status;

    private String bookingDate;

}