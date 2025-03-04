package com.anatartari.tatamecontrolapi.app.service;

import com.anatartari.tatamecontrolapi.app.exception.CreateRegistrationException;
import com.anatartari.tatamecontrolapi.app.exception.ResurceNotFoundException;
import com.anatartari.tatamecontrolapi.app.mapper.StudentMapper;
import com.anatartari.tatamecontrolapi.core.dto.CreateRegistrationDTO;
import com.anatartari.tatamecontrolapi.core.model.Registration;
import com.anatartari.tatamecontrolapi.core.model.Sport;
import com.anatartari.tatamecontrolapi.core.model.StatusRegistrationEnum;
import com.anatartari.tatamecontrolapi.core.model.Student;
import com.anatartari.tatamecontrolapi.core.persistence.IRegistrationRepository;
import com.anatartari.tatamecontrolapi.core.persistence.IStudentRepository;
import com.anatartari.tatamecontrolapi.core.usecases.RegistrationUseCase;
import com.anatartari.tatamecontrolapi.infra.database.repositories.SportRepositoryImpl;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService implements RegistrationUseCase {

    private final IRegistrationRepository registrationRepository;

    private final IStudentRepository studentRepository;

    private final SportRepositoryImpl sportRepository;

    private final StudentMapper studentMapper;

    public RegistrationService(IRegistrationRepository registrationRepository, IStudentRepository studentRepository, StudentMapper studentMapper, SportRepositoryImpl sportRepositoryImpl) {
        this.registrationRepository = registrationRepository;
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
        this.sportRepository = sportRepositoryImpl;
    }

    @Override
    public Registration create(CreateRegistrationDTO request) {

        Sport sport = sportRepository.findById(request.sportId())
                .orElseThrow(() -> new ResurceNotFoundException(Sport.class.getName(), request.sportId()));

        Student student =  studentMapper.createRegistrationToStudent(request);

        try{
            Student exStudent = studentRepository.findByEmail(request.student().email());

            if(exStudent != null){
                if(registrationRepository.existByStudentIdAndSportId(exStudent.getId(), sport.getId())){
                    throw new CreateRegistrationException("Student already registered in this sport");
                }

                student.setId(exStudent.getId());
            }
            student = studentRepository.save(student);

            Registration registration = Registration.builder()
                    .sport(sport)
                    .student(student)
                    .status(StatusRegistrationEnum.PENDING)
                    .build();

            registration = registrationRepository.create(registration);

            return registration;
        }catch(Exception e){
            throw new CreateRegistrationException(e);
        }

    }
}
