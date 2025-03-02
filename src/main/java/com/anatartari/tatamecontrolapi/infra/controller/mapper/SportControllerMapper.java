package com.anatartari.tatamecontrolapi.infra.controller.mapper;

import com.anatartari.tatamecontrolapi.core.model.Sport;
import com.anatartari.tatamecontrolapi.infra.controller.responses.CreateSportResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SportControllerMapper {
    SportControllerMapper INSTANCE = Mappers.getMapper(SportControllerMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "sensei", target = "sensei")
    @Mapping(source = "price", target = "price")
    @Mapping(source = "startTime", target = "startTime")
    @Mapping(source = "endTime", target = "endTime")
    @Mapping(source = "dayOfWeek", target = "dayOfWeek")
    CreateSportResponse toCreateResponse(Sport sport);
}
