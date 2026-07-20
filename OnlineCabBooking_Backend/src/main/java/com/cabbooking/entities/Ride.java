package com.cabbooking.entities;



import java.time.LocalDateTime;

import com.cabbooking.enums.RideStatus;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rides")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ride {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    @JoinColumn(name = "driver_id")
    private Driver driver;

    // ==========================
    // Pickup Details
    // ==========================

    @Column(name = "pickup_location", nullable = false)
    private String pickupLocation;

    @Column(name = "pickup_latitude", nullable = false)
    private Double pickupLatitude;

    @Column(name = "pickup_longitude", nullable = false)
    private Double pickupLongitude;

    // ==========================
    // Drop Details
    // ==========================

    @Column(name = "drop_location", nullable = false)
    private String dropLocation;

    @Column(name = "drop_latitude", nullable = false)
    private Double dropLatitude;

    @Column(name = "drop_longitude", nullable = false)
    private Double dropLongitude;

    // ==========================

    @Column(name = "distance_km")
    private Double distanceKm;

    @Column(name = "duration_min")
    private Integer durationMin;

    @Column
    private Double fare;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RideStatus status = RideStatus.REQUESTED;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ==========================
    // Relationships
    // ==========================

    @OneToOne(mappedBy = "ride", cascade = CascadeType.ALL)
    private Payment payment;

    @OneToOne(mappedBy = "ride", cascade = CascadeType.ALL)
    private Rating rating;

    // ==========================

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
