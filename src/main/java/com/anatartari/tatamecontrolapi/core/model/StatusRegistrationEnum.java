package com.anatartari.tatamecontrolapi.core.model;

public enum StatusRegistrationEnum {
    ACTIVE("ACTIVE"),
    INACTIVE("INACTIVE"),
    PENDING("PENDING"),
    EXPERIMENTAL("EXPERIMENTAL");

    private String value;

    StatusRegistrationEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
