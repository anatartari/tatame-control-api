package com.anatartari.tatamecontrolapi.core.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record CreateRegistrationDTO(

        @Valid @NotNull(message = "Student information is mandatory")
        StudentRegistrationDTO student,

        @NotNull(message = "Sport ID is mandatory")
        Long sportId,

        @Valid @NotNull(message = "Address information is mandatory")
        AddressRegistrationDTO address,

        @Valid @NotNull(message = "Medical information is mandatory")
        MedicalInfoRegistrationDTO medicalInfo) {
}

