package com.anatartari.tatamecontrolapi.core.model;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class MedicalInfo {
    Long id;
    Boolean smoker;
    String lastBloodPressureCheck;
    String lastBloodPressureMeasurement;
    Boolean hasFamilyHistoryOfDiabetes;
    Boolean knownHeartCondition;
    Boolean hadHighCholesterolRecently;
    Double overweightAmount;
    String orthopedicIssueLocation;
    String prescribedMedication;
    String usesSupplements;
    LocalDate lastPhysicalExamDate;
    Boolean doesRegularExercise;
    Boolean mightBePregnant;
    Boolean fitnessDeclaration;
}