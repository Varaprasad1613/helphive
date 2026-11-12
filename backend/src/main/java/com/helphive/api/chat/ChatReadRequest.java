package com.helphive.api.chat;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ChatReadRequest(@NotNull @Positive Long messageId) {}
