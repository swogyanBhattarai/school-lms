package com.justdeepfried.GyanJyotiLMS.security.jwt;

import com.justdeepfried.GyanJyotiLMS.security.user.CustomUserDetailsService;
import com.justdeepfried.GyanJyotiLMS.security.user.UserPrincipal;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final CustomUserDetailsService userDetailsService;

    @Value("${app.securityKey}")
    private String securityKey;

    private Map<String, Object> claims = new HashMap<>();

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(securityKey.getBytes());
    }

    public String createToken(String username, Long expiryInMillis) {

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (userDetails instanceof UserPrincipal userPrincipal) {
            List<String> roles = userPrincipal
                    .getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            Long schoolId = userPrincipal.getSchoolId();

            claims.put("roles", roles);
            claims.put("schoolId", schoolId);
        }

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiryInMillis))
                .and()
                .signWith(getKey())
                .compact();

    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public boolean isExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Long extractSchoolId(String token) {
        return extractClaim(token, claims -> claims.get("schoolId", Long.class));
    }

    public boolean validateToken(UserDetails userDetails, String token) {
        return extractUsername(token).equals(userDetails.getUsername()) && !isExpired(token);
    }
}
