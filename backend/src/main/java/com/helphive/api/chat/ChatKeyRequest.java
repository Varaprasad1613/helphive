package com.helphive.api.chat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChatKeyRequest(
        @NotBlank @Size(max = 12000) String publicKey,
        @NotBlank @Size(max = 8000) String encryptedPrivateKey,
        @NotBlank @Size(max = 64) String salt,
        @NotBlank @Size(max = 64) String iv
) {}
