package com.helphive.api.post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PostProgressUpdateRequest(
        @NotNull PostProgressUpdateType type,
        @NotBlank @Size(max = 1000) String content,
        Long parentId) {}
