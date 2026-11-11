package com.helphive.api.chat;

import java.time.Instant;

public record ChatRequestView(
        Long id,
        Long requesterId,
        String requesterName,
        Long recipientId,
        String recipientName,
        Long postId,
        String postTitle,
        Long responseId,
        ChatRequestStatus status,
        Instant createdAt
) {
    static ChatRequestView from(ChatRequest request) {
        return new ChatRequestView(request.getId(), request.getRequester().getId(), request.getRequester().getName(),
                request.getRecipient().getId(), request.getRecipient().getName(),
                request.getPost() == null ? null : request.getPost().getId(),
                request.getPost() == null ? null : request.getPost().getTitle(),
                request.getResponse() == null ? null : request.getResponse().getId(),
                request.getStatus(), request.getCreatedAt());
    }
}
