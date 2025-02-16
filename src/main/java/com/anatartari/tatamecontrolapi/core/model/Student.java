package com.anatartari.tatamecontrolapi.core.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@Builder
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
    private MedicalInfo medicalInfoEntity;
}