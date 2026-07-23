package com.cabbooking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DriverRequestDto {
	
	@NotNull(message = "User ID is required")
	private Long userId;
	
	@NotBlank(message = "License number is required")
	private String licenseNumber;
}
