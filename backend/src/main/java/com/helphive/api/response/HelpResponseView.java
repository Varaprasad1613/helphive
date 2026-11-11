package com.helphive.api.response;

import java.time.Instant;

public record HelpResponseView(
        Long id, Long postId, String postTitle, String postOwnerName, Long postOwnerId,
        String responderName, Long responderId, String responderEmail, String message, ResponseStatus status,
        boolean received, boolean canWithdraw, Instant createdAt, Instant updatedAt) {
    static HelpResponseView from(HelpResponse response, Long currentUserId) {
        boolean received = response.getPost().getOwner() != null
                && response.getPost().getOwner().getId().equals(currentUserId);
        Long ownerId = response.getPost().getOwner() == null ? null : response.getPost().getOwner().getId();
        return new HelpResponseView(response.getId(), response.getPost().getId(), response.getPost().getTitle(),
                response.getPost().getAuthorName(), ownerId, response.getResponder().getName(),
                response.getResponder().getId(), null,
                response.getMessage(), response.getStatus(), received,
                response.getResponder().getId().equals(currentUserId) && response.getStatus() == ResponseStatus.PENDING,
                response.getCreatedAt(), response.getUpdatedAt());
    }
}
