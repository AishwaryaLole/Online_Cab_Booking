package com.cabbooking.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cabbooking.dto.RegisterRequest;
import com.cabbooking.services.AuthServices;

@RestController
@RequestMapping("/user/auth")
public class AuthController {
	
	private final AuthServices authServices;
	
	public AuthController(AuthServices authServices) {
		this.authServices =  authServices;
	}
	
   
	@PostMapping("/register")
	
	public ResponseEntity<?> register(@RequestBody RegisterRequest request){
		
		return ResponseEntity.ok(authServices.register(request));
	}
}
