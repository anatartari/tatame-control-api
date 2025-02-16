package com.anatartari.tatamecontrolapi.core.persistence;

import com.anatartari.tatamecontrolapi.core.model.Sport;

import java.util.Optional;

public interface ISportRepository {

    Optional<Sport> findById(Long id);
}
