# FitZone / RubenGym - Guía de Configuración

## Cambios realizados

### Base de datos
- Conectado a la base de datos **`rubengym`** en XAMPP (puerto 3306)
- Usuario MySQL: `root` / Sin contraseña (configuración por defecto de XAMPP)

### Bugs corregidos
1. **Register**: El frontend esperaba texto pero el backend devolvía JSON — corregido
2. **createUser**: Se guardaba el usuario dos veces en la BD — corregido  
3. **SecurityConfig**: El orden de las reglas de seguridad era incorrecto — corregido
4. **RegisterComponent**: El manejo de errores fallaba con el nuevo formato — corregido

---

## Pasos para poner en marcha el proyecto

### 1. Preparar la base de datos en XAMPP

1. Inicia **Apache** y **MySQL** en XAMPP
2. Abre **phpMyAdmin** → http://localhost/phpmyadmin
3. Si existe la base de datos `fitzone`, puedes eliminarla
4. Crea una nueva base de datos llamada **`rubengym`**
5. Importa el archivo `bbdd/rubengym.sql`

### 2. Arrancar el Backend (Spring Boot)

```bash
cd fitzone-backend
./mvnw spring-boot:run
```

Al arrancar, se crearán automáticamente los usuarios de prueba:

| Rol | Email | Contraseña |
|-----|-------|------------|
| **ADMIN** | admin@rubengym.com | Admin1234! |
| **ADMIN** | superadmin@rubengym.com | Admin1234! |
| **CLIENTE** | cliente@rubengym.com | Cliente1234! |
| **CLIENTE** | usuario@rubengym.com | Cliente1234! |

El backend corre en: **http://localhost:8080**

### 3. Arrancar el Frontend (Angular)

```bash
cd FitZone
npm install
ng serve
```

El frontend corre en: **http://localhost:4200**

---

## Estructura del proyecto

```
FitZone-feature-FitZone/
├── bbdd/
│   ├── bbdd.sql          (SQL original - base de datos 'fitzone')
│   └── rubengym.sql      (SQL nuevo - base de datos 'rubengym') ← USAR ESTE
├── FitZone/              (Frontend Angular 19)
│   └── src/app/
│       ├── components/   (login, register, admin, home, etc.)
│       ├── services/     (auth.service.ts)
│       └── guards/       (auth.guard.ts, admin.guard.ts)
└── fitzone-backend/      (Backend Spring Boot + JWT)
    └── src/main/
        ├── java/com/fitzone/backend/
        │   ├── controller/AuthController.java
        │   ├── service/AuthService.java
        │   ├── security/SecurityConfig.java
        │   └── DataInitializer.java  ← NUEVO (crea usuarios de prueba)
        └── resources/application.properties  ← MODIFICADO (rubengym)
```
