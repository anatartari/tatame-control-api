package com.anatartari.tatamecontrolapi.core.model;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@Builder
@Data
public class Student {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String gender;
    private LocalDate birthday;
    private Boolean allowSocialMedia;
    private String instagram;
    private Boolean practicedMartialArts;
    private String graduatedInStyle;
    private Address address;
    private MedicalInfo medicalInfo;
}