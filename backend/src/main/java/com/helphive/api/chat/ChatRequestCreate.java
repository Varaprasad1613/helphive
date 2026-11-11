package com.helphive.api.chat;

import jakarta.validation.constraints.NotNull;

public record ChatRequestCreate(
        @NotNull Long recipientId,
        Long postId,
        Long responseId
) {}
