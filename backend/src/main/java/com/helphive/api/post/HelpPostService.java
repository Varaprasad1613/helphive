package com.helphive.api.post;

import com.helphive.api.auth.AuthenticatedUser;
import com.helphive.api.common.ResourceNotFoundException;
import com.helphive.api.user.AppUser;
import com.helphive.api.user.AppUserRepository;
import java.util.List;
import java.util.Locale;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class HelpPostService {
    private final HelpPostRepository repository;
    private final AppUserRepository userRepository;

    public HelpPostService(HelpPostRepository repository, AppUserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public List<HelpPostResponse> findAll(String search, Category category, PostType type, PostStatus status,
                                          AuthenticatedUser currentUser) {
        String query = search == null ? "" : search.strip().toLowerCase(Locale.ROOT);
        Long currentUserId = currentUser == null ? null : currentUser.id();
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
                .filter(post -> query.isBlank()
                        || post.getTitle().toLowerCase(Locale.ROOT).contains(query)
                        || post.getDescription().toLowerCase(Locale.ROOT).contains(query)
                        || post.getLocation().toLowerCase(Locale.ROOT).contains(query))
                .filter(post -> category == null || post.getCategory() == category)
                .filter(post -> type == null || post.getType() == type)
                .filter(post -> status == null || post.getStatus() == status)
                .map(post -> HelpPostResponse.from(post, currentUserId))
                .toList();
    }

    public HelpPostResponse findById(Long id, AuthenticatedUser currentUser) {
        return HelpPostResponse.from(requirePost(id), currentUser == null ? null : currentUser.id());
    }

    @Transactional
    public HelpPostResponse create(HelpPostRequest request, AuthenticatedUser currentUser) {
        AppUser owner = requireUser(currentUser.id());
        HelpPost post = new HelpPost();
        apply(post, request);
        post.setOwner(owner);
        post.setAuthorName(owner.getName());
        post.setContact(owner.getEmail());
        return HelpPostResponse.from(repository.save(post), owner.getId());
    }

    @Transactional
    public HelpPostResponse update(Long id, HelpPostRequest request, AuthenticatedUser currentUser) {
        HelpPost post = requirePost(id);
        requireOwner(post, currentUser);
        apply(post, request);
        return HelpPostResponse.from(repository.save(post), currentUser.id());
    }

    @Transactional
    public HelpPostResponse updateStatus(Long id, PostStatus status, AuthenticatedUser currentUser) {
        HelpPost post = requirePost(id);
        requireOwner(post, currentUser);
        post.setStatus(status);
        return HelpPostResponse.from(repository.save(post), currentUser.id());
    }

    @Transactional
    public void delete(Long id, AuthenticatedUser currentUser) {
        HelpPost post = requirePost(id);
        requireOwner(post, currentUser);
        repository.delete(post);
    }

    public PostStats stats() {
        return new PostStats(
                repository.count(),
                repository.countByStatus(PostStatus.OPEN),
                repository.countByType(PostType.OFFER),
                repository.countByType(PostType.REQUEST),
                repository.countByStatus(PostStatus.COMPLETED));
    }

    private HelpPost requirePost(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Help post " + id + " was not found"));
    }

    private AppUser requireUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Your account was not found"));
    }

    private void requireOwner(HelpPost post, AuthenticatedUser currentUser) {
        if (post.getOwner() == null || !post.getOwner().getId().equals(currentUser.id())) {
            throw new AccessDeniedException("Only the post owner can make this change");
        }
    }

    private void apply(HelpPost post, HelpPostRequest request) {
        post.setTitle(request.title().strip());
        post.setDescription(request.description().strip());
        post.setLocation(request.location().strip());
        post.setCategory(request.category());
        post.setType(request.type());
    }
}
