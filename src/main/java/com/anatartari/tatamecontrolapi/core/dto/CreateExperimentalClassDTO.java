package com.anatartari.tatamecontrolapi.core.dto;

import java.time.LocalDate;

public record CreateExperimentalClassDTO(String name,
                                         String email,
                                         String phone,
                                         String gender,
                                         LocalDate birthday,
                                         Boolean practicedMartialArts,
                                         String graduatedInStyle,
                                         Long sportId) {
}
