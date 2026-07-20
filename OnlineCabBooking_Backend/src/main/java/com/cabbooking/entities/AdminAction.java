package com.cabbooking.entities;


import java.time.LocalDateTime;

import com.cabbooking.enums.AdminActionType;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "admin_actions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminAction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================
    // Admin Mapping
    // ==========================

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private User admin;

    // ==========================

    @Enumerated(EnumType.STRING)
    @Column(name = "action_type", nullable = false)
    private AdminActionType actionType;

    @Column(name = "target_id", nullable = false)
    private Long targetId;

    @Column
    private String remarks;

    @Column(name = "action_date", updatable = false)
    private LocalDateTime actionDate;

    @PrePersist
    public void prePersist() {
        actionDate = LocalDateTime.now();
    }
}
