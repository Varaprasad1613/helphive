package com.helphive.api.chat;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

interface ChatKeyRepository extends JpaRepository<ChatKey, Long> {
    Optional<ChatKey> findByUserId(Long userId);
}
