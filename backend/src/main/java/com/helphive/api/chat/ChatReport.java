package com.helphive.api.chat;

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
import java.time.Instant;

@Entity
@Table(name = "chat_reports")
class ChatReport {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "conversation_id", nullable = false)
    private ChatConversation conversation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "reporter_id", nullable = false)
    private AppUser reporter;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "reported_user_id", nullable = false)
    private AppUser reportedUser;

    @Column(nullable = false, length = 500)
    private String reason;

    @Column(length = 3000)
    private String optionalEvidence;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private ChatReportStatus status = ChatReportStatus.OPEN;

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
    ChatConversation getConversation() { return conversation; }
    void setConversation(ChatConversation conversation) { this.conversation = conversation; }
    AppUser getReporter() { return reporter; }
    void setReporter(AppUser reporter) { this.reporter = reporter; }
    AppUser getReportedUser() { return reportedUser; }
    void setReportedUser(AppUser reportedUser) { this.reportedUser = reportedUser; }
    String getReason() { return reason; }
    void setReason(String reason) { this.reason = reason; }
    String getOptionalEvidence() { return optionalEvidence; }
    void setOptionalEvidence(String optionalEvidence) { this.optionalEvidence = optionalEvidence; }
    ChatReportStatus getStatus() { return status; }
    void setStatus(ChatReportStatus status) { this.status = status; }
    Instant getCreatedAt() { return createdAt; }
    Instant getUpdatedAt() { return updatedAt; }
}
