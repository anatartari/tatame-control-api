package com.anatartari.tatamecontrolapi.infra.controller.responses;

import java.time.LocalDate;

public record CreateExperimentalClassResponse(Long id,
                                              Long studentId,
                                              String studentEmail,
                                              String studentName,
                                              Long sportId,
                                              String sportName,
                                              LocalDate date) {
}
