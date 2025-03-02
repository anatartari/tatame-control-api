package com.anatartari.tatamecontrolapi.app.service;

import com.anatartari.tatamecontrolapi.app.exception.CreateSportException;
import com.anatartari.tatamecontrolapi.core.dto.CreateSportDTO;
import com.anatartari.tatamecontrolapi.core.model.Sport;
import com.anatartari.tatamecontrolapi.core.persistence.ISportRepository;
import com.anatartari.tatamecontrolapi.core.usecases.SportUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SportService implements SportUseCase {
    private final ISportRepository sportRepository;

    @Autowired
    public SportService(ISportRepository sportRepository) {
        this.sportRepository = sportRepository;
    }

    @Override
    public Sport create(CreateSportDTO request) {

        try {
            return sportRepository.save(request);

        }catch (Exception e){
            throw new CreateSportException(e.getMessage());
        }
    }

}
