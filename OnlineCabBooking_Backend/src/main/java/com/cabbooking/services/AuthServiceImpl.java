package com.cabbooking.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cabbooking.security.JwtUtil;
import com.cabbooking.dto.EmailRequest;
import com.cabbooking.dto.ForgotPasswordRequest;
import com.cabbooking.dto.LoginRequest;
import com.cabbooking.dto.LoginResponse;
import com.cabbooking.dto.RegisterRequest;
import com.cabbooking.dto.ResetPasswordRequest;
import com.cabbooking.dto.VerifyOtpRequest;
import com.cabbooking.entities.OtpVerification;
import com.cabbooking.entities.User;
import com.cabbooking.repository.OtpVerificationRepository;
import com.cabbooking.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthServices {
	
	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;
	private final OtpVerificationRepository otpVerificationRepository;
	private final EmailService emailService;
	private final JwtUtil jwtUtil;
	
	
	
	private String generateOtp() {
		
		return String.valueOf((int) ((Math.random() * 900000) + 100000));
		
	}
	
	@Override
	public String register(RegisterRequest request) {
		
		// Check email
	    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
	        return "Email already exists";
	    }
	    
	    // Check phone
	    if (userRepository.findByPhone(request.getPhone()).isPresent()) {
	        return "Phone number already exists";
	    }
	    
         
		 User user = modelMapper.map(request, User.class);
		 
		 user.setPassword(passwordEncoder.encode(request.getPassword()));

	        userRepository.save(user);
	        
	        OtpVerification otpVerification = new OtpVerification();

	        String otp = generateOtp();

	        otpVerification.setEmail(user.getEmail());
	        otpVerification.setOtp(otp);

	        emailService.sendOtp(
	                user.getEmail(),
	                otp
	        );
	        otpVerification.setExpiryTime(LocalDateTime.now().plusMinutes(5));
	        otpVerification.setVerified(false);

	        otpVerificationRepository.save(otpVerification);

		return "User Register Successfully";
	}

	@Override
	public String verifyOtp(VerifyOtpRequest request) {
		
		 OtpVerification otpVerification = otpVerificationRepository
		            .findByEmail(request.getEmail())
		            .orElse(null);

		    if (otpVerification == null) {
		        return "OTP not found";
		    }

		    if (otpVerification.getExpiryTime().isBefore(LocalDateTime.now())) {
		        return "OTP expired";
		    }

		    if (!otpVerification.getOtp().equals(request.getOtp())) {
		        return "Invalid OTP";
		    }

		    otpVerification.setVerified(true);

		    otpVerificationRepository.save(otpVerification);


		    // Update user verification status
		    User user = userRepository.findByEmail(request.getEmail())
		            .orElse(null);

		    if (user != null) {
		        user.setIsVerified(true);
		        userRepository.save(user);
		    }

		    return "OTP verified successfully";
	}

	@Override
	public LoginResponse login(LoginRequest request) {

	    User user = userRepository.findByEmail(request.getEmail())
	            .orElse(null);

	    if (user == null) {
	        return new LoginResponse("User not found", null);
	    }


	    if (!passwordEncoder.matches(
	            request.getPassword(),
	            user.getPassword())) {

	        return new LoginResponse("Invalid password", null);
	    }


	    if (!user.getIsVerified()) {
	        return new LoginResponse("Please verify OTP first", null);
	    }


	    String token = jwtUtil.generateToken(user.getEmail());


	    return new LoginResponse(
	            "Login successful",
	            token
	    );
	}

	@Override
	public String forgotPassword(ForgotPasswordRequest request) {

	    User user = userRepository.findByEmail(request.getEmail())
	            .orElse(null);

	    if (user == null) {
	        return "User not found";
	    }

	    String otp = generateOtp();

	    OtpVerification otpVerification = otpVerificationRepository
	            .findByEmail(request.getEmail())
	            .orElse(new OtpVerification());

	    otpVerification.setEmail(request.getEmail());
	    otpVerification.setOtp(otp);
	    otpVerification.setExpiryTime(LocalDateTime.now().plusMinutes(5));
	    otpVerification.setVerified(false);

	    otpVerificationRepository.save(otpVerification);

	    emailService.sendOtp(request.getEmail(), otp);

	    return "OTP sent successfully";
	}

	@Override
	public String resetPassword(ResetPasswordRequest request) {

	    User user = userRepository.findByEmail(request.getEmail())
	            .orElse(null);

	    if (user == null) {
	        return "User not found";
	    }

	    OtpVerification otpVerification = otpVerificationRepository
	            .findByEmail(request.getEmail())
	            .orElse(null);

	    if (otpVerification == null) {
	        return "OTP not found";
	    }

	    if (otpVerification.getExpiryTime().isBefore(LocalDateTime.now())) {
	        return "OTP expired";
	    }

	    if (!otpVerification.getOtp().equals(request.getOtp())) {
	        return "Invalid OTP";
	    }

	    user.setPassword(passwordEncoder.encode(request.getNewPassword()));

	    userRepository.save(user);

	    otpVerificationRepository.delete(otpVerification);

	    return "Password reset successfully";
	}

	@Override
	public String resendOtp(EmailRequest request) {

	    User user = userRepository.findByEmail(request.getEmail())
	            .orElse(null);

	    if (user == null) {
	        return "User not found";
	    }

	    String otp = generateOtp();

	    OtpVerification otpVerification = otpVerificationRepository
	            .findByEmail(request.getEmail())
	            .orElse(new OtpVerification());

	    otpVerification.setEmail(request.getEmail());
	    otpVerification.setOtp(otp);
	    otpVerification.setExpiryTime(LocalDateTime.now().plusMinutes(5));
	    otpVerification.setVerified(false);

	    otpVerificationRepository.save(otpVerification);

	    emailService.sendOtp(request.getEmail(), otp);

	    return "OTP resent successfully";
	}

}
