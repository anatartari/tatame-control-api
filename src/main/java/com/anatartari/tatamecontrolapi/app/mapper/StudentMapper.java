package com.anatartari.tatamecontrolapi.app.mapper;

import com.anatartari.tatamecontrolapi.core.dto.CreateExperimentalClassDTO;
import com.anatartari.tatamecontrolapi.core.model.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface StudentMapper {

    StudentMapper INSTANCE = Mappers.getMapper(StudentMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "allowSocialMedia", constant = "false")
    @Mapping(target = "instagram", ignore = true)
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "medicalInfoEntity", ignore = true)
    Student createExperimentalToStudent(CreateExperimentalClassDTO dto);
}