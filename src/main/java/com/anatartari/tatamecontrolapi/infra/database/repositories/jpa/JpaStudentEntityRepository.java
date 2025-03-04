package com.anatartari.tatamecontrolapi.infra.database.repositories.jpa;

import com.anatartari.tatamecontrolapi.infra.database.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaStudentEntityRepository extends JpaRepository<StudentEntity, Long> {
    StudentEntity findByEmail(String email);
}