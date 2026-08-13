package com.helphive.api.post;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HelpPostRepository extends JpaRepository<HelpPost, Long> {
    long countByStatus(PostStatus status);
    long countByType(PostType type);
}
