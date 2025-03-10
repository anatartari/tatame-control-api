package com.anatartari.tatamecontrolapi.infra.database.entity;

import com.anatartari.tatamecontrolapi.core.model.StatusRegistrationEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "registration")
public class RegistrationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @ManyToOne
    @JoinColumn(name = "sport_id", nullable = false)
    private SportEntity sport;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private StatusRegistrationEnum status;

    @ManyToMany
    @JoinTable(name = "registration_payment",
            joinColumns = @JoinColumn(name = "registration_id"),
            inverseJoinColumns = @JoinColumn(name = "payment_id"))
    private List<PaymentEntity> payments = new ArrayList<>();

}