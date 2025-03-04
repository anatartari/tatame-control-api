package com.anatartari.tatamecontrolapi.core.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record AddressRegistrationDTO(
        @NotBlank(message = "Street is mandatory")
        String street,

        @NotBlank(message = "Number is mandatory")
        String number,

        String complement,

        @NotBlank(message = "Neighborhood is mandatory")
        String neighborhood,

        @NotBlank(message = "City is mandatory")
        String city,

        @NotBlank(message = "State is mandatory")
        String state,

        @Pattern(regexp = "\\d{5}-\\d{3}", message = "CEP must follow the pattern 12345-678")
        String cep
) {
}
