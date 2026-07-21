package com.cabbooking.dto;

import com.cabbooking.enums.DriverStatus;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * Request payload for updating driver status.
 */
@Data
public class DriverStatusUpdateRequest {

    @NotNull(message = "Driver status is required")
    private DriverStatus status;
}
