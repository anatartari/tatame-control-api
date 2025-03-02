package com.anatartari.tatamecontrolapi.app.exception;

public class ExperimentalClassExistException extends RuntimeException {
    public ExperimentalClassExistException(String email, Long sportId) {
        super("Student with email: " + email + " already registered in sport with id: " + sportId);
    }
}
