package com.anatartari.tatamecontrolapi.infra.controller;

import com.anatartari.tatamecontrolapi.core.dto.CreateExperimentalClassDTO;
import com.anatartari.tatamecontrolapi.core.usecases.ExperimentalClassUseCase;
import com.anatartari.tatamecontrolapi.infra.controller.mapper.ExperimentalClassControllerMapper;
import com.anatartari.tatamecontrolapi.infra.controller.responses.CreateExperimentalClassResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/experimental-class")
public class ExperimentalClassController {

    private final ExperimentalClassUseCase experimentalClassUseCase;

    public ExperimentalClassController(ExperimentalClassUseCase experimentalClassUseCase) {
        this.experimentalClassUseCase = experimentalClassUseCase;
    }

    @PostMapping("/create")
    public ResponseEntity<CreateExperimentalClassResponse> create(@RequestBody CreateExperimentalClassDTO createExperimentalClassDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ExperimentalClassControllerMapper.INSTANCE
                        .createExperimentalClassResponse(experimentalClassUseCase.create(createExperimentalClassDTO)));
    }
}
