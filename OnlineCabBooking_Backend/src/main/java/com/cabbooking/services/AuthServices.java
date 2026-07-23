package com.cabbooking.services;


import com.cabbooking.dto.EmailRequest;
import com.cabbooking.dto.ForgotPasswordRequest;
import com.cabbooking.dto.LoginRequest;
import com.cabbooking.dto.LoginResponse;
import com.cabbooking.dto.RegisterRequest;
import com.cabbooking.dto.ResetPasswordRequest;
import com.cabbooking.dto.VerifyOtpRequest;

public interface AuthServices {
	
	String register(RegisterRequest request);

	String verifyOtp(VerifyOtpRequest request);

	LoginResponse login(LoginRequest request);

	String forgotPassword(ForgotPasswordRequest request);

	String resetPassword(ResetPasswordRequest request);

	String resendOtp(EmailRequest request);
	
	
	
}

