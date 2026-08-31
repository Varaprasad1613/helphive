package com.helphive.api.response;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record HelpResponseRequest(@NotBlank @Size(min = 10, max = 600) String message) {}
