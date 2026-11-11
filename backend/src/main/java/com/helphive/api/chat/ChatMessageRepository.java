package com.helphive.api.chat;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findTop100ByConversationIdOrderByIdDesc(Long conversationId);
}
