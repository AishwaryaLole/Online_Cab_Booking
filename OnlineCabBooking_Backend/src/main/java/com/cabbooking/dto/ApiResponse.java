
package com.cabbooking.dto;

import java.time.LocalDateTime;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ApiResponse<T> {

    private int statusCode;

    private boolean success;

    private String message;

    private T data;

    private LocalDateTime timestamp = LocalDateTime.now();

    public ApiResponse(int statusCode, boolean success, String message, T data) {
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.data = data;
    }
}