package com.justdeepfried.GyanJyotiLMS.entities.user.service;

import com.justdeepfried.GyanJyotiLMS.entities.school.context.SchoolContext;
import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolModel;
import com.justdeepfried.GyanJyotiLMS.entities.school.service.SchoolService;
import com.justdeepfried.GyanJyotiLMS.entities.user.dto.UserCreateDTO;
import com.justdeepfried.GyanJyotiLMS.entities.user.dto.UserResponseDTO;
import com.justdeepfried.GyanJyotiLMS.exception.ResourceAlreadyExistsException;
import com.justdeepfried.GyanJyotiLMS.entities.user.model.UserModel;
import com.justdeepfried.GyanJyotiLMS.entities.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepo;
    private final SchoolService schoolService;
    private final BCryptPasswordEncoder encoder;

    @Transactional(readOnly = true)
    public List<UserResponseDTO> findAll() {
        return UserResponseDTO.fromList(userRepo.findAll());
    }

    public void addUser(UserCreateDTO user) {
        if (userRepo.existsByUsername(user.username())) {
            throw new ResourceAlreadyExistsException("User with email: " + user.username() + " already exists!");
        }

        Long schoolId = SchoolContext.get();

        SchoolModel schoolModel = schoolService.findById(schoolId);

        UserModel userModel = new UserModel();
        userModel.setUsername(user.username());
        userModel.setPassword(encoder.encode(user.password()));
        userModel.setRole(user.role());
        userModel.setSchool(schoolModel);

        userRepo.save(userModel);
    }
}
