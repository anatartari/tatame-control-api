package com.anatartari.tatamecontrolapi.core.usecases;

import com.anatartari.tatamecontrolapi.core.dto.CreateExperimentalClassDTO;
import com.anatartari.tatamecontrolapi.core.model.ExperimentalClass;

public interface ExperimentalClassUseCase {
    ExperimentalClass create (CreateExperimentalClassDTO request);
}
