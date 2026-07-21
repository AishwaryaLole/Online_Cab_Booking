package com.cabbooking.entities;



import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ratings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Rating {

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
    // Passenger Mapping
    // ==========================

    @ManyToOne
    @JoinColumn(name = "passenger_id", nullable = false)
    private User passenger;

    // ==========================
    // Driver Mapping
    // ==========================

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private Driver driver;

    // ==========================

    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }
}
