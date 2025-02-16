package com.anatartari.tatamecontrolapi.infra.database.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "registration_payment")
public class RegistrationPaymentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "registration_id", nullable = false)
    private RegistrationEntity registrationEntity;

    @ManyToOne
    @JoinColumn(name = "payment_id", nullable = false)
    private PaymentEntity paymentEntity;
}