package com.cabbooking.dto;

import com.cabbooking.enums.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
	
	private String name;
	private String email;
	private String password;
	private String phone;
	private Role role;
	
	

}
