package com.anatartari.tatamecontrolapi.infra.database.repositories.jpa;

import com.anatartari.tatamecontrolapi.infra.database.entity.SportEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaSportRepository extends JpaRepository<SportEntity, Long> {
}
