package com.anatartari.tatamecontrolapi.app.exception;

public class CreateSportException extends RuntimeException {
    public CreateSportException(String message) {
        super("Error creating sport: " + message);
    }
}
