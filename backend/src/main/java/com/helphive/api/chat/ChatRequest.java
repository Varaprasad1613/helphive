package com.helphive.api.chat;

import com.helphive.api.post.HelpPost;
import com.helphive.api.response.HelpResponse;
import com.helphive.api.user.AppUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "chat_requests")
class ChatRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "requester_id", nullable = false)
    private AppUser requester;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "recipient_id", nullable = false)
    private AppUser recipient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private HelpPost post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "response_id")
    private HelpResponse response;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private ChatRequestStatus status = ChatRequestStatus.PENDING;

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
    AppUser getRequester() { return requester; }
    void setRequester(AppUser requester) { this.requester = requester; }
    AppUser getRecipient() { return recipient; }
    void setRecipient(AppUser recipient) { this.recipient = recipient; }
    HelpPost getPost() { return post; }
    void setPost(HelpPost post) { this.post = post; }
    HelpResponse getResponse() { return response; }
    void setResponse(HelpResponse response) { this.response = response; }
    ChatRequestStatus getStatus() { return status; }
    void setStatus(ChatRequestStatus status) { this.status = status; }
    Instant getCreatedAt() { return createdAt; }
    Instant getUpdatedAt() { return updatedAt; }
}
