package com.justdeepfried.GyanJyotiLMS.entities.user.dto;

import com.justdeepfried.GyanJyotiLMS.entities.user.model.UserModel;
import com.justdeepfried.GyanJyotiLMS.enums.USER_ROLES;

import java.util.List;

public record UserResponseDTO (
        Long userId,
        String username,
        Long schoolId,
        USER_ROLES role
){
    public static UserResponseDTO from(UserModel userModel) {
        return new UserResponseDTO(
                userModel.getUserId(),
                userModel.getUsername(),
                userModel.getSchool().getSchoolId(),
                userModel.getRole()
        );
    }

    public static List<UserResponseDTO> fromList(List<UserModel> userModels) {
        return userModels
                .stream()
                .map(UserResponseDTO::from)
                .toList();
    }
}
