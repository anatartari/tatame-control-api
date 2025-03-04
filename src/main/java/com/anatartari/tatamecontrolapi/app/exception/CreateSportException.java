package com.anatartari.tatamecontrolapi.app.exception;

public class CreateSportException extends RuntimeException {
    public CreateSportException(String message) {
        super("Create Sport ERROR: " + message);
    }
}
