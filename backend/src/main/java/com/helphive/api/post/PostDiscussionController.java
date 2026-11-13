package com.helphive.api.post;

import com.helphive.api.auth.AuthenticatedUser;
import jakarta.validation.Valid;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/posts/{postId}/updates")
public class PostDiscussionController {
    private final PostDiscussionService service;

    public PostDiscussionController(PostDiscussionService service) {
        this.service = service;
    }

    @GetMapping
    public PostDiscussionView find(@PathVariable Long postId, @AuthenticationPrincipal AuthenticatedUser user) {
        return service.find(postId, user);
    }

    @PostMapping
    public ResponseEntity<PostProgressUpdateView> create(
            @PathVariable Long postId,
            @Valid @RequestBody PostProgressUpdateRequest request,
            @AuthenticationPrincipal AuthenticatedUser user) {
        PostProgressUpdateView created = service.create(postId, request, user);
        return ResponseEntity.created(URI.create("/api/posts/" + postId + "/updates/" + created.id())).body(created);
    }
}
