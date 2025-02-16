package com.anatartari.tatamecontrolapi.infra.database.repositories;

import com.anatartari.tatamecontrolapi.core.model.Sport;
import com.anatartari.tatamecontrolapi.core.persistence.ISportRepository;
import com.anatartari.tatamecontrolapi.infra.database.entity.SportEntity;
import com.anatartari.tatamecontrolapi.infra.database.mapper.SportEntityMapper;
import com.anatartari.tatamecontrolapi.infra.database.repositories.jpa.JpaSportRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class SportRepositoryImpl implements ISportRepository {

    private final JpaSportRepository jpaSportRepository;

    public SportRepositoryImpl(JpaSportRepository jpaSportRepository) {
        this.jpaSportRepository = jpaSportRepository;
    }

    public Optional<Sport> findById(Long id) {
        Optional<SportEntity> sportEntity = jpaSportRepository.findById(id);
        return sportEntity.map(SportEntityMapper.INSTANCE::toSport);
    }
}
