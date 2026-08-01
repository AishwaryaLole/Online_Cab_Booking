package com.cabbooking.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RevenueReportDto {

    private RevenueSummaryDto summary;

    private List<RevenueTransactionDto> transactions;

}