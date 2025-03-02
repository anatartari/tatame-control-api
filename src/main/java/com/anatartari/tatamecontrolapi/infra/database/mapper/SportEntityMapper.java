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

@Mapper
public interface SportEntityMapper {

    SportEntityMapper INSTANCE = Mappers.getMapper(SportEntityMapper.class);


    @Mapping(target = "dayOfWeek", expression = "java(mapDayOfWeekEnumToString(sport.getDayOfWeek()))")
    SportEntity toSportEntity(Sport sport);

    @Mapping(target = "dayOfWeek", expression = "java(mapDayOfWeekEnumToString(sport.getDayOfWeek()))")
    SportEntity toSportEntity(CreateSportDTO sport);

    @Mapping(target = "dayOfWeek", expression = "java(mapStringToDayOfWeekEnum(sportEntity.getDayOfWeek()))")
    Sport toSport(SportEntity sportEntity);

    default String mapDayOfWeekEnumToString(List<DayOfWeekEnum> dayOfWeekEnums) {
        return dayOfWeekEnums.stream()
                .map(DayOfWeekEnum::getValue)
                .collect(Collectors.joining(","));
    }

    default List<DayOfWeekEnum> mapStringToDayOfWeekEnum(String dayOfWeek) {
        return List.of(dayOfWeek.split(",")).stream()
                .map(DayOfWeekEnum::valueOf)
                .collect(Collectors.toList());
    }
}
