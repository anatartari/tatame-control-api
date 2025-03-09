package com.anatartari.tatamecontrolapi.app.service;

import com.anatartari.tatamecontrolapi.core.dto.StudentListDTO;
import com.anatartari.tatamecontrolapi.core.model.Student;
import com.anatartari.tatamecontrolapi.core.persistence.IRegistrationRepository;
import com.anatartari.tatamecontrolapi.core.persistence.IStudentRepository;
import com.anatartari.tatamecontrolapi.core.usecases.StudentUseCase;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService implements StudentUseCase {

    private final IStudentRepository studentRepository;

    private final IRegistrationRepository registrationRepository;

    public StudentService(IStudentRepository studentRepository, IRegistrationRepository registrationRepository) {
        this.studentRepository = studentRepository;
        this.registrationRepository = registrationRepository;
    }

    @Override
    public List<StudentListDTO> list() {
        List<StudentListDTO> result = new ArrayList<>();
        List<Student> studentInfo = studentRepository.getListInfo();

        for (Student student : studentInfo) {
            //todo: fazer listagem e pegar informações do pagamento, tb necessario add a data de matricula no studante
        }

        return result;
    }

}
