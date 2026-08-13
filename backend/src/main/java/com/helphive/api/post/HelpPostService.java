package com.helphive.api.post;

import com.helphive.api.common.ResourceNotFoundException;
import java.util.List;
import java.util.Locale;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class HelpPostService {
    private final HelpPostRepository repository;

    public HelpPostService(HelpPostRepository repository) {
        this.repository = repository;
    }

    public List<HelpPostResponse> findAll(String search, Category category, PostType type, PostStatus status) {
        String query = search == null ? "" : search.strip().toLowerCase(Locale.ROOT);
        return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt")).stream()
                .filter(post -> query.isBlank()
                        || post.getTitle().toLowerCase(Locale.ROOT).contains(query)
                        || post.getDescription().toLowerCase(Locale.ROOT).contains(query)
                        || post.getLocation().toLowerCase(Locale.ROOT).contains(query))
                .filter(post -> category == null || post.getCategory() == category)
                .filter(post -> type == null || post.getType() == type)
                .filter(post -> status == null || post.getStatus() == status)
                .map(HelpPostResponse::from)
                .toList();
    }

    public HelpPostResponse findById(Long id) {
        return HelpPostResponse.from(requirePost(id));
    }

    @Transactional
    public HelpPostResponse create(HelpPostRequest request) {
        HelpPost post = new HelpPost();
        apply(post, request);
        return HelpPostResponse.from(repository.save(post));
    }

    @Transactional
    public HelpPostResponse update(Long id, HelpPostRequest request) {
        HelpPost post = requirePost(id);
        apply(post, request);
        return HelpPostResponse.from(repository.save(post));
    }

    @Transactional
    public HelpPostResponse updateStatus(Long id, PostStatus status) {
        HelpPost post = requirePost(id);
        post.setStatus(status);
        return HelpPostResponse.from(repository.save(post));
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(requirePost(id));
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

    private void apply(HelpPost post, HelpPostRequest request) {
        post.setTitle(request.title().strip());
        post.setDescription(request.description().strip());
        post.setAuthorName(request.authorName().strip());
        post.setContact(request.contact().strip().toLowerCase(Locale.ROOT));
        post.setLocation(request.location().strip());
        post.setCategory(request.category());
        post.setType(request.type());
    }
}
