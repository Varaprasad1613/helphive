package com.helphive.api.auth;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountTokenRepository extends JpaRepository<AccountToken, Long> {
    Optional<AccountToken> findByTokenHashAndType(String tokenHash, AccountTokenType type);
    void deleteByUserIdAndType(Long userId, AccountTokenType type);
}
