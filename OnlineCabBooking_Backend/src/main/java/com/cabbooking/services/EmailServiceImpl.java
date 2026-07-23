package com.cabbooking.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

	private final JavaMailSender mailSender;
	
	@Override
	public void sendOtp(String toEmail, String otp) {
	
		
		 SimpleMailMessage message = new SimpleMailMessage();

	        message.setTo(toEmail);
	        message.setSubject("Online Cab Booking - OTP Verification");
	        message.setText("Your OTP is: " + otp);

	        mailSender.send(message);

	}

	@Override
	public void sendEmail(String to, String subject, String message) {
		
		 SimpleMailMessage mail = new SimpleMailMessage();

	        mail.setTo(to);
	        mail.setSubject(subject);
	        mail.setText(message);

	        mailSender.send(mail);
		
	}

}
