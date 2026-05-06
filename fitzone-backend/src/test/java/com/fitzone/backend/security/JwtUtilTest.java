package com.fitzone.backend.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {
    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(jwtUtil, "secretString", "claveSecretaParaPruebas123456789012345678901234");
        jwtUtil.init();
    }

    @Test
    void generarYValidarTokenUserId() {
        Long userId = 1L;
        String token = jwtUtil.generateToken(userId);

        assertNotNull(token);
        assertTrue(jwtUtil.isTokenValid(token));
        assertEquals(userId, jwtUtil.extractUserId(token));
    }
}
