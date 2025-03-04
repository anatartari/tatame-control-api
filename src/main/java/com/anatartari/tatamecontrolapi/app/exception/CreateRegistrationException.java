package com.anatartari.tatamecontrolapi.app.exception;

public class CreateRegistrationException extends RuntimeException {
    public CreateRegistrationException(Exception e) {
        super("Create Registration ERROR: " + e.getMessage());
    }

    public CreateRegistrationException(String message) {
        super(message);
    }
}
