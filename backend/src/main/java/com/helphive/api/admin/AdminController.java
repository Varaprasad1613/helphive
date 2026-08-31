package com.helphive.api.admin;

import com.helphive.api.auth.AuthenticatedUser;
import com.helphive.api.post.HelpPostResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService service;
    public AdminController(AdminService service) { this.service = service; }
    @GetMapping("/overview") public AdminOverview overview() { return service.overview(); }
    @GetMapping("/users") public List<AdminUserView> users() { return service.users(); }
    @GetMapping("/posts") public List<HelpPostResponse> posts(@AuthenticationPrincipal AuthenticatedUser user) { return service.posts(user); }
    @PatchMapping("/users/{id}/role")
    public AdminUserView role(@PathVariable Long id, @Valid @RequestBody RoleUpdateRequest request,
                              @AuthenticationPrincipal AuthenticatedUser admin) {
        return service.updateRole(id, request.role(), admin);
    }
    @PatchMapping("/users/{id}/status")
    public AdminUserView status(@PathVariable Long id, @Valid @RequestBody AccountStatusRequest request,
                                @AuthenticationPrincipal AuthenticatedUser admin) {
        return service.updateStatus(id, request.active(), admin);
    }
    @DeleteMapping("/posts/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) { service.deletePost(id); return ResponseEntity.noContent().build(); }
}
