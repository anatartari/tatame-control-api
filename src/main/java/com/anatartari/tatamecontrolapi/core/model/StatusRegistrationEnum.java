package com.anatartari.tatamecontrolapi.core.model;

public enum StatusRegistrationEnum {
    ACTIVE("ACTIVE"),
    INACTIVE("INACTIVE"),
    EXPERIMENTAL("EXPERIMENTAL");

    private String value;

    StatusRegistrationEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
