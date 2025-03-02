package com.anatartari.tatamecontrolapi.core.model;

public enum DayOfWeekEnum {
    MON("MON"),
    TUE("TUE"),
    WED("WED"),
    THU("THU"),
    FRI("FRI"),
    SAT("SAT"),
    SUN("SUN");

    private final String value;

    DayOfWeekEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
