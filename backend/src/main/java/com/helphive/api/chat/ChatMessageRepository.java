package com.helphive.api.chat;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findTop100ByConversationIdOrderByIdDesc(Long conversationId);
    long countByConversationIdAndSenderIdAndIdGreaterThan(Long conversationId, Long senderId, Long messageId);
    Optional<ChatMessage> findByIdAndConversationId(Long id, Long conversationId);
}
