package com.cabbooking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PassengerReportItemDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private Integer totalTrips;
    private Double totalSpent;
    private Double rating;
}