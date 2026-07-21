package com.cabbooking.entities;




import java.time.LocalDateTime;
import java.util.List;

import com.cabbooking.enums.Role;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ==============================
    // Relationships
    // ==============================

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Driver driver;

    @OneToMany(mappedBy = "passenger")
    private List<Ride> rides;

    @OneToMany(mappedBy = "passenger")
    private List<Rating> ratings;

    @OneToMany(mappedBy = "admin")
    private List<AdminAction> adminActions;

    // ==============================

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