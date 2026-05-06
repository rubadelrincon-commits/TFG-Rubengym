package com.fitzone.backend.service;

import com.fitzone.backend.dto.LoginRequest;
import com.fitzone.backend.dto.RegistroRequest;
import com.fitzone.backend.entity.Rol;
import com.fitzone.backend.entity.Usuario;
import com.fitzone.backend.repository.UsuarioRepository;
import com.fitzone.backend.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthServiceTest {
    private AuthService authService;

    @Mock private UsuarioRepository usuarioRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private AuthenticationManager authenticationManager;
    @Mock private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        authService = new AuthService(usuarioRepository, passwordEncoder, authenticationManager, jwtUtil);
    }

    @Test
    void registroUsuarioExitoso() {
        RegistroRequest request = new RegistroRequest();
        request.setEmail("nuevo@example.com");
        request.setNombre("Nuevo Usuario");
        request.setContrasena("password123");

        when(usuarioRepository.existsByEmail(anyString())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        assertDoesNotThrow(() -> authService.registrarUsuario(request));
        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    void loginUsuarioExitoso() {
        LoginRequest request = new LoginRequest();
        request.setEmail("test@example.com");
        request.setContrasena("password123");

        Usuario usuario = new Usuario();
        usuario.setEmail("test@example.com");
        usuario.setContrasena("encodedPassword");
        usuario.setRol(Rol.ROLE_CLIENTE);

        when(usuarioRepository.findByEmail(anyString())).thenReturn(Optional.of(usuario));
        when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);
        when(jwtUtil.generateToken(anyLong())).thenReturn("token123");

        String token = assertDoesNotThrow(() -> authService.loginUsuario(request));
        assertNotNull(token);
    }
}
