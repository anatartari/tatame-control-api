package com.anatartari.tatamecontrolapi.core.persistence;

import com.anatartari.tatamecontrolapi.core.dto.CreateSportDTO;
import com.anatartari.tatamecontrolapi.core.model.Sport;

import java.util.Optional;

public interface ISportRepository {

    Optional<Sport> findById(Long id);
    Sport save(CreateSportDTO request);
}
