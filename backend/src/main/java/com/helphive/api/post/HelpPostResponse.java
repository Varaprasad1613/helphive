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
    public static HelpPostResponse from(HelpPost post, Long currentUserId) {
        Long ownerId = post.getOwner() == null ? null : post.getOwner().getId();
        boolean ownedByCurrentUser = ownerId != null && ownerId.equals(currentUserId);
        return new HelpPostResponse(
                post.getId(), post.getTitle(), post.getDescription(), post.getAuthorName(),
                ownedByCurrentUser ? post.getContact() : null, post.getLocation(), post.getCategory(), post.getType(),
                post.getStatus(), ownerId, ownedByCurrentUser,
                post.getCreatedAt(), post.getUpdatedAt());
    }
}
