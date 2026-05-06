-- ============================================================
-- BASE DE DATOS: rubengym
-- Proyecto: FitZone / RubenGym
-- ============================================================
-- INSTRUCCIONES:
--   1. Abre phpMyAdmin (http://localhost/phpmyadmin)
--   2. Elimina la base de datos "fitzone" si existe
--   3. Crea una nueva base de datos llamada "rubengym"
--   4. Importa este archivo SQL
--   5. Arranca el backend Spring Boot (mvnw spring-boot:run)
--      Los usuarios de prueba se crearán automáticamente al arrancar
-- ============================================================

CREATE DATABASE IF NOT EXISTS `rubengym`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE `rubengym`;

-- Eliminar tabla si existe (para importación limpia)
DROP TABLE IF EXISTS `usuarios`;

-- Crear tabla de usuarios
CREATE TABLE `usuarios` (
  `id`              INT NOT NULL AUTO_INCREMENT,
  `nombre`          VARCHAR(255) NOT NULL,
  `email`           VARCHAR(255) NOT NULL,
  `contrasena`      VARCHAR(255) NOT NULL,
  `telefono`        VARCHAR(15) DEFAULT NULL,
  `rol`             ENUM('ROLE_ADMIN','ROLE_CLIENTE') NOT NULL,
  `fecha_registro`  TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ============================================================
-- USUARIOS DE PRUEBA
-- Los usuarios se crean automáticamente al arrancar el backend
-- mediante DataInitializer.java con las siguientes credenciales:
--
--  ADMINISTRADORES:
--    Email: admin@rubengym.com       Contraseña: Admin1234!
--    Email: superadmin@rubengym.com  Contraseña: Admin1234!
--
--  CLIENTES:
--    Email: cliente@rubengym.com     Contraseña: Cliente1234!
--    Email: usuario@rubengym.com     Contraseña: Cliente1234!
-- ============================================================
