package com.cabbooking.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cabbooking.dto.ApiResponse;
import com.cabbooking.dto.PaymentRequestDto;
import com.cabbooking.dto.PaymentResponseDto;
import com.cabbooking.entities.Payment;
import com.cabbooking.services.IPaymentService;

import jakarta.validation.Valid;
//payment

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final IPaymentService paymentService;

    public PaymentController(IPaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/make")
    public ResponseEntity<ApiResponse<PaymentResponseDto>> makePayment(@Valid @RequestBody PaymentRequestDto request) {
        Payment payment = paymentService.makePayment(request);
        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                "Payment made successfully.",
                toResponse(payment)
        ));
    }

    @GetMapping("/{paymentId}/status")
    public ResponseEntity<ApiResponse<PaymentResponseDto>> getPaymentStatus(@PathVariable Long paymentId) {
        Payment payment = paymentService.getPaymentStatus(paymentId);
        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                "Payment status fetched successfully.",
                toResponse(payment)
        ));
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<ApiResponse<List<PaymentResponseDto>>> getPaymentHistory(@PathVariable Long userId) {
        List<PaymentResponseDto> payments = paymentService.getPaymentHistory(userId)
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                "Payment history fetched successfully.",
                payments
        ));
    }

    @GetMapping("/rides/{rideId}")
    public ResponseEntity<ApiResponse<List<PaymentResponseDto>>> getPaymentHistoryByRide(@PathVariable Long rideId) {
        List<PaymentResponseDto> payments = paymentService.getPaymentHistoryByRide(rideId)
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(new ApiResponse<>(
                HttpStatus.OK.value(),
                true,
                "Payment history for ride fetched successfully.",
                payments
        ));
    }

    private PaymentResponseDto toResponse(Payment payment) {
        Long rideId = payment.getRide() != null ? payment.getRide().getId() : null;
        Long passengerId = payment.getRide() != null && payment.getRide().getPassenger() != null
                ? payment.getRide().getPassenger().getId()
                : null;

        return new PaymentResponseDto(
                payment.getId(),
                rideId,
                passengerId,
                payment.getAmount(),
                payment.getPaymentMethod(),
                payment.getPaymentStatus(),
                payment.getPaymentDate()
        );
    }
}
