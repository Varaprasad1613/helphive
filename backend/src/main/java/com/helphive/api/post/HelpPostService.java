package com.helphive.api.post;

import com.helphive.api.auth.AuthenticatedUser;
import com.helphive.api.common.ResourceNotFoundException;
import com.helphive.api.user.AppUser;
import com.helphive.api.user.AppUserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional(readOnly = true)
public class HelpPostService {
    static final int DEFAULT_PAGE_SIZE = 9;
    static final int MAX_PAGE_SIZE = 50;

    private final HelpPostRepository repository;
    private final AppUserRepository userRepository;

    public HelpPostService(HelpPostRepository repository, AppUserRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public HelpPostPageResponse findAll(String search, Category category, PostType type, PostStatus status,
                                        int page, int size, AuthenticatedUser currentUser) {
        if (page < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Page index must not be negative");
        }
        if (size < 1 || size > MAX_PAGE_SIZE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Page size must be between 1 and " + MAX_PAGE_SIZE);
        }

        String query = search == null ? "" : search.strip().toLowerCase(Locale.ROOT);
        Long currentUserId = currentUser == null ? null : currentUser.id();
        Specification<HelpPost> specification = (root, criteria, builder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (!query.isBlank()) {
                String pattern = "%" + query.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_") + "%";
                predicates.add(builder.or(
                        builder.like(builder.lower(root.get("title")), pattern, '\\'),
                        builder.like(builder.lower(root.get("description")), pattern, '\\'),
                        builder.like(builder.lower(root.get("location")), pattern, '\\')));
            }
            if (category != null) predicates.add(builder.equal(root.get("category"), category));
            if (type != null) predicates.add(builder.equal(root.get("type"), type));
            if (status != null) predicates.add(builder.equal(root.get("status"), status));
            return builder.and(predicates.toArray(Predicate[]::new));
        };
        Page<HelpPostResponse> results = repository.findAll(
                        specification,
                        PageRequest.of(page, size, Sort.by(
                                Sort.Order.desc("createdAt"), Sort.Order.desc("id"))))
                .map(post -> HelpPostResponse.from(post, currentUserId));
        return HelpPostPageResponse.from(results);
    }

    public HelpPostResponse findById(Long id, AuthenticatedUser currentUser) {
        return HelpPostResponse.from(requirePost(id), currentUser == null ? null : currentUser.id());
    }

    public List<HelpPostResponse> findMine(AuthenticatedUser currentUser) {
        return repository.findByOwnerIdOrderByCreatedAtDesc(currentUser.id()).stream()
                .map(post -> HelpPostResponse.from(post, currentUser.id()))
                .toList();
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
