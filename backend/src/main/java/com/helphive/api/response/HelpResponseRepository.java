package com.helphive.api.response;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HelpResponseRepository extends JpaRepository<HelpResponse, Long> {
    boolean existsByPostIdAndResponderId(Long postId, Long responderId);
    List<HelpResponse> findByResponderIdOrderByCreatedAtDesc(Long responderId);
    List<HelpResponse> findByPostOwnerIdOrderByCreatedAtDesc(Long ownerId);
    List<HelpResponse> findByPostId(Long postId);
}
