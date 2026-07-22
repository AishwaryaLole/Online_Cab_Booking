package com.cabbooking.dto;

import com.cabbooking.enums.DriverStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DriverAdminResponseDto {

    private Long id;
    private Long userId;
    private String userName;
    private String licenseNumber;
    private DriverStatus status;
    private Boolean availability;
    private Double rating;
    private Integer totalRides;
}
