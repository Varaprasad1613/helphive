package com.helphive.api.chat;

import java.time.Instant;

public record ChatReportView(
        Long id,
        Long conversationId,
        Long reporterId,
        String reporterName,
        Long reportedUserId,
        String reportedUserName,
        String reason,
        String optionalEvidence,
        ChatReportStatus status,
        Instant createdAt
) {
    static ChatReportView from(ChatReport report) {
        return new ChatReportView(report.getId(), report.getConversation().getId(),
                report.getReporter().getId(), report.getReporter().getName(),
                report.getReportedUser().getId(), report.getReportedUser().getName(),
                report.getReason(), report.getOptionalEvidence(), report.getStatus(), report.getCreatedAt());
    }
}
