package com.helphive.api.auth;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;
import com.helphive.api.user.AppUser;
import com.helphive.api.user.UserRole;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private static final Base64.Encoder ENCODER = Base64.getUrlEncoder().withoutPadding();
    private static final Base64.Decoder DECODER = Base64.getUrlDecoder();
    private final ObjectMapper objectMapper;
    private final byte[] secret;
    private final Duration expiration;

    public JwtService(ObjectMapper objectMapper,
                      @Value("${app.security.jwt-secret:local-development-secret-change-before-production-123456}") String secret,
                      @Value("${app.security.jwt-expiration:PT2H}") Duration expiration) {
        if (secret.length() < 32) throw new IllegalArgumentException("JWT secret must be at least 32 characters");
        this.objectMapper = objectMapper;
        this.secret = secret.getBytes(StandardCharsets.UTF_8);
        this.expiration = expiration;
    }

    public String issue(AppUser user) {
        Instant now = Instant.now();
        Map<String, Object> claims = new LinkedHashMap<>();
        claims.put("sub", user.getEmail());
        claims.put("uid", user.getId());
        claims.put("name", user.getName());
        claims.put("role", user.getRole().name());
        claims.put("iat", now.getEpochSecond());
        claims.put("exp", now.plus(expiration).getEpochSecond());
        try {
            String header = encode(objectMapper.writeValueAsBytes(Map.of("alg", "HS256", "typ", "JWT")));
            String payload = encode(objectMapper.writeValueAsBytes(claims));
            String content = header + "." + payload;
            return content + "." + encode(sign(content));
        } catch (Exception exception) {
            throw new IllegalStateException("Could not issue authentication token", exception);
        }
    }

    public AuthenticatedUser parse(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) throw new IllegalArgumentException("Invalid token");
            byte[] expected = sign(parts[0] + "." + parts[1]);
            byte[] supplied = DECODER.decode(parts[2]);
            if (!MessageDigest.isEqual(expected, supplied)) throw new IllegalArgumentException("Invalid signature");
            Map<String, Object> claims = objectMapper.readValue(DECODER.decode(parts[1]), new TypeReference<>() {});
            long expiresAt = ((Number) claims.get("exp")).longValue();
            if (Instant.now().getEpochSecond() >= expiresAt) throw new IllegalArgumentException("Token expired");
            return new AuthenticatedUser(
                    ((Number) claims.get("uid")).longValue(),
                    (String) claims.get("sub"),
                    (String) claims.get("name"),
                    UserRole.valueOf((String) claims.get("role")));
        } catch (Exception exception) {
            throw new IllegalArgumentException("Invalid or expired token", exception);
        }
    }

    private byte[] sign(String content) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(secret, "HmacSHA256"));
        return mac.doFinal(content.getBytes(StandardCharsets.UTF_8));
    }

    private String encode(byte[] value) {
        return ENCODER.encodeToString(value);
    }
}
