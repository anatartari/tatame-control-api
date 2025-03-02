package com.anatartari.tatamecontrolapi.core.model;

import lombok.*;

import java.sql.Time;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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
