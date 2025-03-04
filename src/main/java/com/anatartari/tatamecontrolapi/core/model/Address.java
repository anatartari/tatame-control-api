package com.anatartari.tatamecontrolapi.core.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class Address {
    Long id;
    String street;
    String neighborhood;
    String cep;
    String city;
    String state;
    String number;
    String complement;
}