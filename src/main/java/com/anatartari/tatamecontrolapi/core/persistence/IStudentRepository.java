package com.anatartari.tatamecontrolapi.core.persistence;

import com.anatartari.tatamecontrolapi.core.model.Student;

import java.util.List;

public interface IStudentRepository {
    Student save(Student student);

    Student findByEmail(String email);

    List<Student> getListInfo();
}
