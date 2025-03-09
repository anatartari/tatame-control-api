package com.anatartari.tatamecontrolapi.infra.database.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "student")
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    private String gender;

    @Column(nullable = false)
    private LocalDate birthday;

    @Column(columnDefinition = "boolean default false")
    private Boolean allowSocialMedia;

    private String instagram;

    private Boolean practicedMartialArts;

    private String graduatedInStyle;

    @OneToOne(fetch =  FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private AddressEntity address;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "medical_info_id", referencedColumnName = "id")
    private MedicalInfoEntity medicalInfo;
}