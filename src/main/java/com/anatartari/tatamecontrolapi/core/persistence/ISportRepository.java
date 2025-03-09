package com.anatartari.tatamecontrolapi.core.persistence;

import com.anatartari.tatamecontrolapi.core.dto.CreateSportDTO;
import com.anatartari.tatamecontrolapi.core.dto.SportListDTO;
import com.anatartari.tatamecontrolapi.core.model.Sport;

import java.util.List;
import java.util.Optional;

public interface ISportRepository {

    Optional<Sport> findById(Long id);
    Sport save(CreateSportDTO request);

    List<SportListDTO> list();
}
