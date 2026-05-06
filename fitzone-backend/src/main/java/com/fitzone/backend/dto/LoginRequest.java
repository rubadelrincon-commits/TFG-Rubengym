package com.fitzone.backend.dto;
import com.fitzone.backend.entity.Rol;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String contrasena;
    private Rol rol;



}