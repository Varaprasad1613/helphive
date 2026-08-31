package com.helphive.api.auth;

import com.helphive.api.common.ConflictException;
import com.helphive.api.user.AppUser;
import com.helphive.api.user.AppUserRepository;
import java.util.Locale;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private final AppUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AccountRecoveryService recoveryService;

    public AuthService(AppUserRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService,
                       AccountRecoveryService recoveryService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.recoveryService = recoveryService;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        String email = normalizeEmail(request.email());
        if (repository.existsByEmailIgnoreCase(email)) {
            throw new ConflictException("An account already exists for this email");
        }
        AppUser user = new AppUser();
        user.setName(request.name().strip());
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setEmailVerified(!recoveryService.verificationRequired());
        AppUser saved = repository.save(user);
        recoveryService.sendVerification(saved);
        return UserResponse.from(saved);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        AppUser user = repository.findByEmailIgnoreCase(normalizeEmail(request.email()))
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid email or password");
        }
        if (!user.isEmailVerified()) {
            throw new org.springframework.security.access.AccessDeniedException("Verify your email before signing in");
        }
        return response(user);
    }

    private AuthResponse response(AppUser user) {
        return new AuthResponse(jwtService.issue(user), UserResponse.from(user));
    }

    private String normalizeEmail(String email) {
        return email.strip().toLowerCase(Locale.ROOT);
    }
}
