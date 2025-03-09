package com.anatartari.tatamecontrolapi.core.usecases;

import com.anatartari.tatamecontrolapi.core.dto.StudentListDTO;

import java.util.List;

public interface StudentUseCase {

    List<StudentListDTO> list();
}
