package com.helphive.api.chat;

import com.helphive.api.auth.AuthenticatedUser;
import jakarta.validation.Valid;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService service;

    public ChatController(ChatService service) {
        this.service = service;
    }

    @GetMapping("/keys/me")
    public ChatKeyView myKey(@AuthenticationPrincipal AuthenticatedUser principal) {
        return service.myKey(principal);
    }

    @PutMapping("/keys/me")
    public ChatKeyView saveKey(@Valid @RequestBody ChatKeyRequest request,
                               @AuthenticationPrincipal AuthenticatedUser principal) {
        return service.saveKey(request, principal);
    }

    @GetMapping("/keys/{userId}")
    public ChatKeyView publicKey(@PathVariable Long userId,
                                 @AuthenticationPrincipal AuthenticatedUser principal) {
        return service.publicKey(userId, principal);
    }

    @GetMapping("/requests")
    public List<ChatRequestView> myRequests(@AuthenticationPrincipal AuthenticatedUser principal) {
        return service.myRequests(principal);
    }

    @PostMapping("/requests")
    public ChatRequestView createRequest(@Valid @RequestBody ChatRequestCreate request,
                                         @AuthenticationPrincipal AuthenticatedUser principal) {
        return service.createRequest(request, principal);
    }

    @PatchMapping("/requests/{id}")
    public ChatRequestView decide(@PathVariable Long id, @Valid @RequestBody ChatDecisionRequest decision,
                                  @AuthenticationPrincipal AuthenticatedUser principal) {
        return service.decide(id, decision, principal);
    }

    @DeleteMapping("/requests/{id}")
    public ChatRequestView cancel(@PathVariable Long id, @AuthenticationPrincipal AuthenticatedUser principal) {
        return service.cancel(id, principal);
    }

    @GetMapping("/conversations")
    public List<ChatConversationView> conversations(
            @RequestParam(defaultValue = "false") boolean archived,
            @AuthenticationPrincipal AuthenticatedUser principal) {
        return service.conversations(principal, archived);
    }

    @GetMapping("/conversations/{id}/messages")
    public List<ChatMessageView> messages(@PathVariable Long id,
                                          @AuthenticationPrincipal AuthenticatedUser principal) {
        return service.messages(id, principal);
    }

    @PostMapping("/conversations/{id}/read")
    public ResponseEntity<Void> markRead(@PathVariable Long id, @Valid @RequestBody ChatReadRequest request,
                                         @AuthenticationPrincipal AuthenticatedUser principal) {
        service.markRead(id, request, principal);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/conversations/{id}/messages")
    public ChatMessageView send(@PathVariable Long id, @Valid @RequestBody ChatMessageCreate request,
                                @AuthenticationPrincipal AuthenticatedUser principal) {
        return service.send(id, request, principal);
    }

    @GetMapping("/notifications")
    public ChatNotificationSummary notifications(@AuthenticationPrincipal AuthenticatedUser principal) {
        return service.notifications(principal);
    }

    @PatchMapping("/conversations/{id}/archive")
    public void archive(@PathVariable Long id, @RequestBody ChatArchiveRequest request,
                        @AuthenticationPrincipal AuthenticatedUser principal) {
        service.archive(id, request, principal);
    }

    @GetMapping("/blocks")
    public List<ChatBlockView> blockedUsers(@AuthenticationPrincipal AuthenticatedUser principal) {
        return service.blockedUsers(principal);
    }

    @PostMapping("/blocks/{userId}")
    public void block(@PathVariable Long userId, @AuthenticationPrincipal AuthenticatedUser principal) {
        service.block(userId, principal);
    }

    @DeleteMapping("/blocks/{userId}")
    public ResponseEntity<Void> unblock(@PathVariable Long userId, @AuthenticationPrincipal AuthenticatedUser principal) {
        service.unblock(userId, principal);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/conversations/{id}/report")
    public void report(@PathVariable Long id, @Valid @RequestBody ChatReportRequest request,
                       @AuthenticationPrincipal AuthenticatedUser principal) {
        service.report(id, request, principal);
    }
}
