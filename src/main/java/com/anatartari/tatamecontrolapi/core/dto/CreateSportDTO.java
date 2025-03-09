package com.anatartari.tatamecontrolapi.core.dto;

import com.anatartari.tatamecontrolapi.core.model.DayOfWeekEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreateSportDTO(
        @NotBlank(message = "Name cannot be null or empty") String name,
        @NotEmpty(message = "Day of Week cannot be null or empty") List<DayOfWeekEnum> dayOfWeek,
        @NotNull(message = "Start Time cannot be null") String startTime,
        @NotNull(message = "End Time cannot be null") String endTime,
        @NotBlank(message = "Sensei cannot be null or empty") String sensei,
        @NotNull(message = "Price cannot be null") Double price
) {
}
