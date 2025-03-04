package com.anatartari.tatamecontrolapi.infra.database.repositories.jpa;

import com.anatartari.tatamecontrolapi.infra.database.entity.AddressEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaAddressEntityRepository extends JpaRepository<AddressEntity, Long> {
}
