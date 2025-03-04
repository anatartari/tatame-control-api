package com.anatartari.tatamecontrolapi.core.persistence;

import com.anatartari.tatamecontrolapi.core.dto.CreateRegistrationDTO;
import com.anatartari.tatamecontrolapi.core.model.Registration;

public interface IRegistrationRepository {
    Registration create(CreateRegistrationDTO request);
}
