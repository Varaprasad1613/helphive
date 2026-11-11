package com.helphive.api.chat;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

interface ChatBlockRepository extends JpaRepository<ChatBlock, Long> {
    boolean existsByBlockerIdAndBlockedId(Long blockerId, Long blockedId);
    Optional<ChatBlock> findByBlockerIdAndBlockedId(Long blockerId, Long blockedId);
    List<ChatBlock> findAllByBlockerIdOrderByCreatedAtDesc(Long blockerId);
}
