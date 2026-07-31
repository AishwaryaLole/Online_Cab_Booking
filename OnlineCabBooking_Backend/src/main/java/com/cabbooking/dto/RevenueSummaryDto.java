package com.cabbooking.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RevenueSummaryDto {

    private Double totalRevenue;

    private Long paidPayments;

    private Long pendingPayments;

}