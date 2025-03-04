package com.anatartari.tatamecontrolapi.core.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record StudentRegistrationDTO(
    String name,

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    String email,

    String phone,

    String gender,

    LocalDate birthday,

    Boolean allowSocialMedia,

    String instagram,

    Boolean practicedMartialArts,

    String graduatedInStyle
) {
}
