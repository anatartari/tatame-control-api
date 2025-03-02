package com.anatartari.tatamecontrolapi.infra.database.repositories;

import com.anatartari.tatamecontrolapi.core.model.Student;
import com.anatartari.tatamecontrolapi.core.persistence.IStudentRepository;
import com.anatartari.tatamecontrolapi.infra.database.mapper.StudentEntityMapper;
import com.anatartari.tatamecontrolapi.infra.database.repositories.jpa.JpaStudentEntityRepository;
import org.springframework.stereotype.Repository;

@Repository
public class StudentRepositoryImpl implements IStudentRepository {

    private final JpaStudentEntityRepository studentEntityRepository;

    private final StudentEntityMapper studentEntityMapper;

    public StudentRepositoryImpl(JpaStudentEntityRepository studentEntityRepository, StudentEntityMapper studentEntityMapper) {
        this.studentEntityRepository = studentEntityRepository;
        this.studentEntityMapper = studentEntityMapper;
    }

    @Override
    public Student create(Student student) {
        return studentEntityMapper.toStudent(
                studentEntityRepository.save(studentEntityMapper.toEntity(student)));
    }
}
