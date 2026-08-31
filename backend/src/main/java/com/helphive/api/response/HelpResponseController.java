package com.helphive.api.response;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelpResponseController {
    private final HelpResponseService service;
    public HelpResponseController(HelpResponseService service) { this.service = service; }

    @PostMapping("/posts/{postId}/responses")
    public ResponseEntity<HelpResponseView> create(@PathVariable Long postId,
            @Valid @RequestBody HelpResponseRequest request, @AuthenticationPrincipal AuthenticatedUser user) {
        HelpResponseView created = service.create(postId, request, user);
        return ResponseEntity.created(URI.create("/api/responses/" + created.id())).body(created);
    }
    @GetMapping("/responses/mine")
    public List<HelpResponseView> sent(@AuthenticationPrincipal AuthenticatedUser user) { return service.sent(user); }
    @GetMapping("/responses/received")
    public List<HelpResponseView> received(@AuthenticationPrincipal AuthenticatedUser user) { return service.received(user); }
    @PatchMapping("/responses/{id}/status")
    public HelpResponseView update(@PathVariable Long id, @Valid @RequestBody ResponseStatusRequest request,
                                   @AuthenticationPrincipal AuthenticatedUser user) {
        return service.updateStatus(id, request.status(), user);
    }
    @DeleteMapping("/responses/{id}")
    public ResponseEntity<Void> withdraw(@PathVariable Long id, @AuthenticationPrincipal AuthenticatedUser user) {
        service.withdraw(id, user); return ResponseEntity.noContent().build();
    }
}
