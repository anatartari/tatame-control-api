package com.anatartari.tatamecontrolapi.infra.controller;

import com.anatartari.tatamecontrolapi.core.dto.CreateSportDTO;
import com.anatartari.tatamecontrolapi.core.usecases.SportUseCase;
import com.anatartari.tatamecontrolapi.infra.controller.mapper.SportControllerMapper;
import com.anatartari.tatamecontrolapi.infra.controller.responses.CreateSportResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sport")
public class SportController {

    private final SportUseCase sportUseCase;
    private final SportControllerMapper sportControllerMapper;

    public SportController(SportUseCase sportUseCase, SportControllerMapper sportControllerMapper) {
        this.sportUseCase = sportUseCase;
        this.sportControllerMapper = sportControllerMapper;
    }

    @PostMapping("/create")
    public ResponseEntity<CreateSportResponse> create(@RequestBody @Valid CreateSportDTO createSportDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(sportControllerMapper
                        .toCreateResponse(sportUseCase.create(createSportDTO)));
    }
}
