
package com.cabbooking.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Request payload for cancelling a ride.
 */
@Data
public class RideCancellationRequest {

    @NotBlank(message = "Cancellation reason is required")
    private String reason;
}