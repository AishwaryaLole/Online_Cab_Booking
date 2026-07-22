package com.cabbooking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cabbooking.entities.Payment;
import com.cabbooking.enums.PaymentStatus;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    default List<Payment> findAllPayments() {
        return findAll();
    }

    Optional<Payment> findByRideId(Long rideId);

    List<Payment> findByRidePassengerId(Long passengerId);

    List<Payment> findAllByPaymentStatus(PaymentStatus paymentStatus);
}