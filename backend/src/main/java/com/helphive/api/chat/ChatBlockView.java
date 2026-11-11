package com.helphive.api.chat;

import java.time.Instant;

public record ChatBlockView(Long userId, String name, Instant blockedAt) {
    static ChatBlockView from(ChatBlock block) {
        return new ChatBlockView(block.getBlocked().getId(), block.getBlocked().getName(), block.getCreatedAt());
    }
}
