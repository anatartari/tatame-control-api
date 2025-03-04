package com.anatartari.tatamecontrolapi.infra.database.repositories;

import com.anatartari.tatamecontrolapi.core.dto.CreateRegistrationDTO;
import com.anatartari.tatamecontrolapi.core.model.Registration;
import com.anatartari.tatamecontrolapi.core.persistence.IRegistrationRepository;
import org.springframework.stereotype.Repository;

@Repository
public class RegistrationRepositoryImpl implements IRegistrationRepository {
    @Override
    public Registration create(CreateRegistrationDTO request) {
        return null;
    }
}
