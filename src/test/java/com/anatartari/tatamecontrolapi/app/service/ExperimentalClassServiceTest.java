package com.anatartari.tatamecontrolapi.app.service;

import com.anatartari.tatamecontrolapi.app.exception.ExperimentalistExistException;
import com.anatartari.tatamecontrolapi.app.exception.ResurceNotFoundException;
import com.anatartari.tatamecontrolapi.core.dto.CreateExperimentalClassDTO;
import com.anatartari.tatamecontrolapi.core.model.ExperimentalClass;
import com.anatartari.tatamecontrolapi.core.model.Sport;
import com.anatartari.tatamecontrolapi.core.model.Student;
import com.anatartari.tatamecontrolapi.core.persistence.IExperimentalClassRepository;
import com.anatartari.tatamecontrolapi.core.persistence.ISportRepository;
import com.anatartari.tatamecontrolapi.core.persistence.IStudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class ExperimentalClassServiceTest {
    @Mock
    private ISportRepository sportRepository;

    @Mock
    private IExperimentalClassRepository experimentalClassRepository;

    @Mock
    private IStudentRepository studentRepository;

    @InjectMocks
    private ExperimentalClassService experimentalClassService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void create_ShouldCreateExperimentalClass_WhenValidRequest() {
        CreateExperimentalClassDTO request = new CreateExperimentalClassDTO(
                "Test Student", "test@example.com", "1234567890", "Male", LocalDate.of(2000, 1, 1),
                true, "Black Belt", 1L);
        Sport sport = new Sport(1L, "Test Sport", "Weekly", null, "Sensei", 100.0);
        Student student = new Student(1L, "Test Student", "test@example.com", "1234567890", "Male",
                LocalDate.of(2000, 1, 1), true, "test_instagram", true, "Black Belt", null, null);

        when(sportRepository.findById(sport.getId())).thenReturn(Optional.of(sport));
        when(experimentalClassRepository.existsByStudentEmailAndSportId(request.email(), request.sportId())).thenReturn(false);
        when(studentRepository.create(any(Student.class))).thenReturn(student);
        when(experimentalClassRepository.create(any(ExperimentalClass.class))).thenReturn(new ExperimentalClass(1L, sport, student));

        // Act
        ExperimentalClass result = experimentalClassService.create(request);

        // Assert
        assertNotNull(result);
        assertEquals(sport, result.getSport());
        assertEquals(student, result.getStudent());
        verify(sportRepository).findById(request.sportId());
        verify(experimentalClassRepository).existsByStudentEmailAndSportId(request.email(), request.sportId());
        verify(studentRepository).create(any(Student.class));
        verify(experimentalClassRepository).create(any(ExperimentalClass.class));
    }

    @Test
    void create_ShouldThrowResurceNotFoundException_WhenSportNotFound() {
        // Arrange
        CreateExperimentalClassDTO request = new CreateExperimentalClassDTO(
                "Test Student", "test@example.com", "1234567890", "Male", LocalDate.of(2000, 1, 1),
                true, "Black Belt", 1L);

        when(sportRepository.findById(request.sportId())).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResurceNotFoundException.class, () -> experimentalClassService.create(request));
        verify(sportRepository).findById(request.sportId());
        verify(experimentalClassRepository, never()).existsByStudentEmailAndSportId(anyString(), anyLong());
        verify(studentRepository, never()).create(any(Student.class));
        verify(experimentalClassRepository, never()).create(any(ExperimentalClass.class));
    }

    @Test
    void create_ShouldThrowExperimentalistExistException_WhenExperimentalClassExists() {
        // Arrange
        CreateExperimentalClassDTO request = new CreateExperimentalClassDTO(
                "Test Student", "test@example.com", "1234567890", "Male", LocalDate.of(2000, 1, 1),
                true, "Black Belt", 1L);
        Sport sport = new Sport(1L, "Test Sport", "Weekly", null, "Sensei", 100.0);


        when(sportRepository.findById(request.sportId())).thenReturn(Optional.of(sport));
        when(experimentalClassRepository.existsByStudentEmailAndSportId(request.email(), request.sportId())).thenReturn(true);

        // Act & Assert
        assertThrows(ExperimentalistExistException.class, () -> experimentalClassService.create(request));
        verify(sportRepository).findById(request.sportId());
        verify(experimentalClassRepository).existsByStudentEmailAndSportId(request.email(), request.sportId());
        verify(studentRepository, never()).create(any(Student.class));
        verify(experimentalClassRepository, never()).create(any(ExperimentalClass.class));
    }
}
