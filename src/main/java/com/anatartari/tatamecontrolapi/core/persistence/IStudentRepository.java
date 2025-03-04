package com.anatartari.tatamecontrolapi.core.persistence;

import com.anatartari.tatamecontrolapi.core.model.Student;

public interface IStudentRepository {
    Student save(Student student);

    Student findByEmail(String email);
}
