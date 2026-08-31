package com.helphive.api.response;

import java.time.Instant;

public record HelpResponseView(
        Long id, Long postId, String postTitle, String postOwnerName,
        String responderName, String responderEmail, String message, ResponseStatus status,
        boolean received, boolean canWithdraw, Instant createdAt, Instant updatedAt) {
    static HelpResponseView from(HelpResponse response, Long currentUserId) {
        boolean received = response.getPost().getOwner() != null
                && response.getPost().getOwner().getId().equals(currentUserId);
        return new HelpResponseView(response.getId(), response.getPost().getId(), response.getPost().getTitle(),
                response.getPost().getAuthorName(), response.getResponder().getName(), response.getResponder().getEmail(),
                response.getMessage(), response.getStatus(), received,
                response.getResponder().getId().equals(currentUserId) && response.getStatus() == ResponseStatus.PENDING,
                response.getCreatedAt(), response.getUpdatedAt());
    }
}
