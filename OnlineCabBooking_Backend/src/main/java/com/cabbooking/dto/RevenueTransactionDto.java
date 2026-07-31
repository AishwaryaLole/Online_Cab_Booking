package com.cabbooking.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RevenueTransactionDto {

    private Long id;

    private Long bookingId;

    private String passengerName;

    private String driverName;

    private Double amount;

    private String paymentStatus;

    private String paymentMethod;

    private LocalDateTime paymentDate;

}