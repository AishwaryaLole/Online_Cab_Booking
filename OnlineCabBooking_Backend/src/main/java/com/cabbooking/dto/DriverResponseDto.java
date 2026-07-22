package com.cabbooking.dto;

import com.cabbooking.enums.DriverStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DriverResponseDto {

	private Long id;
	
	private Long userId;
	
	private String licenseNumber;
	
	private DriverStatus status;
	
	private Boolean availability;
	
	private Double rating;
	
	private Integer totalRides;
}
