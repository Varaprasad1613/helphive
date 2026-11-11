package com.helphive.api.chat;

import com.helphive.api.user.AppUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "chat_messages")
class ChatMessage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "conversation_id", nullable = false)
    private ChatConversation conversation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sender_id", nullable = false)
    private AppUser sender;

    @Column(nullable = false, length = 12000)
    private String ciphertext;

    @Column(nullable = false, length = 64)
    private String iv;

    @Column(nullable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        createdAt = Instant.now();
    }

    Long getId() { return id; }
    ChatConversation getConversation() { return conversation; }
    void setConversation(ChatConversation conversation) { this.conversation = conversation; }
    AppUser getSender() { return sender; }
    void setSender(AppUser sender) { this.sender = sender; }
    String getCiphertext() { return ciphertext; }
    void setCiphertext(String ciphertext) { this.ciphertext = ciphertext; }
    String getIv() { return iv; }
    void setIv(String iv) { this.iv = iv; }
    Instant getCreatedAt() { return createdAt; }
}
