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
        Instant createdAt,
        Instant updatedAt
) {
    static HelpPostResponse from(HelpPost post) {
        return new HelpPostResponse(
                post.getId(), post.getTitle(), post.getDescription(), post.getAuthorName(),
                post.getContact(), post.getLocation(), post.getCategory(), post.getType(),
                post.getStatus(), post.getCreatedAt(), post.getUpdatedAt());
    }
}
