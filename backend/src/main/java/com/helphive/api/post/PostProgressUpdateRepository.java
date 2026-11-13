package com.helphive.api.post;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostProgressUpdateRepository extends JpaRepository<PostProgressUpdate, Long> {
    List<PostProgressUpdate> findByPostIdOrderByCreatedAtAscIdAsc(Long postId);
}
