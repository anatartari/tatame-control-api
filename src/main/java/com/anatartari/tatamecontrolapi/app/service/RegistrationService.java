package com.anatartari.tatamecontrolapi.app.service;

import com.anatartari.tatamecontrolapi.core.dto.CreateRegistrationDTO;
import com.anatartari.tatamecontrolapi.core.model.Registration;
import com.anatartari.tatamecontrolapi.core.persistence.IRegistrationRepository;
import com.anatartari.tatamecontrolapi.core.usecases.RegistrationUseCase;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService implements RegistrationUseCase {

    private final IRegistrationRepository registrationRepository;

    public RegistrationService(IRegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    @Override
    public Registration create(CreateRegistrationDTO request) {

        

        return null;
    }
}
