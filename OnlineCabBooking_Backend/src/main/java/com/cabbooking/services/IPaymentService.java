package com.cabbooking.services;

import java.util.List;

import com.cabbooking.dto.PaymentRequestDto;
import com.cabbooking.entities.Payment;

public interface IPaymentService {

    Payment makePayment(PaymentRequestDto request);

    Payment getPaymentStatus(Long paymentId);

    List<Payment> getPaymentHistory(Long userId);

    List<Payment> getPaymentHistoryByRide(Long rideId);
}