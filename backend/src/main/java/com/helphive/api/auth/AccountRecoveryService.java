package com.helphive.api.auth;

import com.helphive.api.common.ConflictException;
import com.helphive.api.common.ResourceNotFoundException;
import com.helphive.api.user.AppUser;
import com.helphive.api.user.AppUserRepository;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountRecoveryService {
    private final AccountTokenRepository tokens;
    private final AppUserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final MailService mail;
    private final String publicUrl;
    private final SecureRandom random = new SecureRandom();

    public AccountRecoveryService(AccountTokenRepository tokens, AppUserRepository users,
            PasswordEncoder passwordEncoder, MailService mail,
            @Value("${app.public-url:http://localhost:4200}") String publicUrl) {
        this.tokens = tokens; this.users = users; this.passwordEncoder = passwordEncoder;
        this.mail = mail; this.publicUrl = publicUrl.replaceAll("/+$", "");
    }
    public boolean verificationRequired() { return mail.isEnabled(); }

    @Transactional
    public void sendVerification(AppUser user) {
        if (!mail.isEnabled() || user.isEmailVerified()) return;
        String raw = createToken(user, AccountTokenType.EMAIL_VERIFICATION, Duration.ofHours(24));
        String link = publicUrl + "/auth/verify-email?token=" + raw;
        mail.send(user.getEmail(), "Verify your HelpHive email",
                "Hello " + user.getName() + ",\n\nVerify your email within 24 hours:\n" + link + "\n\nIf you did not create this account, ignore this email.");
    }

    @Transactional
    public void resendVerification(String email) {
        users.findByEmailIgnoreCase(normalize(email)).ifPresent(this::sendVerification);
    }

    @Transactional
    public void verifyEmail(String rawToken) {
        AccountToken token = requireValid(rawToken, AccountTokenType.EMAIL_VERIFICATION);
        token.getUser().setEmailVerified(true); token.setUsedAt(Instant.now());
        users.save(token.getUser()); tokens.save(token);
    }

    @Transactional
    public void sendPasswordReset(String email) {
        users.findByEmailIgnoreCase(normalize(email)).ifPresent(user -> {
            String raw = createToken(user, AccountTokenType.PASSWORD_RESET, Duration.ofMinutes(30));
            String link = publicUrl + "/auth/reset-password?token=" + raw;
            mail.send(user.getEmail(), "Reset your HelpHive password",
                    "Hello " + user.getName() + ",\n\nReset your password within 30 minutes:\n" + link + "\n\nIf you did not request this, ignore this email.");
        });
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        AccountToken token = requireValid(request.token(), AccountTokenType.PASSWORD_RESET);
        token.getUser().setPasswordHash(passwordEncoder.encode(request.password()));
        token.setUsedAt(Instant.now()); users.save(token.getUser()); tokens.save(token);
    }

    private String createToken(AppUser user, AccountTokenType type, Duration lifetime) {
        tokens.deleteByUserIdAndType(user.getId(), type);
        byte[] bytes = new byte[32]; random.nextBytes(bytes);
        String raw = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        AccountToken token = new AccountToken(); token.setUser(user); token.setType(type);
        token.setTokenHash(hash(raw)); token.setExpiresAt(Instant.now().plus(lifetime)); tokens.save(token);
        return raw;
    }
    private AccountToken requireValid(String raw, AccountTokenType type) {
        AccountToken token = tokens.findByTokenHashAndType(hash(raw), type)
                .orElseThrow(() -> new ResourceNotFoundException("This link is invalid or has already been replaced"));
        if (token.getUsedAt() != null) throw new ConflictException("This link has already been used");
        if (Instant.now().isAfter(token.getExpiresAt())) throw new ConflictException("This link has expired");
        return token;
    }
    private String hash(String raw) {
        try { return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(raw.getBytes(StandardCharsets.UTF_8))); }
        catch (Exception exception) { throw new IllegalStateException("Could not secure account token", exception); }
    }
    private String normalize(String email) { return email.strip().toLowerCase(Locale.ROOT); }
}
