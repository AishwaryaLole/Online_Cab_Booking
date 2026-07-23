package com.cabbooking.dto;

import com.cabbooking.enums.PaymentMethod;
import com.cabbooking.enums.PaymentStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentRequestDto {

    @NotNull(message = "Ride id is required")
    private Long rideId;

    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;

    private PaymentStatus paymentStatus;

    private Double amount;
}
