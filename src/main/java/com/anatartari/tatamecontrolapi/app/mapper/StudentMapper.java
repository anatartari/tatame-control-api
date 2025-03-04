package com.anatartari.tatamecontrolapi.app.mapper;

import com.anatartari.tatamecontrolapi.core.dto.CreateExperimentalClassDTO;
import com.anatartari.tatamecontrolapi.core.model.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StudentMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "allowSocialMedia", constant = "false")
    @Mapping(target = "instagram", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "medicalInfo", ignore = true)
    Student createExperimentalToStudent(CreateExperimentalClassDTO dto);
}