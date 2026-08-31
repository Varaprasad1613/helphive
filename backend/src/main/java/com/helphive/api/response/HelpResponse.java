package com.helphive.api.response;

import com.helphive.api.post.HelpPost;
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
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;

@Entity
@Table(name = "help_responses", uniqueConstraints =
        @UniqueConstraint(name = "uk_response_post_responder", columnNames = {"post_id", "responder_id"}))
public class HelpResponse {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "post_id", nullable = false)
    private HelpPost post;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "responder_id", nullable = false)
    private AppUser responder;
    @Column(nullable = false, length = 600)
    private String message;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 16)
    private ResponseStatus status = ResponseStatus.PENDING;
    @Column(nullable = false, updatable = false)
    private Instant createdAt;
    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist void onCreate() { createdAt = Instant.now(); updatedAt = createdAt; }
    @PreUpdate void onUpdate() { updatedAt = Instant.now(); }
    public Long getId() { return id; }
    public HelpPost getPost() { return post; }
    public void setPost(HelpPost post) { this.post = post; }
    public AppUser getResponder() { return responder; }
    public void setResponder(AppUser responder) { this.responder = responder; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public ResponseStatus getStatus() { return status; }
    public void setStatus(ResponseStatus status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
