package com.anatartari.tatamecontrolapi.infra.controller.mapper;

import com.anatartari.tatamecontrolapi.core.dto.CreateRegistrationDTO;
import com.anatartari.tatamecontrolapi.core.model.Registration;
import com.anatartari.tatamecontrolapi.infra.controller.responses.RegistrationResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RegistrationControllerMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "student", source = "student")
    @Mapping(target = "student.address", source = "address")
    @Mapping(target = "student.medicalInfo", source = "medicalInfo")
    Registration toRegistration(CreateRegistrationDTO createRegistrationDTO);

    @Mapping(target = "studentName", source = "student.name")
    @Mapping(target = "studentName", source = "student.name")
    @Mapping(target = "sportName", source = "sport.name")
    @Mapping(target = "dayOfWeek", source = "sport.dayOfWeek")
    @Mapping(target = "startTime", source = "sport.startTime")
    @Mapping(target = "endTime", source = "sport.endTime")
    RegistrationResponse toResponse(Registration registration);


}
