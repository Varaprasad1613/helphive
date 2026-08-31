package com.helphive.api.admin;

import com.helphive.api.auth.AuthenticatedUser;
import com.helphive.api.common.ConflictException;
import com.helphive.api.common.ResourceNotFoundException;
import com.helphive.api.post.HelpPostRepository;
import com.helphive.api.post.HelpPostResponse;
import com.helphive.api.response.HelpResponseRepository;
import com.helphive.api.response.ResponseStatus;
import com.helphive.api.user.AppUser;
import com.helphive.api.user.AppUserRepository;
import com.helphive.api.user.UserRole;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AdminService {
    private final AppUserRepository users;
    private final HelpPostRepository posts;
    private final HelpResponseRepository responses;
    public AdminService(AppUserRepository users, HelpPostRepository posts, HelpResponseRepository responses) {
        this.users = users; this.posts = posts; this.responses = responses;
    }
    public AdminOverview overview() {
        return new AdminOverview(users.count(), users.countByActiveTrue(), posts.count(), responses.count(),
                responses.countByStatus(ResponseStatus.PENDING));
    }
    public List<AdminUserView> users() {
        return users.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
                .map(user -> AdminUserView.from(user, posts.countByOwnerId(user.getId()))).toList();
    }
    public List<HelpPostResponse> posts(AuthenticatedUser admin) {
        return posts.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
                .map(post -> HelpPostResponse.from(post, admin.id())).toList();
    }
    @Transactional
    public AdminUserView updateRole(Long id, UserRole role, AuthenticatedUser admin) {
        if (id.equals(admin.id()) && role != UserRole.ADMIN)
            throw new ConflictException("You cannot remove your own admin role");
        AppUser user = requireUser(id); user.setRole(role);
        return AdminUserView.from(users.save(user), posts.countByOwnerId(id));
    }
    @Transactional
    public AdminUserView updateStatus(Long id, boolean active, AuthenticatedUser admin) {
        if (id.equals(admin.id()) && !active) throw new ConflictException("You cannot suspend your own account");
        AppUser user = requireUser(id); user.setActive(active);
        return AdminUserView.from(users.save(user), posts.countByOwnerId(id));
    }
    @Transactional
    public void deletePost(Long id) {
        if (!posts.existsById(id)) throw new ResourceNotFoundException("Help post " + id + " was not found");
        posts.deleteById(id);
    }
    private AppUser requireUser(Long id) {
        return users.findById(id).orElseThrow(() -> new ResourceNotFoundException("User " + id + " was not found"));
    }
}
