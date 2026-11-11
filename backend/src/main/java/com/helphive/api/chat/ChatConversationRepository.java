package com.helphive.api.chat;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

interface ChatConversationRepository extends JpaRepository<ChatConversation, Long> {
    List<ChatConversation> findAllByRequestRequesterIdOrRequestRecipientIdOrderByUpdatedAtDesc(
            Long requesterId, Long recipientId);
}
