package com.anatartari.tatamecontrolapi.infra.controller;

import com.anatartari.tatamecontrolapi.core.dto.CreateRegistrationDTO;
import com.anatartari.tatamecontrolapi.core.model.Registration;
import com.anatartari.tatamecontrolapi.core.usecases.RegistrationUseCase;
import com.anatartari.tatamecontrolapi.infra.controller.mapper.RegistrationControllerMapper;
import com.anatartari.tatamecontrolapi.infra.controller.responses.RegistrationResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/registration")
public class RegistrationController {

    private final RegistrationControllerMapper registrationControllerMapper;
    private final RegistrationUseCase registrationUseCase;

    public RegistrationController(RegistrationControllerMapper registrationControllerMapper, RegistrationUseCase registrationUseCase) {
        this.registrationControllerMapper = registrationControllerMapper;
        this.registrationUseCase = registrationUseCase;
    }

    public ResponseEntity<RegistrationResponse> create(@RequestBody @Valid CreateRegistrationDTO request){
        Registration response = registrationUseCase.create(request);
        return ResponseEntity.ok(registrationControllerMapper.toResponse(response));
    }
}
