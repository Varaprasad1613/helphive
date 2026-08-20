package com.helphive.api.post;

import com.helphive.api.auth.AuthenticatedUser;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/posts")
public class HelpPostController {
    private final HelpPostService service;

    public HelpPostController(HelpPostService service) {
        this.service = service;
    }

    @GetMapping
    public List<HelpPostResponse> findAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) PostType type,
            @RequestParam(required = false) PostStatus status,
            @AuthenticationPrincipal AuthenticatedUser currentUser) {
        return service.findAll(search, category, type, status, currentUser);
    }

    @GetMapping("/{id}")
    public HelpPostResponse findById(@PathVariable Long id, @AuthenticationPrincipal AuthenticatedUser currentUser) {
        return service.findById(id, currentUser);
    }

    @GetMapping("/stats")
    public PostStats stats() {
        return service.stats();
    }

    @PostMapping
    public ResponseEntity<HelpPostResponse> create(@Valid @RequestBody HelpPostRequest request,
                                                   @AuthenticationPrincipal AuthenticatedUser currentUser) {
        HelpPostResponse created = service.create(request, currentUser);
        return ResponseEntity.created(URI.create("/api/posts/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public HelpPostResponse update(@PathVariable Long id, @Valid @RequestBody HelpPostRequest request,
                                   @AuthenticationPrincipal AuthenticatedUser currentUser) {
        return service.update(id, request, currentUser);
    }

    @PatchMapping("/{id}/status")
    public HelpPostResponse updateStatus(@PathVariable Long id, @Valid @RequestBody StatusUpdateRequest request,
                                         @AuthenticationPrincipal AuthenticatedUser currentUser) {
        return service.updateStatus(id, request.status(), currentUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, @AuthenticationPrincipal AuthenticatedUser currentUser) {
        service.delete(id, currentUser);
        return ResponseEntity.noContent().build();
    }
}
