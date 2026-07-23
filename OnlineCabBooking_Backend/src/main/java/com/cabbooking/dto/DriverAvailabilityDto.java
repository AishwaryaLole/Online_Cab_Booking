package com.cabbooking.dto;

import com.cabbooking.enums.DriverStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DriverAvailabilityDto {

	private Long driverId;
	
	private DriverStatus status;
}
