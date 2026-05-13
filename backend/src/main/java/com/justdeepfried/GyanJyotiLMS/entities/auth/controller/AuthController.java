package com.justdeepfried.GyanJyotiLMS.entities.auth.controller;

import com.justdeepfried.GyanJyotiLMS.entities.user.dto.UserLoginDTO;
import com.justdeepfried.GyanJyotiLMS.entities.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid UserLoginDTO userLogin) {
        return authService.login(userLogin);
    }
}
