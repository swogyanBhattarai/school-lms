package com.justdeepfried.GyanJyotiLMS.entities.auth.service;

import com.justdeepfried.GyanJyotiLMS.entities.user.dto.UserLoginDTO;
import com.justdeepfried.GyanJyotiLMS.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Value("${app.accessKeyExpiry}")
    private Long accessKeyExpiry;

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<String> login(UserLoginDTO userLogin) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLogin.username(), userLogin.password()));

        String token = jwtService.createToken(userLogin.username(), accessKeyExpiry);

        ResponseCookie cookie = ResponseCookie.from("accessKey", token)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofMillis(accessKeyExpiry))
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("Logged in successfully!");
    }
}
