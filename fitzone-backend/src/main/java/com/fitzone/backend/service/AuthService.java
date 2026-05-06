package com.fitzone.backend.service;

import com.fitzone.backend.dto.RegistroRequest;
import com.fitzone.backend.dto.LoginRequest;
import com.fitzone.backend.dto.CreateUserRequest;
import com.fitzone.backend.entity.Rol;
import com.fitzone.backend.entity.Usuario;
import com.fitzone.backend.repository.UsuarioRepository;
import com.fitzone.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Transactional
    public void registrarUsuario(RegistroRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setContrasena(passwordEncoder.encode(request.getContrasena()));
        usuario.setRol(Rol.ROLE_CLIENTE);
        usuarioRepository.save(usuario);
    }

    @Transactional
    public String loginUsuario(LoginRequest request) {
        try {
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                throw new RuntimeException("El email es requerido");
            }
            if (request.getContrasena() == null || request.getContrasena().trim().isEmpty()) {
                throw new RuntimeException("La contraseña es requerida");
            }

            Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            if (!passwordEncoder.matches(request.getContrasena(), usuario.getContrasena())) {
                throw new RuntimeException("Contraseña incorrecta");
            }

            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getContrasena())
            );

            return jwtUtil.generateToken((long) usuario.getId());
        } catch (AuthenticationException e) {
            throw new RuntimeException("Credenciales erróneas");
        }
    }

    @Transactional
    public void logout(String token) {
        SecurityContextHolder.clearContext();
    }

    public Usuario getUsuarioById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    public List<Usuario> getAllUsers() {
        return usuarioRepository.findAll();
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con ID: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    @Transactional
    public Usuario createUser(CreateUserRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setContrasena(passwordEncoder.encode(request.getContrasena()));
        usuario.setRol(Rol.valueOf(request.getRol()));
        // FIX: solo un save (antes había double save)
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public Usuario updateUser(Long id, Usuario userData) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));

        if (userData.getNombre() != null) {
            usuario.setNombre(userData.getNombre());
        }
        if (userData.getEmail() != null) {
            usuario.setEmail(userData.getEmail());
        }
        if (userData.getContrasena() != null && !userData.getContrasena().isEmpty()) {
            usuario.setContrasena(passwordEncoder.encode(userData.getContrasena()));
        }
        return usuarioRepository.save(usuario);
    }

    @Transactional
    public void changePassword(Long userId, String currentPassword, String newPassword) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

        if (!passwordEncoder.matches(currentPassword, usuario.getContrasena())) {
            throw new RuntimeException("La contraseña actual es incorrecta");
        }
        usuario.setContrasena(passwordEncoder.encode(newPassword));
        usuarioRepository.save(usuario);
    }

    @Transactional
    public void adminChangePassword(Long userId, String newPassword) {
        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + userId));

        usuario.setContrasena(passwordEncoder.encode(newPassword));
        usuarioRepository.save(usuario);
    }
}
