package com.justdeepfried.GyanJyotiLMS.security.user;

import com.justdeepfried.GyanJyotiLMS.exception.ResourceNotFoundException;
import com.justdeepfried.GyanJyotiLMS.entities.user.model.UserModel;
import com.justdeepfried.GyanJyotiLMS.entities.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel user = userRepo.findByUsername(username) // userRepo.findByEmail(email) used for logging in using email instead of username
                .orElseThrow(() -> new ResourceNotFoundException("User with username: " + username + " not found!"));
        return new UserPrincipal(user);

    }
}
