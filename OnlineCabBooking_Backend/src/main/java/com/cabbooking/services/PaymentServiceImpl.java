package com.cabbooking.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cabbooking.dto.PaymentRequestDto;
import com.cabbooking.entities.Payment;
import com.cabbooking.entities.Ride;
import com.cabbooking.enums.PaymentStatus;
import com.cabbooking.exception.BadRequestException;
import com.cabbooking.exception.ResourceNotFoundException;
import com.cabbooking.repository.PaymentRepository;
import com.cabbooking.repository.RideRepository;

@Service
public class PaymentServiceImpl implements IPaymentService {

    private final PaymentRepository paymentRepository;
    private final RideRepository rideRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository, RideRepository rideRepository) {
        this.paymentRepository = paymentRepository;
        this.rideRepository = rideRepository;
    }

    @Override
    @Transactional
    public Payment makePayment(PaymentRequestDto request) {
        if (request == null) {
            throw new BadRequestException("Payment request is required.");
        }
        if (request.getRideId() == null) {
            throw new BadRequestException("Ride id is required.");
        }
        if (request.getPaymentMethod() == null) {
            throw new BadRequestException("Payment method is required.");
        }

        Ride ride = rideRepository.findByRideId(request.getRideId())
                .orElseThrow(() -> new ResourceNotFoundException("Ride not found with id " + request.getRideId()));

        paymentRepository.findByRideId(request.getRideId()).ifPresent(existing -> {
            throw new BadRequestException("Payment already exists for ride id " + request.getRideId());
        });

        double amount = request.getAmount() != null ? request.getAmount() : ride.getFare();
        if (amount <= 0) {
            throw new BadRequestException("Payment amount must be greater than zero.");
        }

        Payment payment = new Payment();
        payment.setRide(ride);
        payment.setAmount(amount);
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentStatus(request.getPaymentStatus() != null ? request.getPaymentStatus() : PaymentStatus.PENDING);

        return paymentRepository.save(payment);
    }

    @Override
    @Transactional(readOnly = true)
    public Payment getPaymentStatus(Long paymentId) {
        if (paymentId == null) {
            throw new BadRequestException("Payment id is required.");
        }

        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id " + paymentId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Payment> getPaymentHistory(Long userId) {
        if (userId == null) {
            throw new BadRequestException("User id is required.");
        }

        return paymentRepository.findByRidePassengerId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Payment> getPaymentHistoryByRide(Long rideId) {
        if (rideId == null) {
            throw new BadRequestException("Ride id is required.");
        }

        return paymentRepository.findAll().stream()
                .filter(payment -> payment.getRide() != null && rideId.equals(payment.getRide().getId()))
                .toList();
    }
}