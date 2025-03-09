package com.anatartari.tatamecontrolapi.infra.controller.responses;

import java.sql.Time;

public record SportListingResponse(Long id,
                                   String name,
                                   Double price,
                                   Time startTime,
                                   Time endTime,
                                   String[] daysOfWeek,
                                   int countStudents ) {
}
