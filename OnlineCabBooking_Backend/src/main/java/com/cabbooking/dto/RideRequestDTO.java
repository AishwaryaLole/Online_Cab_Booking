package com.cabbooking.dto;

import com.cabbooking.enums.PaymentMethod;

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

    // Optional - sent by the frontend after it calculates the route (OSRM).
    // The backend uses these to compute the authoritative fare at booking time.
    private Double distanceKm;

    private Integer durationMin;

    // CASH (default), UPI, or CARD - decides whether the ride is assigned a
    // driver immediately (CASH) or waits for prepayment first (UPI/CARD).
    private PaymentMethod paymentMethod;
}