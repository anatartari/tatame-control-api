package com.anatartari.tatamecontrolapi.infra.database.repositories.jpa;

import com.anatartari.tatamecontrolapi.infra.database.entity.ExperimentalClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;

public interface JpaExperimentalClassRepository extends JpaRepository<ExperimentalClassEntity, Long> {

    boolean existsByStudentEntity_EmailIgnoreCaseAndSportEntity_Id(@NonNull String studentEmail, @NonNull Long sportId);
}
