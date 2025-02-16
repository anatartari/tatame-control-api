package com.anatartari.tatamecontrolapi.app.exception;

public class ExperimentalistExistException extends RuntimeException {
    public ExperimentalistExistException(String email, Long sportId) {
        super("Student with email: " + email + " already registered in sport with id: " + sportId);
    }
}
