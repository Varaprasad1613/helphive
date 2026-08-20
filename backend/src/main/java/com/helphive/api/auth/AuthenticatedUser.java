package com.helphive.api.auth;

import com.helphive.api.user.UserRole;

public record AuthenticatedUser(Long id, String email, String name, UserRole role) {}
