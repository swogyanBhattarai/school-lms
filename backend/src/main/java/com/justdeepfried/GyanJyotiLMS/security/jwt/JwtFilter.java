package com.justdeepfried.GyanJyotiLMS.security.jwt;

import com.justdeepfried.GyanJyotiLMS.entities.school.context.SchoolContext;
import com.justdeepfried.GyanJyotiLMS.security.user.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.swing.plaf.InsetsUIResource;
import java.io.IOException;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    private String extractJwtFromCookies(Cookie[] cookies) {
        if (cookies == null) return null;
        return Arrays.stream(cookies)
                .filter(cookie -> "accessKey".equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        Cookie[] cookies = request.getCookies();
        String token = null;
        String username = null;
        Long schoolId = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        } else {
            token = extractJwtFromCookies(cookies);
        }

        if (token != null) {
            try {
                username = jwtService.extractUsername(token);
                schoolId = jwtService.extractSchoolId(token);
                SchoolContext.set(schoolId);
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    if (jwtService.validateToken(userDetails, token)) {
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                }
            } catch (Exception ignored) {}
        }
        try {
            filterChain.doFilter(request, response);
        } finally {
            SchoolContext.clear();
        }
    }
}
