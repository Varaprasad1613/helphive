package com.helphive.api.user;

import com.helphive.api.auth.AuthenticatedUser;
import com.helphive.api.auth.UserResponse;
import com.helphive.api.common.ConflictException;
import com.helphive.api.common.ResourceNotFoundException;
import com.helphive.api.post.HelpPostRepository;
import java.util.Locale;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class UserService {
    private final AppUserRepository users;
    private final HelpPostRepository posts;
    private final PasswordEncoder passwordEncoder;

    public UserService(AppUserRepository users, HelpPostRepository posts, PasswordEncoder passwordEncoder) {
        this.users = users;
        this.posts = posts;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse current(AuthenticatedUser principal) {
        return UserResponse.from(requireUser(principal.id()));
    }

    @Transactional
    public UserResponse update(AuthenticatedUser principal, ProfileUpdateRequest request) {
        AppUser user = requireUser(principal.id());
        String email = request.email().strip().toLowerCase(Locale.ROOT);
        users.findByEmailIgnoreCase(email)
                .filter(existing -> !existing.getId().equals(user.getId()))
                .ifPresent(existing -> { throw new ConflictException("That email is already used by another account"); });
        user.setName(request.name().strip());
        user.setEmail(email);
        posts.findByOwnerId(user.getId()).forEach(post -> {
            post.setAuthorName(user.getName());
            post.setContact(user.getEmail());
        });
        return UserResponse.from(users.save(user));
    }

    @Transactional
    public void changePassword(AuthenticatedUser principal, PasswordChangeRequest request) {
        AppUser user = requireUser(principal.id());
        if (!passwordEncoder.matches(request.currentPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Your current password is incorrect");
        }
        if (passwordEncoder.matches(request.newPassword(), user.getPasswordHash())) {
            throw new ConflictException("Choose a new password that is different from the current password");
        }
        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        users.save(user);
    }

    private AppUser requireUser(Long id) {
        return users.findById(id).orElseThrow(() -> new ResourceNotFoundException("Your account was not found"));
    }
}
