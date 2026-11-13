package com.helphive.api.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CsrfController {
    @GetMapping("/api/csrf")
    ResponseEntity<Void> csrfToken() {
        return ResponseEntity.noContent().build();
    }
}
