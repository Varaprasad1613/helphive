package com.helphive.api.chat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChatMessageCreate(
        @NotBlank @Size(max = 12000) String ciphertext,
        @NotBlank @Size(max = 64) String iv
) {}
