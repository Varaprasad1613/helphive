package com.helphive.api.admin;

import jakarta.validation.constraints.NotNull;

public record AccountStatusRequest(@NotNull Boolean active) {}
