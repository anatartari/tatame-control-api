package com.anatartari.tatamecontrolapi.infra.database.repositories;

import com.anatartari.tatamecontrolapi.core.dto.StudentListDTO;
import com.anatartari.tatamecontrolapi.core.model.Student;
import com.anatartari.tatamecontrolapi.core.persistence.IStudentRepository;
import com.anatartari.tatamecontrolapi.infra.database.entity.StudentEntity;
import com.anatartari.tatamecontrolapi.infra.database.mapper.StudentEntityMapper;
import com.anatartari.tatamecontrolapi.infra.database.repositories.jpa.JpaAddressEntityRepository;
import com.anatartari.tatamecontrolapi.infra.database.repositories.jpa.JpaMedicalInfoRepository;
import com.anatartari.tatamecontrolapi.infra.database.repositories.jpa.JpaStudentEntityRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentRepositoryImpl implements IStudentRepository {

    private final JpaStudentEntityRepository studentEntityRepository;

    private final JpaAddressEntityRepository addressEntityRepository;

    private final JpaMedicalInfoRepository medicalInfoRepository;

    private final StudentEntityMapper studentEntityMapper;

    public StudentRepositoryImpl(JpaStudentEntityRepository studentEntityRepository, JpaAddressEntityRepository addressEntityRepository, JpaMedicalInfoRepository medicalInfoRepository, StudentEntityMapper studentEntityMapper) {
        this.studentEntityRepository = studentEntityRepository;
        this.addressEntityRepository = addressEntityRepository;
        this.medicalInfoRepository = medicalInfoRepository;
        this.studentEntityMapper = studentEntityMapper;
    }

    @Override
    public Student save(Student student) {
        StudentEntity entity = studentEntityMapper.toEntity(student);
        entity.setAddress(addressEntityRepository.save(entity.getAddress()));
        entity.setMedicalInfo(medicalInfoRepository.save(entity.getMedicalInfo()));
        return studentEntityMapper.toStudent(studentEntityRepository.save(entity));
    }

    @Override
    public Student findByEmail(String email) {
        return studentEntityMapper.toStudent(studentEntityRepository.findByEmail(email));
    }

    @Override
    public List<Student> getListInfo() {
        return studentEntityMapper.toStudent(studentEntityRepository.getAllListInfo());
    }
}
