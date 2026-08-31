package com.helphive.api.user;

import com.helphive.api.auth.AuthenticatedUser;
import com.helphive.api.auth.UserResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/me")
public class UserController {
    private final UserService service;

    public UserController(UserService service) { this.service = service; }

    @GetMapping
    public UserResponse current(@AuthenticationPrincipal AuthenticatedUser user) { return service.current(user); }

    @PutMapping
    public UserResponse update(@AuthenticationPrincipal AuthenticatedUser user,
                               @Valid @RequestBody ProfileUpdateRequest request) {
        return service.update(user, request);
    }

    @PatchMapping("/password")
    public ResponseEntity<Void> changePassword(@AuthenticationPrincipal AuthenticatedUser user,
                                               @Valid @RequestBody PasswordChangeRequest request) {
        service.changePassword(user, request);
        return ResponseEntity.noContent().build();
    }
}
