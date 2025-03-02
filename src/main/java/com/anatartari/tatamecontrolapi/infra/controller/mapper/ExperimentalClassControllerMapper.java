package com.anatartari.tatamecontrolapi.infra.controller.mapper;

import com.anatartari.tatamecontrolapi.core.model.ExperimentalClass;
import com.anatartari.tatamecontrolapi.infra.controller.responses.CreateExperimentalClassResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ExperimentalClassControllerMapper {

    ExperimentalClassControllerMapper INSTANCE = Mappers.getMapper(ExperimentalClassControllerMapper.class);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "studentId", source = "student.id")
    @Mapping(target = "studentEmail", source = "student.email")
    @Mapping(target = "studentName", source = "student.name")
    @Mapping(target = "sportId", source = "sport.id")
    @Mapping(target = "sportName", source = "sport.name")
    //@Mapping(target = "date", source = "date")
    CreateExperimentalClassResponse createExperimentalClassResponse(ExperimentalClass experimentalClass);
}
