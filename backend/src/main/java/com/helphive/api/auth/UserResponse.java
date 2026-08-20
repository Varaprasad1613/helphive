package com.helphive.api.auth;

import com.helphive.api.user.AppUser;
import com.helphive.api.user.UserRole;

public record UserResponse(Long id, String name, String email, UserRole role) {
    public static UserResponse from(AppUser user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    public static UserResponse from(AuthenticatedUser user) {
        return new UserResponse(user.id(), user.name(), user.email(), user.role());
    }
}
