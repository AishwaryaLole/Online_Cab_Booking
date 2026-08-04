package com.cabbooking.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cabbooking.dto.PaymentRequestDto;
import com.cabbooking.entities.Payment;
import com.cabbooking.entities.Ride;
import com.cabbooking.enums.PaymentMethod;
import com.cabbooking.enums.PaymentStatus;
import com.cabbooking.enums.RideStatus;
import com.cabbooking.exception.BadRequestException;
import com.cabbooking.exception.ResourceNotFoundException;
import com.cabbooking.repository.PaymentRepository;
import com.cabbooking.repository.RideRepository;

@Service
public class PaymentServiceImpl implements IPaymentService {

    private final PaymentRepository paymentRepository;
    private final RideRepository rideRepository;
    private final RideService rideService;

    public PaymentServiceImpl(PaymentRepository paymentRepository, RideRepository rideRepository,
            RideService rideService) {
        this.paymentRepository = paymentRepository;
        this.rideRepository = rideRepository;
        this.rideService = rideService;
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

        // Two valid moments to pay:
        //  - PAYMENT_PENDING: prepaying for a UPI/CARD ride before a driver
        //    is even assigned.
        //  - IN_PROGRESS with method CASH: the driver has dropped the
        //    passenger and is collecting cash right now, just before
        //    tapping "Complete ride".
        boolean isOnlinePrepay = ride.getStatus() == RideStatus.PAYMENT_PENDING
                && ride.getPaymentMethod() != null && ride.getPaymentMethod() != PaymentMethod.CASH;
        boolean isCashCollection = ride.getStatus() == RideStatus.IN_PROGRESS
                && (ride.getPaymentMethod() == null || ride.getPaymentMethod() == PaymentMethod.CASH);

        if (!isOnlinePrepay && !isCashCollection) {
            throw new BadRequestException(
                    "Payment isn't allowed for this ride's current status (" + ride.getStatus() + ").");
        }

        paymentRepository.findByRideId(request.getRideId()).ifPresent(existing -> {
            throw new BadRequestException("Payment already exists for ride id " + request.getRideId());
        });

        // Guard against a null fare (e.g. an older ride booked before fare was
        // calculated) instead of letting the auto-unboxing throw a raw NPE.
        Double resolvedAmount = request.getAmount() != null ? request.getAmount() : ride.getFare();
        if (resolvedAmount == null || resolvedAmount <= 0) {
            throw new BadRequestException("Payment amount must be greater than zero.");
        }
        double amount = resolvedAmount;

        Payment payment = new Payment();
        payment.setRide(ride);
        payment.setAmount(amount);
        payment.setPaymentMethod(request.getPaymentMethod());
        // There's no real payment gateway wired up here (no webhook/callback
        // ever moves a payment from PENDING to SUCCESS), so this makePayment
        // call itself represents the whole (simulated) charge - mark it
        // SUCCESS immediately unless the caller says otherwise.
        payment.setPaymentStatus(request.getPaymentStatus() != null ? request.getPaymentStatus() : PaymentStatus.SUCCESS);

        Payment savedPayment = paymentRepository.save(payment);

        if (isOnlinePrepay && savedPayment.getPaymentStatus() == PaymentStatus.SUCCESS) {
            // The "real" booking happens now: match this prepaid ride to the
            // nearest available driver.
            rideService.assignNearestDriverAfterPayment(ride.getId());
        }

        return savedPayment;
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
