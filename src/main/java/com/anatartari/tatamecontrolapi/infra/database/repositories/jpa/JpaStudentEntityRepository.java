package com.anatartari.tatamecontrolapi.infra.database.repositories.jpa;

import com.anatartari.tatamecontrolapi.infra.database.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaStudentEntityRepository extends JpaRepository<StudentEntity, Long> {
    StudentEntity findByEmail(String email);

    @Query("""
        SELECT s.id, s.name, s.birthday
            FROM StudentEntity s
    """)
    List<StudentEntity> getAllListInfo();
}