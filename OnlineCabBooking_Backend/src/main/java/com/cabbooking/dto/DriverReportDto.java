package com.cabbooking.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DriverReportDto {

    private DriverSummaryDto summary;

    private List<DriverReportItemDto> drivers;

}