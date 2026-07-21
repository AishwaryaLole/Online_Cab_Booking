package com.cabbooking.services;


import com.cabbooking.dto.RegisterRequest;

public interface AuthServices {
	
	String register(RegisterRequest request);
}

