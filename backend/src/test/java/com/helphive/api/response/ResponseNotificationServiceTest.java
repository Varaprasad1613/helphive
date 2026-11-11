package com.helphive.api.response;

import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.contains;

import com.helphive.api.auth.MailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ResponseNotificationServiceTest {
    @Mock MailService mail;
    private ResponseNotificationService notifications;

    @BeforeEach
    void setUp() {
        notifications = new ResponseNotificationService(mail, "https://helphive.example/");
    }

    @Test
    void sendsPrivateNewResponseNotificationToPostOwner() {
        when(mail.isEnabled()).thenReturn(true);

        notifications.sendNotification(new ResponseNotificationEvent(
                41L, "owner@example.com", ResponseNotificationType.NEW_RESPONSE));

        verify(mail).send(
                eq("owner@example.com"),
                eq("You received a response on HelpHive"),
                contains("https://helphive.example/my-responses"));
    }

    @Test
    void sendsAcceptanceAndDeclineNotificationsToResponders() {
        when(mail.isEnabled()).thenReturn(true);

        notifications.sendNotification(new ResponseNotificationEvent(
                42L, "accepted@example.com", ResponseNotificationType.RESPONSE_ACCEPTED));
        notifications.sendNotification(new ResponseNotificationEvent(
                43L, "declined@example.com", ResponseNotificationType.RESPONSE_DECLINED));

        verify(mail).send(eq("accepted@example.com"), eq("Your HelpHive response was accepted"),
                contains("The owner accepted your response"));
        verify(mail).send(eq("declined@example.com"), eq("Your HelpHive response was declined"),
                contains("The owner declined your response"));
    }

    @Test
    void doesNotAttemptDeliveryWhenMailIsDisabled() {
        when(mail.isEnabled()).thenReturn(false);

        notifications.sendNotification(new ResponseNotificationEvent(
                44L, "owner@example.com", ResponseNotificationType.NEW_RESPONSE));

        verify(mail, never()).send(org.mockito.ArgumentMatchers.anyString(),
                org.mockito.ArgumentMatchers.anyString(), org.mockito.ArgumentMatchers.anyString());
    }

    @Test
    void containsNoResponseMessageInNotificationBody() {
        when(mail.isEnabled()).thenReturn(true);

        notifications.sendNotification(new ResponseNotificationEvent(
                45L, "owner@example.com", ResponseNotificationType.NEW_RESPONSE));

        org.mockito.ArgumentCaptor<String> body = org.mockito.ArgumentCaptor.forClass(String.class);
        verify(mail).send(eq("owner@example.com"), eq("You received a response on HelpHive"), body.capture());
        org.junit.jupiter.api.Assertions.assertFalse(body.getValue().contains("private response text"));
        org.junit.jupiter.api.Assertions.assertTrue(body.getValue().contains("For your privacy"));
    }
}
