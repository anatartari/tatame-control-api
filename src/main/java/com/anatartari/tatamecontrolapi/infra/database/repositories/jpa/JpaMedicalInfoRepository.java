package com.anatartari.tatamecontrolapi.infra.database.repositories.jpa;

import com.anatartari.tatamecontrolapi.infra.database.entity.MedicalInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaMedicalInfoRepository extends JpaRepository<MedicalInfoEntity, Long> {
}
