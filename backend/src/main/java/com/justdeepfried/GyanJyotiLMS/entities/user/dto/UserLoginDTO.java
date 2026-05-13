package com.justdeepfried.GyanJyotiLMS.entities.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserLoginDTO(
        @NotNull
        @NotBlank(message = "Username is required!")
        @Size(min = 3, max = 20, message = "Username cannot be less than 3 and more than 20 letters!")
        String username,

        @NotNull
        @NotBlank(message = "Password is required!")
        @Size(min = 8, max = 25, message = "Password cannot be less than 8 and more than 25 letters!")
        String password
) {
}
