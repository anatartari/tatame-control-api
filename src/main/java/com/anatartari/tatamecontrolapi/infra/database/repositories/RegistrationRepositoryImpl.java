package com.anatartari.tatamecontrolapi.infra.database.repositories;

import com.anatartari.tatamecontrolapi.core.model.Registration;
import com.anatartari.tatamecontrolapi.core.persistence.IRegistrationRepository;
import com.anatartari.tatamecontrolapi.infra.database.mapper.RegistrationEntityMapper;
import com.anatartari.tatamecontrolapi.infra.database.repositories.jpa.JpaRegistrationRepository;
import org.springframework.stereotype.Repository;

@Repository
public class RegistrationRepositoryImpl implements IRegistrationRepository {
    private final JpaRegistrationRepository jpaRegistrationRepository;
    private final RegistrationEntityMapper registrationEntityMapper;

    public RegistrationRepositoryImpl(JpaRegistrationRepository jpaRegistrationRepository, RegistrationEntityMapper registrationEntityMapper) {
        this.jpaRegistrationRepository = jpaRegistrationRepository;
        this.registrationEntityMapper = registrationEntityMapper;
    }


    @Override
    public Registration create(Registration request) {
        return registrationEntityMapper.toRegistration(
                jpaRegistrationRepository.save(registrationEntityMapper.toEntity(request))
        );
    }

    @Override
    public boolean existByStudentIdAndSportId(Long studentId, Long sportId) {
        return jpaRegistrationRepository.existsByStudent_IdAndSport_Id(studentId, sportId);
    }
}
