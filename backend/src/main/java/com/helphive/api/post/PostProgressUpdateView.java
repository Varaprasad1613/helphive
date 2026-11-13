package com.helphive.api.post;

import java.time.Instant;

public record PostProgressUpdateView(
        Long id,
        Long parentId,
        PostProgressUpdateType type,
        String content,
        String authorName,
        Long authorId,
        Instant createdAt) {
    static PostProgressUpdateView from(PostProgressUpdate update) {
        return new PostProgressUpdateView(
                update.getId(),
                update.getParent() == null ? null : update.getParent().getId(),
                update.getType(),
                update.getContent(),
                update.getAuthor().getName(),
                update.getAuthor().getId(),
                update.getCreatedAt());
    }
}
