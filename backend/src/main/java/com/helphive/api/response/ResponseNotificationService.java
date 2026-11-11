package com.helphive.api.response;

import com.helphive.api.auth.MailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Service
public class ResponseNotificationService {
    private static final Logger log = LoggerFactory.getLogger(ResponseNotificationService.class);
    private static final String INBOX_PATH = "/my-responses";

    private final MailService mail;
    private final String inboxUrl;

    public ResponseNotificationService(
            MailService mail,
            @Value("${app.public-url:http://localhost:4200}") String publicUrl) {
        this.mail = mail;
        this.inboxUrl = publicUrl.replaceAll("/+$", "") + INBOX_PATH;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void sendNotification(ResponseNotificationEvent event) {
        if (!mail.isEnabled()) {
            log.warn("Response notification was not sent because mail is disabled. Response ID: {}, type: {}",
                    event.responseId(), event.type());
            return;
        }

        String subject = switch (event.type()) {
            case NEW_RESPONSE -> "You received a response on HelpHive";
            case RESPONSE_ACCEPTED -> "Your HelpHive response was accepted";
            case RESPONSE_DECLINED -> "Your HelpHive response was declined";
        };
        String message = switch (event.type()) {
            case NEW_RESPONSE -> "Someone responded to one of your HelpHive posts.";
            case RESPONSE_ACCEPTED -> "The owner accepted your response on HelpHive.";
            case RESPONSE_DECLINED -> "The owner declined your response on HelpHive.";
        };
        String body = message + "\n\nSign in to HelpHive to view the details:\n" + inboxUrl
                + "\n\nFor your privacy, response details are not included in this email.";

        try {
            mail.send(event.recipientEmail(), subject, body);
        } catch (MailException | IllegalStateException exception) {
            log.error("Failed to send response notification. Response ID: {}, type: {}",
                    event.responseId(), event.type(), exception);
        }
    }
}
