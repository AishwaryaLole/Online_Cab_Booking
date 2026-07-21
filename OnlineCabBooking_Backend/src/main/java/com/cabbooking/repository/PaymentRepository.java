package com.cabbooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cabbooking.entities.Payment;
import com.cabbooking.enums.PaymentStatus;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    default List<Payment> findAllPayments() {
        return findAll();
    }

    List<Payment> findAllByPaymentStatus(PaymentStatus paymentStatus);
}