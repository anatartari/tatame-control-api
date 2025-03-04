package com.anatartari.tatamecontrolapi.infra.database.repositories.jpa;

import com.anatartari.tatamecontrolapi.infra.database.entity.RegistrationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaRegistrationRepository extends JpaRepository<RegistrationEntity, Long> {

    boolean existsByStudent_IdAndSport_Id(Long studentId, Long sportId);
}
