package com.anatartari.tatamecontrolapi.app.exception;

public class ResurceNotFoundException extends RuntimeException {
    public ResurceNotFoundException(String className, Long entityId) {
        super(className + " not found with id: " + entityId);
    }
}
