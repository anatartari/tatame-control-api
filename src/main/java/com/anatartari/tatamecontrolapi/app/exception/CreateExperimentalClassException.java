package com.anatartari.tatamecontrolapi.app.exception;

public class CreateExperimentalClassException extends RuntimeException {
    public CreateExperimentalClassException(String message) {
        super("Create Experimental Class ERROR: " + message);
    }
}
