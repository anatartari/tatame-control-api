package com.anatartari.tatamecontrolapi.core.usecases;

import com.anatartari.tatamecontrolapi.core.dto.CreateRegistrationDTO;
import com.anatartari.tatamecontrolapi.core.model.Registration;

public interface RegistrationUseCase {

    Registration create(CreateRegistrationDTO request);
}
