package com.anatartari.tatamecontrolapi.app.service;

import com.anatartari.tatamecontrolapi.app.exception.ExperimentalistExistException;
import com.anatartari.tatamecontrolapi.app.exception.ResurceNotFoundException;
import com.anatartari.tatamecontrolapi.app.mapper.StudentMapper;
import com.anatartari.tatamecontrolapi.core.dto.CreateExperimentalClassDTO;
import com.anatartari.tatamecontrolapi.core.model.ExperimentalClass;
import com.anatartari.tatamecontrolapi.core.model.Sport;
import com.anatartari.tatamecontrolapi.core.model.Student;
import com.anatartari.tatamecontrolapi.core.persistence.IExperimentalClassRepository;
import com.anatartari.tatamecontrolapi.core.persistence.ISportRepository;
import com.anatartari.tatamecontrolapi.core.persistence.IStudentRepository;
import com.anatartari.tatamecontrolapi.core.usecases.ExperimentalClassUseCase;
import org.springframework.stereotype.Service;

@Service
public class ExperimentalClassService implements ExperimentalClassUseCase {

    private final ISportRepository sportRepository;

    private final IExperimentalClassRepository experimentalClassRepository;

    private final IStudentRepository studentRepository;

    public ExperimentalClassService(ISportRepository sportRepository, IExperimentalClassRepository experimentalClassRepository, IStudentRepository studentRepository) {
        this.sportRepository = sportRepository;
        this.experimentalClassRepository = experimentalClassRepository;
        this.studentRepository = studentRepository;
    }


    public ExperimentalClass create(CreateExperimentalClassDTO request) {

        Sport sport = sportRepository.findById(request.sportId())
                .orElseThrow(() -> new ResurceNotFoundException(Sport.class.getName(), request.sportId()));

        if(experimentalClassRepository.existsByStudentEmailAndSportId(request.email(), request.sportId())){
            throw new ExperimentalistExistException(request.email(), request.sportId());
        }

        Student student = studentRepository.create(StudentMapper.INSTANCE.createExperimentalToStudent(request));

        ExperimentalClass experimentalClass = ExperimentalClass.builder()
                .sport(sport)
                .student(student)
                .build();

        return experimentalClassRepository.create(experimentalClass);

    }


}
