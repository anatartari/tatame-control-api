package com.anatartari.tatamecontrolapi.core.usecases;

import com.anatartari.tatamecontrolapi.core.dto.CreateSportDTO;
import com.anatartari.tatamecontrolapi.core.dto.SportListDTO;
import com.anatartari.tatamecontrolapi.core.model.Sport;

import java.util.List;

public interface SportUseCase {

    Sport create (CreateSportDTO request);

    List<SportListDTO> list();
}
