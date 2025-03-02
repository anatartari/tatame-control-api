package com.anatartari.tatamecontrolapi.app.exception;

public class SportExistByFrequencyException extends RuntimeException {
    public SportExistByFrequencyException() {
        super("Sport already exists with the same frequency");
    }
}
