package com.anatartari.tatamecontrolapi.infra.database.repositories;

import com.anatartari.tatamecontrolapi.core.dto.CreateSportDTO;
import com.anatartari.tatamecontrolapi.core.dto.SportListDTO;
import com.anatartari.tatamecontrolapi.core.model.Sport;
import com.anatartari.tatamecontrolapi.core.persistence.ISportRepository;
import com.anatartari.tatamecontrolapi.infra.database.entity.SportEntity;
import com.anatartari.tatamecontrolapi.infra.database.mapper.SportEntityMapper;
import com.anatartari.tatamecontrolapi.infra.database.repositories.jpa.JpaSportRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class SportRepositoryImpl implements ISportRepository {

    private final JpaSportRepository jpaSportRepository;

    private final SportEntityMapper sportEntityMapper;

    public SportRepositoryImpl(JpaSportRepository jpaSportRepository, SportEntityMapper sportEntityMapper) {
        this.jpaSportRepository = jpaSportRepository;
        this.sportEntityMapper = sportEntityMapper;
    }

    public Optional<Sport> findById(Long id) {
        Optional<SportEntity> sportEntity = jpaSportRepository.findById(id);
        return sportEntity.map(sportEntityMapper::toSport);
    }


    @Override
    public Sport save(CreateSportDTO request) {
        return sportEntityMapper
                .toSport(jpaSportRepository.save(sportEntityMapper.toSportEntity(request)));
    }

    @Override
    public List<SportListDTO> list() {
        return jpaSportRepository.findAllSportsWithStudentCount();
    }
}
