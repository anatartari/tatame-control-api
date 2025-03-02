package com.anatartari.tatamecontrolapi.core.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class Sport {
    private Long id;
    private String name;
    private String sensei;
    private Double price;
    private String dayOfWeek;
    private Time startTime;
    private Time endTime;
}
