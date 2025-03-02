package com.anatartari.tatamecontrolapi.core.model;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public enum DayOfWeekEnum {
    MON("MON", 1),
    TUE("TUE", 2),
    WED("WED", 3),
    THU("THU",4),
    FRI("FRI", 5),
    SAT("SAT", 6),
    SUN("SUN", 7);

    private final String value;
    private final int order;

    DayOfWeekEnum(String value, int order) {
        this.value = value;
        this.order = order;
    }

    public static String getStringByOrder(List<DayOfWeekEnum> days){
        return days.stream()
                .sorted(Comparator.comparingInt(day -> day.order))
                .map(DayOfWeekEnum::getValue)
                .collect(Collectors.joining(","));
    }

    public String getValue() {
        return value;
    }

}
