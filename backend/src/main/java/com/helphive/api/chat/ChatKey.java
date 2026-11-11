package com.helphive.api.chat;

import com.helphive.api.user.AppUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;

@Entity
@Table(name = "chat_keys", uniqueConstraints = @UniqueConstraint(
        name = "uk_chat_key_user", columnNames = "user_id"))
class ChatKey {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    @Column(nullable = false, length = 12000)
    private String publicKey;

    @Column(nullable = false, length = 8000)
    private String encryptedPrivateKey;

    @Column(nullable = false, length = 64)
    private String salt;

    @Column(nullable = false, length = 64)
    private String iv;

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
    AppUser getUser() { return user; }
    void setUser(AppUser user) { this.user = user; }
    String getPublicKey() { return publicKey; }
    void setPublicKey(String publicKey) { this.publicKey = publicKey; }
    String getEncryptedPrivateKey() { return encryptedPrivateKey; }
    void setEncryptedPrivateKey(String encryptedPrivateKey) { this.encryptedPrivateKey = encryptedPrivateKey; }
    String getSalt() { return salt; }
    void setSalt(String salt) { this.salt = salt; }
    String getIv() { return iv; }
    void setIv(String iv) { this.iv = iv; }
    Instant getCreatedAt() { return createdAt; }
    Instant getUpdatedAt() { return updatedAt; }
}
