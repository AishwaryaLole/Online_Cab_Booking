package com.cabbooking.services;

public interface EmailService {
	
	void sendOtp(String toEmail,String otp);
	
	 void sendEmail(String to, String subject, String message);

}
