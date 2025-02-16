package com.anatartari.tatamecontrolapi.core.model;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExperimentalClass {
    private Long id;
    private Sport sport;
    private Student student;
}
