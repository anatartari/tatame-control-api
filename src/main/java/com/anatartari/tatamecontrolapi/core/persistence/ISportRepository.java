package com.anatartari.tatamecontrolapi.core.persistence;

import com.anatartari.tatamecontrolapi.core.dto.CreateSportDTO;
import com.anatartari.tatamecontrolapi.core.model.Sport;

import java.sql.Time;
import java.util.List;
import java.util.Optional;

public interface ISportRepository {

    Optional<Sport> findById(Long id);

    boolean existsByFrequency(List<String> dayOfWeek, Time startTime, Time endTime);

    Sport save(CreateSportDTO request);
}
