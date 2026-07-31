package com.cabbooking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DriverReportItemDto {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private String vehicleNumber;

    private Integer totalTrips;

    private String status;

}