package com.anatartari.tatamecontrolapi.core.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;


public record CreateExperimentalClassDTO(
        @NotBlank @Size(max = 100) String name,
        @NotBlank @Email String email,
        @NotBlank @Size(max = 15) String phone,
        @NotBlank String gender,
        @NotNull @Past LocalDate birthday,
        @NotNull Boolean practicedMartialArts,
        String graduatedInStyle,
        @NotNull Long sportId) {
}
