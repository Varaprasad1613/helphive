package com.helphive.api.chat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChatReportRequest(
        @NotBlank @Size(max = 500) String reason,
        @Size(max = 3000) String optionalEvidence
) {}
