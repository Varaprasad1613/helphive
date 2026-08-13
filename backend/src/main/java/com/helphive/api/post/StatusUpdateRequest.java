package com.helphive.api.post;

import jakarta.validation.constraints.NotNull;

public record StatusUpdateRequest(@NotNull PostStatus status) {}
