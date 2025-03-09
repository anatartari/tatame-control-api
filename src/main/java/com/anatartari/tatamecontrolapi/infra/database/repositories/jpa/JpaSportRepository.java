package com.anatartari.tatamecontrolapi.infra.database.repositories.jpa;

import com.anatartari.tatamecontrolapi.core.dto.SportListDTO;
import com.anatartari.tatamecontrolapi.infra.database.entity.SportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaSportRepository extends JpaRepository<SportEntity, Long> {

    @Query("""
       SELECT new com.anatartari.tatamecontrolapi.core.dto.SportListDTO(
               s.id,
               s.name,
               s.price,
               s.startTime,
               s.endTime,
               s.dayOfWeek,
               COUNT(r.id)
           )
       FROM SportEntity s
       LEFT JOIN RegistrationEntity r ON r.sport.id = s.id AND r.status = 'ACTIVE'
       GROUP BY s.id, s.name, s.price, s.startTime, s.endTime, s.dayOfWeek
       """)
    List<SportListDTO> findAllSportsWithStudentCount();

}
