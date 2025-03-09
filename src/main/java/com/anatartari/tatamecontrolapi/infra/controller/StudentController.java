package com.anatartari.tatamecontrolapi.infra.controller;

import com.anatartari.tatamecontrolapi.core.dto.StudentListDTO;
import com.anatartari.tatamecontrolapi.core.usecases.StudentUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentUseCase studentUseCase;

    public StudentController(StudentUseCase studentUseCase) {
        this.studentUseCase = studentUseCase;
    }

    public ResponseEntity<List<StudentListDTO>> list() {
        return ResponseEntity.ok(studentUseCase.list());
    }
}
