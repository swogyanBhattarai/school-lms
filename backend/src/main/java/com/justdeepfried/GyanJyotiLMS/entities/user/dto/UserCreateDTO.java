package com.justdeepfried.GyanJyotiLMS.entities.user.dto;

import com.justdeepfried.GyanJyotiLMS.enums.USER_ROLES;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public record UserCreateDTO (

        @NotBlank(message = "Username is required!")
        @Size(min = 3, max = 20, message = "Username cannot be less than 3 and more than 20 letters!")
        String username,

        @NotBlank(message = "Password is required!")
        @Size(min = 8, max = 25, message = "Password cannot be less than 8 and more than 25 letters!")
        String password,

        USER_ROLES role
) {
}
