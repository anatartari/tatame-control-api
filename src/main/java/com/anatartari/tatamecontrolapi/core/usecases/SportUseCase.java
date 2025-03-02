package com.anatartari.tatamecontrolapi.core.usecases;

import com.anatartari.tatamecontrolapi.core.dto.CreateSportDTO;
import com.anatartari.tatamecontrolapi.core.model.Sport;

public interface SportUseCase {

    Sport create (CreateSportDTO request);
}
