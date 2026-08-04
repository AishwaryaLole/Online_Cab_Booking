package com.cabbooking.dto;

import java.time.LocalDateTime;

import com.cabbooking.enums.PaymentMethod;
import com.cabbooking.enums.RideStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RideResponseDTO {

    private Long id;

    private Long passengerId;

    private Long driverId;

    private String pickupLocation;

    private String dropLocation;

    private Double distanceKm;

    private Integer durationMin;

    private Double fare;

    private RideStatus status;

    private PaymentMethod paymentMethod;

    // True once a SUCCESS payment record exists for this ride. The frontend
    // uses this to decide whether to show "Collect cash payment" or
    // "Complete ride" on the driver's app.
    private boolean paid;

    private LocalDateTime createdAt;
}