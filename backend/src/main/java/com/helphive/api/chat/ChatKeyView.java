package com.helphive.api.chat;

public record ChatKeyView(
        Long userId,
        String publicKey,
        String encryptedPrivateKey,
        String salt,
        String iv
) {
    static ChatKeyView from(ChatKey key) {
        return new ChatKeyView(key.getUser().getId(), key.getPublicKey(),
                key.getEncryptedPrivateKey(), key.getSalt(), key.getIv());
    }

    static ChatKeyView publicOnly(ChatKey key) {
        return new ChatKeyView(key.getUser().getId(), key.getPublicKey(), null, null, null);
    }
}
