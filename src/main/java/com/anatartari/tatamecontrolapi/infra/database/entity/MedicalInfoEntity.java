package com.anatartari.tatamecontrolapi.infra.database.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "medical_info")
public class MedicalInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Boolean smoker;

    @Column(nullable = false)
    private String lastBloodPressureCheck;

    @Column(nullable = false)
    private String lastBloodPressureMeasurement;

    @Column(nullable = false)
    private Boolean hasFamilyHistoryOfDiabetes;

    @Column(nullable = false)
    private Boolean knownHeartCondition;

    @Column(nullable = false)
    private Boolean hadHighCholesterolRecently;

    @Column(nullable = false)
    private Double overweightAmount;

    @Column(nullable = false)
    private String orthopedicIssueLocation;

    @Column(nullable = false)
    private String prescribedMedication;

    @Column(nullable = false)
    private String usesSupplements;

    @Column(nullable = false)
    private LocalDate lastPhysicalExamDate;

    @Column(nullable = false)
    private Boolean doesRegularExercise;

    @Column(nullable = false)
    private Boolean mightBePregnant;

    @Column(nullable = false)
    private Boolean fitnessDeclaration;
}