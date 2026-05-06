package com.fitzone.backend.controller;

import com.fitzone.backend.dto.LoginRequest;
import com.fitzone.backend.dto.RegistroRequest;
import com.fitzone.backend.security.JwtUtil;
import com.fitzone.backend.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthControllerTest {
    private AuthController authController;

    @Mock private AuthService authService;
    @Mock private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        authController = new AuthController(authService, jwtUtil);
    }

    @Test
    void registroExitoso() {
        RegistroRequest request = new RegistroRequest();
        request.setEmail("test@example.com");
        request.setNombre("Test User");
        request.setContrasena("password123");

        doNothing().when(authService).registrarUsuario(any(RegistroRequest.class));

        ResponseEntity<String> response = authController.register(request);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("Usuario registrado exitosamente", response.getBody());
    }

    @Test
    void loginExitoso() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setContrasena("password123");

        when(authService.loginUsuario(any(LoginRequest.class))).thenReturn("token123");

        ResponseEntity<Map<String, String>> response = authController.login(request);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("token123", response.getBody().get("token"));
        assertEquals("Login exitoso", response.getBody().get("message"));
    }
}
