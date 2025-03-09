package com.anatartari.tatamecontrolapi.infra.controller;

import com.anatartari.tatamecontrolapi.core.dto.CreateSportDTO;
import com.anatartari.tatamecontrolapi.core.usecases.SportUseCase;
import com.anatartari.tatamecontrolapi.infra.controller.mapper.SportControllerMapper;
import com.anatartari.tatamecontrolapi.infra.controller.responses.CreateSportResponse;
import com.anatartari.tatamecontrolapi.infra.controller.responses.SportListingResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/list")
    public ResponseEntity<List<SportListingResponse>> list() {
        return ResponseEntity.ok(sportControllerMapper.toListResponse(sportUseCase.list()));
    }
}
