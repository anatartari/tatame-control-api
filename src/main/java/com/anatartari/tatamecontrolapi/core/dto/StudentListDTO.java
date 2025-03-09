package com.anatartari.tatamecontrolapi.core.dto;

import com.anatartari.tatamecontrolapi.core.model.StatusRegistrationEnum;

import java.time.LocalDate;
import java.util.List;

public record StudentListDTO(Long id,
                             String name,
                             LocalDate birthday,
                             LocalDate registrationDate,
                             LocalDate lastPaymentDate,
                             Double totalValue,
                             List<String> sports,
                             StatusRegistrationEnum status) {


}
