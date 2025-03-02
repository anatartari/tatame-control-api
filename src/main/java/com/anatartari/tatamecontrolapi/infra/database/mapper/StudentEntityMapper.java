package com.anatartari.tatamecontrolapi.infra.database.mapper;

import com.anatartari.tatamecontrolapi.core.model.Student;
import com.anatartari.tatamecontrolapi.infra.database.entity.StudentEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StudentEntityMapper {
    StudentEntity toEntity(Student student);

    Student toStudent(StudentEntity studentEntity);
}
