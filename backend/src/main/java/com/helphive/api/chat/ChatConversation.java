package com.helphive.api.chat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;

@Entity
@Table(name = "chat_conversations", uniqueConstraints = @UniqueConstraint(
        name = "uk_chat_conversation_request", columnNames = "request_id"))
class ChatConversation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "request_id", nullable = false)
    private ChatRequest request;

    @Column(nullable = false, length = 2048)
    private String requesterKeyEnvelope;

    @Column(nullable = false, length = 2048)
    private String recipientKeyEnvelope;

    private Instant requesterArchivedAt;
    private Instant recipientArchivedAt;

    private Long requesterLastReadMessageId;
    private Long recipientLastReadMessageId;

    @Column(nullable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        createdAt = Instant.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }

    Long getId() { return id; }
    ChatRequest getRequest() { return request; }
    void setRequest(ChatRequest request) { this.request = request; }
    String getRequesterKeyEnvelope() { return requesterKeyEnvelope; }
    void setRequesterKeyEnvelope(String value) { requesterKeyEnvelope = value; }
    String getRecipientKeyEnvelope() { return recipientKeyEnvelope; }
    void setRecipientKeyEnvelope(String value) { recipientKeyEnvelope = value; }
    Instant getRequesterArchivedAt() { return requesterArchivedAt; }
    void setRequesterArchivedAt(Instant value) { requesterArchivedAt = value; }
    Instant getRecipientArchivedAt() { return recipientArchivedAt; }
    void setRecipientArchivedAt(Instant value) { recipientArchivedAt = value; }
    Long getRequesterLastReadMessageId() { return requesterLastReadMessageId; }
    void setRequesterLastReadMessageId(Long value) { requesterLastReadMessageId = value; }
    Long getRecipientLastReadMessageId() { return recipientLastReadMessageId; }
    void setRecipientLastReadMessageId(Long value) { recipientLastReadMessageId = value; }
    Instant getCreatedAt() { return createdAt; }
    Instant getUpdatedAt() { return updatedAt; }
    void touch() { updatedAt = Instant.now(); }
}
