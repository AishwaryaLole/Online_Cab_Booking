package com.cabbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDto {

	private Long id;
	
	private String vehicleNumber;
	
	private String vehicleType;
	
	private String model;
	
	private String color;
	
	private Long driverId;
}
