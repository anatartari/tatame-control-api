package com.anatartari.tatamecontrolapi.infra.controller.responses;

import java.sql.Time;

public record CreateSportResponse(Long id, String name, String sensei, Double price, String dayOfWeek, Time startTime, Time endTime) {
}