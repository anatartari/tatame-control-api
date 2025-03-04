package com.anatartari.tatamecontrolapi.core.model;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Registration {
    private Long id;

    private Student student;

    private Sport sport;

    private StatusRegistrationEnum status;
}
