package com.anatartari.tatamecontrolapi.infra.database.mapper;

import com.anatartari.tatamecontrolapi.core.model.Registration;
import com.anatartari.tatamecontrolapi.infra.database.entity.RegistrationEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RegistrationEntityMapper {

    Registration toRegistration(RegistrationEntity registrationEntity);


    RegistrationEntity toEntity(Registration registration);
}
