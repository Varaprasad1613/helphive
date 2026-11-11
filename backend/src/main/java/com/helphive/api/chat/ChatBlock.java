package com.helphive.api.chat;

import com.helphive.api.user.AppUser;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;

@Entity
@Table(name = "chat_blocks", uniqueConstraints = @UniqueConstraint(
        name = "uk_chat_block_pair", columnNames = {"blocker_id", "blocked_id"}))
class ChatBlock {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "blocker_id", nullable = false)
    private AppUser blocker;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "blocked_id", nullable = false)
    private AppUser blocked;

    private Instant createdAt;

    @PrePersist
    void onCreate() {
        createdAt = Instant.now();
    }

    Long getId() { return id; }
    AppUser getBlocker() { return blocker; }
    void setBlocker(AppUser blocker) { this.blocker = blocker; }
    AppUser getBlocked() { return blocked; }
    void setBlocked(AppUser blocked) { this.blocked = blocked; }
    Instant getCreatedAt() { return createdAt; }
}
