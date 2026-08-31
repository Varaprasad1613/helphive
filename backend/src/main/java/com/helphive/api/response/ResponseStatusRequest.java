package com.helphive.api.response;

import jakarta.validation.constraints.NotNull;

public record ResponseStatusRequest(@NotNull ResponseStatus status) {}
