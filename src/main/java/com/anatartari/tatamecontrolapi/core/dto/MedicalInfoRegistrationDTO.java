package com.anatartari.tatamecontrolapi.core.dto;

import java.time.LocalDate;

public record MedicalInfoRegistrationDTO(
        Boolean smoker,
        String lastBloodPressureCheck,
        String lastBloodPressureMeasurement,
        Boolean hasFamilyHistoryOfDiabetes,
        Boolean knownHeartCondition,
        Boolean hadHighCholesterolRecently,
        Double overweightAmount,
        String orthopedicIssueLocation,
        String prescribedMedication,
        String usesSupplements,
        LocalDate lastPhysicalExamDate,
        Boolean doesRegularExercise,
        Boolean mightBePregnant,
        Boolean fitnessDeclaration

) {
}
