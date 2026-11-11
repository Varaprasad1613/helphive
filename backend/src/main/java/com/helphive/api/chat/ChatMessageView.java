package com.helphive.api.chat;

import java.time.Instant;

public record ChatMessageView(Long id, Long senderId, String ciphertext, String iv, Instant createdAt) {
    static ChatMessageView from(ChatMessage message) {
        return new ChatMessageView(message.getId(), message.getSender().getId(),
                message.getCiphertext(), message.getIv(), message.getCreatedAt());
    }
}
