package com.cabbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DriverDto {

	private Long id;
	
	private Long userId;
	
	private String licenseNumber;
	
	private String status;
	
	private VehicleDto vehicle;
	
	private DriverLocationDto location;
}
