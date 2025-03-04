package com.anatartari.tatamecontrolapi.core.persistence;

import com.anatartari.tatamecontrolapi.core.model.Registration;

public interface IRegistrationRepository {
    Registration create(Registration request);

    boolean existByStudentIdAndSportId(Long studentId, Long sportId);
}
