package com.cabbooking.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cabbooking.dto.EmailRequest;
import com.cabbooking.dto.ForgotPasswordRequest;
import com.cabbooking.dto.LoginRequest;
import com.cabbooking.dto.RegisterRequest;
import com.cabbooking.dto.ResetPasswordRequest;
import com.cabbooking.dto.VerifyOtpRequest;
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
	
	@PostMapping("/verify-otp")
	   public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest request) {
	        return ResponseEntity.ok(authServices.verifyOtp(request));
	  }
	
	  // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authServices.login(request));
    }

    // Forgot Password
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        return ResponseEntity.ok(authServices.forgotPassword(request));
    }

    // Reset Password
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        return ResponseEntity.ok(authServices.resetPassword(request));
    }

    // Resend OTP
    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody EmailRequest request) {
        return ResponseEntity.ok(authServices.resendOtp(request));
    }
	
	
}

