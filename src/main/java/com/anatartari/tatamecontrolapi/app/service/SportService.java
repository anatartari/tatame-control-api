package com.anatartari.tatamecontrolapi.app.service;

import com.anatartari.tatamecontrolapi.app.exception.SportExistByFrequencyException;
import com.anatartari.tatamecontrolapi.core.dto.CreateSportDTO;
import com.anatartari.tatamecontrolapi.core.model.DayOfWeekEnum;
import com.anatartari.tatamecontrolapi.core.model.Sport;
import com.anatartari.tatamecontrolapi.core.persistence.ISportRepository;
import com.anatartari.tatamecontrolapi.core.usecases.SportUseCase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class SportService implements SportUseCase {
    private final ISportRepository sportRepository;

    @Autowired
    public SportService(ISportRepository sportRepository) {
        this.sportRepository = sportRepository;
    }

    @Override
    public Sport create(CreateSportDTO request) {

        validateRequest(request);

        return sportRepository.save(request);
    }

    private void validateRequest(CreateSportDTO request) {

        if(sportRepository.existsByFrequency(request.dayOfWeek().stream()
                .map(DayOfWeekEnum::getValue).collect(Collectors.toList()), request.startTime(), request.endTime())) {
            throw new SportExistByFrequencyException();
        }
    }
}
