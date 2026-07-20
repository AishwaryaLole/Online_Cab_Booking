package com.cabbooking.entities;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "vehicles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================
    // Driver Mapping
    // ==========================

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private Driver driver;

    // ==========================

    @Column(name = "vehicle_number", nullable = false, unique = true)
    private String vehicleNumber;

    @Column(name = "vehicle_type")
    private String vehicleType;

    @Column
    private String model;

    @Column
    private String color;

}
