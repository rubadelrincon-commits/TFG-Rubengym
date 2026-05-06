package com.fitzone.backend;

import com.fitzone.backend.entity.Rol;
import com.fitzone.backend.entity.Usuario;
import com.fitzone.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Inicializa usuarios de prueba al arrancar la aplicación.
 * Solo crea los usuarios si no existen ya en la base de datos.
 *
 * USUARIOS CREADOS:
 * ─────────────────────────────────────────────────
 *  ADMINISTRADORES:
 *    admin@rubengym.com        contraseña: Admin1234!
 *    superadmin@rubengym.com   contraseña: Admin1234!
 *
 *  CLIENTES:
 *    cliente@rubengym.com      contraseña: Cliente1234!
 *    usuario@rubengym.com      contraseña: Cliente1234!
 * ─────────────────────────────────────────────────
 */
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        crearUsuarioSiNoExiste("Ruben Admin",      "admin@rubengym.com",       "Admin1234!",    Rol.ROLE_ADMIN);
        crearUsuarioSiNoExiste("Super Admin",      "superadmin@rubengym.com",  "Admin1234!",    Rol.ROLE_ADMIN);
        crearUsuarioSiNoExiste("Cliente Ejemplo",  "cliente@rubengym.com",     "Cliente1234!",  Rol.ROLE_CLIENTE);
        crearUsuarioSiNoExiste("Usuario Normal",   "usuario@rubengym.com",     "Cliente1234!",  Rol.ROLE_CLIENTE);
    }

    private void crearUsuarioSiNoExiste(String nombre, String email, String contrasena, Rol rol) {
        if (!usuarioRepository.existsByEmail(email)) {
            Usuario u = new Usuario();
            u.setNombre(nombre);
            u.setEmail(email);
            u.setContrasena(passwordEncoder.encode(contrasena));
            u.setRol(rol);
            usuarioRepository.save(u);
            System.out.println("[DataInitializer] Usuario creado: " + email + " (" + rol + ")");
        }
    }
}
