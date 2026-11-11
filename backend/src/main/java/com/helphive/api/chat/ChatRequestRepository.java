package com.helphive.api.chat;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

interface ChatRequestRepository extends JpaRepository<ChatRequest, Long> {
    List<ChatRequest> findByRequesterIdOrRecipientIdOrderByUpdatedAtDesc(Long requesterId, Long recipientId);
    boolean existsByRequesterIdAndRecipientIdAndStatus(Long requesterId, Long recipientId, ChatRequestStatus status);
    long countByRequesterIdAndCreatedAtAfter(Long requesterId, Instant after);
    Optional<ChatRequest> findByIdAndRecipientId(Long id, Long recipientId);
    Optional<ChatRequest> findByIdAndRequesterId(Long id, Long requesterId);
}
