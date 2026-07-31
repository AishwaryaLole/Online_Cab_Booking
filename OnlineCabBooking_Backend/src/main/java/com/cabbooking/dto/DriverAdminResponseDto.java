package com.cabbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DriverAdminResponseDto {

    private Long driverId;
    private String name;
    private String email;
    private String phone;
    private String licenseNumber;
    private String vehicleNumber;
    private String vehicleType;
    private Double rating;
    private Integer totalRides;
    private Boolean availability;
    private String status;
}