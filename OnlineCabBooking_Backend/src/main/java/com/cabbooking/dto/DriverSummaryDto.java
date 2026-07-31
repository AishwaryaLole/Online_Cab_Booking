package com.cabbooking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DriverSummaryDto {

    private Long totalDrivers;

    private Long approvedDrivers;

    private Long pendingDrivers;

    private Long suspendedDrivers;

}