package com.anatartari.tatamecontrolapi.infra.database.repositories;

import com.anatartari.tatamecontrolapi.core.model.Student;
import com.anatartari.tatamecontrolapi.core.persistence.IStudentRepository;
import com.anatartari.tatamecontrolapi.infra.database.mapper.StudentEntityMapper;
import com.anatartari.tatamecontrolapi.infra.database.repositories.jpa.JpaStudentEntityRepository;
import org.springframework.stereotype.Repository;

@Repository
public class StudentRepositoryImpl implements IStudentRepository {

    JpaStudentEntityRepository studentEntityRepository;

    @Override
    public Student create(Student student) {
        return StudentEntityMapper.INSTANCE.toStudent(
                studentEntityRepository.save(StudentEntityMapper.INSTANCE.toEntity(student)));
    }
}
