package com.anatartari.tatamecontrolapi.core.persistence;

import com.anatartari.tatamecontrolapi.core.model.Student;

public interface IStudentRepository {
    Student create(Student student);
}
