package com.cabbooking.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cabbooking.entities.OtpVerification;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long>{
	
	Optional<OtpVerification> findByEmail(String email);

}
