package com.anatartari.tatamecontrolapi.infra.controller.responses;

import com.anatartari.tatamecontrolapi.core.model.DayOfWeekEnum;
import com.anatartari.tatamecontrolapi.core.model.StatusRegistrationEnum;

import java.sql.Time;
import java.util.List;

public record RegistrationResponse(
            Long id,
            String studentName,
            String studentEmail,
            String sportName,
            List<DayOfWeekEnum> dayOfWeek,
            Time startTime,
            Time endTime,
            StatusRegistrationEnum status
) {
}
