package com.helphive.api.response;

record ResponseNotificationEvent(
        Long responseId,
        String recipientEmail,
        ResponseNotificationType type
) {}
