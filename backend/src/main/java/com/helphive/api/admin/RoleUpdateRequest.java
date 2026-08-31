package com.helphive.api.admin;

import com.helphive.api.user.UserRole;
import jakarta.validation.constraints.NotNull;

public record RoleUpdateRequest(@NotNull UserRole role) {}
