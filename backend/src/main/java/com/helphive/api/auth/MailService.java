package com.helphive.api.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private static final Logger log = LoggerFactory.getLogger(MailService.class);
    private final ObjectProvider<JavaMailSender> senderProvider;
    private final boolean enabled;
    private final String from;

    public MailService(ObjectProvider<JavaMailSender> senderProvider,
                       @Value("${app.mail.enabled:false}") boolean enabled,
                       @Value("${app.mail.from:no-reply@helphive.local}") String from) {
        this.senderProvider = senderProvider; this.enabled = enabled; this.from = from;
    }
    public boolean isEnabled() { return enabled; }
    public void send(String to, String subject, String text) {
        if (!enabled) { log.info("Mail disabled. Intended recipient: {}; subject: {}; content: {}", to, subject, text); return; }
        JavaMailSender sender = senderProvider.getIfAvailable();
        if (sender == null) throw new IllegalStateException("Mail is enabled but SMTP is not configured");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from); message.setTo(to); message.setSubject(subject); message.setText(text);
        sender.send(message);
    }
}
