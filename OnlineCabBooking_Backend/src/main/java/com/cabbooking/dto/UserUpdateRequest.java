package com.cabbooking.dto;

import com.cabbooking.enums.Role;

import lombok.Data;

/**
 * Request payload for updating user details.
 */
@Data
public class UserUpdateRequest {

    private String name;

    private String phone;

    private Role role;

    private Boolean isVerified;
}
