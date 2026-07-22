package com.cabbooking.dto;

import java.time.LocalDateTime;

import com.cabbooking.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAdminResponseDto{

    private Long id;
    private String name;
    private String email;
    private String phone;
    private Role role;
    private Boolean isVerified;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}