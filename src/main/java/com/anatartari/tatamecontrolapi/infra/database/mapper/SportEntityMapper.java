package com.anatartari.tatamecontrolapi.infra.database.mapper;

import com.anatartari.tatamecontrolapi.core.model.Sport;
import com.anatartari.tatamecontrolapi.infra.database.entity.SportEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SportEntityMapper {

    SportEntityMapper INSTANCE = Mappers.getMapper(SportEntityMapper.class);

    Sport toSport(SportEntity sportEntity);

    SportEntity toSportEntity(Sport sport);
}
