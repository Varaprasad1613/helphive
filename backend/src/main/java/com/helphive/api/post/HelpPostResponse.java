package com.helphive.api.post;

import java.time.Instant;

public record HelpPostResponse(
        Long id,
        String title,
        String description,
        String authorName,
        String contact,
        String location,
        Category category,
        PostType type,
        PostStatus status,
        Long ownerId,
        boolean ownedByCurrentUser,
        Instant createdAt,
        Instant updatedAt
) {
    static HelpPostResponse from(HelpPost post, Long currentUserId) {
        Long ownerId = post.getOwner() == null ? null : post.getOwner().getId();
        return new HelpPostResponse(
                post.getId(), post.getTitle(), post.getDescription(), post.getAuthorName(),
                currentUserId == null ? null : post.getContact(), post.getLocation(), post.getCategory(), post.getType(),
                post.getStatus(), ownerId, ownerId != null && ownerId.equals(currentUserId),
                post.getCreatedAt(), post.getUpdatedAt());
    }
}
