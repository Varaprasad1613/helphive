package com.helphive.api.post;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record HelpPostRequest(
        @NotBlank @Size(max = 90) String title,
        @NotBlank @Size(min = 20, max = 800) String description,
        @NotBlank @Size(max = 60) String authorName,
        @NotBlank @Email @Size(max = 120) String contact,
        @NotBlank @Size(max = 80) String location,
        @NotNull Category category,
        @NotNull PostType type
) {}
