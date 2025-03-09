package com.anatartari.tatamecontrolapi.core.dto;

import com.anatartari.tatamecontrolapi.core.model.DayOfWeekEnum;

import java.sql.Time;
import java.util.List;

public record SportListDTO(Long id,
                           String name,
                           Double price,
                           Time startTime,
                           Time endTime,
                           List<DayOfWeekEnum> daysOfWeek,
                           long countStudents) {

    public SportListDTO(Long id, String name, Double price, Time startTime, Time endTime, String daysOfWeek, long countStudents) {
        this(id, name, price, startTime, endTime, DayOfWeekEnum.getEnumListFromString(daysOfWeek), countStudents);
    }
}
