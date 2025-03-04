package com.anatartari.tatamecontrolapi.app.mapper;

import com.anatartari.tatamecontrolapi.core.dto.CreateExperimentalClassDTO;
import com.anatartari.tatamecontrolapi.core.dto.CreateRegistrationDTO;
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


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "address", source = "address")
    @Mapping(target = "medicalInfo", source = "medicalInfo")
    @Mapping(target = "allowSocialMedia", source = "student.allowSocialMedia")
    @Mapping(target = "name", source = "student.name")
    @Mapping(target = "email", source = "student.email")
    @Mapping(target = "phone", source = "student.phone")
    @Mapping(target = "gender", source = "student.gender")
    @Mapping(target = "birthday", source = "student.birthday")
    @Mapping(target = "practicedMartialArts", source = "student.practicedMartialArts")
    @Mapping(target = "graduatedInStyle", source = "student.graduatedInStyle")
    @Mapping(target = "instagram", source = "student.instagram")
    Student createRegistrationToStudent(CreateRegistrationDTO dto);
}