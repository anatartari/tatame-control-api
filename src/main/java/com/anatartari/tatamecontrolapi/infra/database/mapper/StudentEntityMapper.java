package com.anatartari.tatamecontrolapi.infra.database.mapper;

import com.anatartari.tatamecontrolapi.core.model.Student;
import com.anatartari.tatamecontrolapi.infra.database.entity.StudentEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface StudentEntityMapper {
    public StudentEntityMapper INSTANCE = Mappers.getMapper(StudentEntityMapper.class);

    StudentEntity toEntity(Student student);

    Student toStudent(StudentEntity studentEntity);
}
