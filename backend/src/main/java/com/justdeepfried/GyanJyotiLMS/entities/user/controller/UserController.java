package com.justdeepfried.GyanJyotiLMS.entities.user.controller;

import com.justdeepfried.GyanJyotiLMS.entities.user.dto.UserCreateDTO;
import com.justdeepfried.GyanJyotiLMS.entities.user.dto.UserResponseDTO;
import com.justdeepfried.GyanJyotiLMS.entities.user.model.UserModel;
import com.justdeepfried.GyanJyotiLMS.entities.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<String> addUser(@RequestBody @Valid UserCreateDTO userCreate) {
        userService.addUser(userCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully!");
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }
}
