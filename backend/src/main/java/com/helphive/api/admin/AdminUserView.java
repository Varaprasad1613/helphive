package com.helphive.api.admin;

import com.helphive.api.user.AppUser;
import com.helphive.api.user.UserRole;
import java.time.Instant;

public record AdminUserView(Long id, String name, String email, UserRole role, boolean emailVerified,
                            boolean active, long postCount, Instant createdAt) {
    static AdminUserView from(AppUser user, long postCount) {
        return new AdminUserView(user.getId(), user.getName(), user.getEmail(), user.getRole(),
                user.isEmailVerified(), user.isActive(), postCount, user.getCreatedAt());
    }
}
