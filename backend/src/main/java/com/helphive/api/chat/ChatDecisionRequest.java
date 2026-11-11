package com.helphive.api.chat;

import jakarta.validation.constraints.Size;

public record ChatDecisionRequest(
        boolean accept,
        @Size(max = 2048) String requesterKeyEnvelope,
        @Size(max = 2048) String recipientKeyEnvelope
) {
}
