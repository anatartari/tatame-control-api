package com.anatartari.tatamecontrolapi.core.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Registration {
    private Long id;

    private Student student;

    private Sport sport;

    private StatusRegistrationEnum status;
}
