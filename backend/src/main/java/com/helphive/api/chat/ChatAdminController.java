package com.helphive.api.chat;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/chat-reports")
public class ChatAdminController {
    private final ChatService service;

    public ChatAdminController(ChatService service) {
        this.service = service;
    }

    @GetMapping
    public List<ChatReportView> reports() {
        return service.reports();
    }

    @PatchMapping("/{id}")
    public ChatReportView update(@PathVariable Long id, @jakarta.validation.Valid @RequestBody ChatReportStatusRequest request) {
        return service.updateReport(id, request.status());
    }
}
