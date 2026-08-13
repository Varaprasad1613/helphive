package com.helphive.api.post;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
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
            @RequestParam(required = false) PostStatus status) {
        return service.findAll(search, category, type, status);
    }

    @GetMapping("/{id}")
    public HelpPostResponse findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/stats")
    public PostStats stats() {
        return service.stats();
    }

    @PostMapping
    public ResponseEntity<HelpPostResponse> create(@Valid @RequestBody HelpPostRequest request) {
        HelpPostResponse created = service.create(request);
        return ResponseEntity.created(URI.create("/api/posts/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public HelpPostResponse update(@PathVariable Long id, @Valid @RequestBody HelpPostRequest request) {
        return service.update(id, request);
    }

    @PatchMapping("/{id}/status")
    public HelpPostResponse updateStatus(@PathVariable Long id, @Valid @RequestBody StatusUpdateRequest request) {
        return service.updateStatus(id, request.status());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
