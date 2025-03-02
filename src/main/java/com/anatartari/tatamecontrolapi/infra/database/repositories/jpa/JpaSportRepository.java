package com.anatartari.tatamecontrolapi.infra.database.repositories.jpa;

import com.anatartari.tatamecontrolapi.infra.database.entity.SportEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Time;

public interface JpaSportRepository extends JpaRepository<SportEntity, Long> {
    boolean existsByDayOfWeekContainsAndStartTimeAndEndTime(String dayOfWeek, Time startTime, Time endTime);
}
