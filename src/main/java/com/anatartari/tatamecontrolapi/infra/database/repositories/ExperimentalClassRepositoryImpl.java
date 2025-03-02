package com.anatartari.tatamecontrolapi.infra.database.repositories;

import com.anatartari.tatamecontrolapi.core.model.ExperimentalClass;
import com.anatartari.tatamecontrolapi.core.persistence.IExperimentalClassRepository;
import com.anatartari.tatamecontrolapi.infra.database.entity.ExperimentalClassEntity;
import com.anatartari.tatamecontrolapi.infra.database.mapper.SportEntityMapper;
import com.anatartari.tatamecontrolapi.infra.database.mapper.StudentEntityMapper;
import com.anatartari.tatamecontrolapi.infra.database.repositories.jpa.JpaExperimentalClassRepository;
import org.springframework.stereotype.Repository;

@Repository
public class ExperimentalClassRepositoryImpl implements IExperimentalClassRepository {

    private final JpaExperimentalClassRepository experimentalClassRepository;

    private final StudentEntityMapper studentEntityMapper;

    public ExperimentalClassRepositoryImpl(JpaExperimentalClassRepository experimentalClassRepository, StudentEntityMapper studentEntityMapper) {
        this.experimentalClassRepository = experimentalClassRepository;
        this.studentEntityMapper = studentEntityMapper;
    }

    @Override
    public boolean existsByStudentEmailAndSportId(String studentEmail, Long sportId) {
        return experimentalClassRepository.existsByStudentEntity_EmailIgnoreCaseAndSportEntity_Id(studentEmail, sportId);
    }

    @Override
    public ExperimentalClass create(ExperimentalClass experimentalClass) {
        ExperimentalClassEntity entity = experimentalClassRepository.save(ExperimentalClassEntity.builder()
                .sportEntity(SportEntityMapper.INSTANCE.toSportEntity(experimentalClass.getSport()))
                .studentEntity(studentEntityMapper.toEntity(experimentalClass.getStudent()))
                .build());

        experimentalClass.setId(entity.getId());
        return experimentalClass;
    }
}
