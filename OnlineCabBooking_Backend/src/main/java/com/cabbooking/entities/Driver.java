package com.cabbooking.entities;



import java.util.ArrayList;
import java.util.List;

import com.cabbooking.enums.DriverStatus;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "drivers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================
    // User Mapping
    // ==========================

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    // ==========================

    @Column(name = "license_number", nullable = false, unique = true)
    private String licenseNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DriverStatus status = DriverStatus.PENDING;

    @Column(nullable = false)
    private Boolean availability = true;

    @Column(nullable = false)
    private Double rating = 5.0;

    @Column(name = "total_rides", nullable = false)
    private Integer totalRides = 0;

    // ==========================
    // Relationships
    // ==========================

    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
    private List<Vehicle> vehicles = new ArrayList<>();

    @OneToOne(mappedBy = "driver", cascade = CascadeType.ALL)
    private DriverLocation driverLocation;

    @OneToMany(mappedBy = "driver")
    private List<Ride> rides = new ArrayList<>();

    @OneToMany(mappedBy = "driver")
    private List<Rating> ratings = new ArrayList<>();
}
