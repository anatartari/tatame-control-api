package com.anatartari.tatamecontrolapi.core.persistence;

import com.anatartari.tatamecontrolapi.core.model.ExperimentalClass;

public interface IExperimentalClassRepository {

    boolean existsByStudentEmailAndSportId(String studentEmail, Long sportId);

    ExperimentalClass create(ExperimentalClass experimentalClass);
}
