package com.helphive.api.post;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface HelpPostRepository extends JpaRepository<HelpPost, Long>, JpaSpecificationExecutor<HelpPost> {
    long countByStatus(PostStatus status);
    long countByType(PostType type);
    List<HelpPost> findByOwnerId(Long ownerId);
    List<HelpPost> findByOwnerIdOrderByCreatedAtDesc(Long ownerId);
    long countByOwnerId(Long ownerId);
}
