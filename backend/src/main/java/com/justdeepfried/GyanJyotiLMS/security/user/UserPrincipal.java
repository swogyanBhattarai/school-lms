package com.justdeepfried.GyanJyotiLMS.security.user;

import com.justdeepfried.GyanJyotiLMS.entities.user.model.UserModel;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@RequiredArgsConstructor
public class UserPrincipal implements UserDetails {

    private final UserModel userModel;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + userModel.getRole().toString().toUpperCase()));
    }

    @Override
    public @Nullable String getPassword() {
        return userModel.getPassword();
    }

    @Override
    public String getUsername() {
        return userModel.getUsername(); // use .getEmail() to login using email instead of username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public long getId() {
        return userModel.getUserId();
    }

    public long getSchoolId() {
        return userModel.getSchool().getSchoolId();
    }
}
