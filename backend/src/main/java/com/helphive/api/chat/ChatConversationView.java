package com.helphive.api.chat;

import java.time.Instant;

public record ChatConversationView(
        Long id,
        Long peerId,
        String peerName,
        Long postId,
        String postTitle,
        String encryptedKeyEnvelope,
        Instant updatedAt
) {
    static ChatConversationView from(ChatConversation conversation, Long currentUserId) {
        ChatRequest request = conversation.getRequest();
        boolean requester = request.getRequester().getId().equals(currentUserId);
        var peer = requester ? request.getRecipient() : request.getRequester();
        return new ChatConversationView(conversation.getId(), peer.getId(), peer.getName(),
                request.getPost() == null ? null : request.getPost().getId(),
                request.getPost() == null ? null : request.getPost().getTitle(),
                requester ? conversation.getRequesterKeyEnvelope() : conversation.getRecipientKeyEnvelope(),
                conversation.getUpdatedAt());
    }
}
