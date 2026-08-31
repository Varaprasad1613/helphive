package com.helphive.api.post;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HelpPostRepository extends JpaRepository<HelpPost, Long> {
    long countByStatus(PostStatus status);
    long countByType(PostType type);
    List<HelpPost> findByOwnerId(Long ownerId);
}
