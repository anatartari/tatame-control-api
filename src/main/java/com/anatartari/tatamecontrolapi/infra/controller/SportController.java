package com.anatartari.tatamecontrolapi.infra.controller;

import com.anatartari.tatamecontrolapi.core.dto.CreateSportDTO;
import com.anatartari.tatamecontrolapi.core.usecases.SportUseCase;
import com.anatartari.tatamecontrolapi.infra.controller.mapper.SportControllerMapper;
import com.anatartari.tatamecontrolapi.infra.controller.responses.CreateSportResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sport")
public class SportController {

    private final SportUseCase sportUseCase;

    @Autowired
    public SportController(SportUseCase sportUseCase) {
        this.sportUseCase = sportUseCase;
    }

    @PostMapping("/create")
    public ResponseEntity<CreateSportResponse> create(@RequestBody CreateSportDTO createSportDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(SportControllerMapper.INSTANCE
                        .toCreateResponse(sportUseCase.create(createSportDTO)));
    }
}
