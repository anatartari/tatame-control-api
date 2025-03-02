package com.anatartari.tatamecontrolapi.infra.database.mapper;

import com.anatartari.tatamecontrolapi.core.dto.CreateSportDTO;
import com.anatartari.tatamecontrolapi.core.model.DayOfWeekEnum;
import com.anatartari.tatamecontrolapi.core.model.Sport;
import com.anatartari.tatamecontrolapi.infra.database.entity.SportEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface SportEntityMapper {

    SportEntityMapper INSTANCE = Mappers.getMapper(SportEntityMapper.class);

    SportEntity toSportEntity(Sport sport);

    @Mapping(target = "dayOfWeek", expression = "java(mapDayOfWeekEnumToString(sport.dayOfWeek()))")
    SportEntity toSportEntity(CreateSportDTO sport);

    Sport toSport(SportEntity sportEntity);

    default String mapDayOfWeekEnumToString(List<DayOfWeekEnum> dayOfWeekEnums) {
        return dayOfWeekEnums.stream()
                .map(DayOfWeekEnum::getValue)
                .collect(Collectors.joining(","));
    }

}
