package com.cabbooking.entities;



import java.time.LocalDateTime;

import com.cabbooking.enums.PaymentMethod;
import com.cabbooking.enums.PaymentStatus;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================
    // Ride Mapping
    // ==========================

    @OneToOne
    @JoinColumn(name = "ride_id", nullable = false, unique = true)
    private Ride ride;

    // ==========================

    @Column(nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @PrePersist
    public void prePersist() {
        paymentDate = LocalDateTime.now();
    }
}
