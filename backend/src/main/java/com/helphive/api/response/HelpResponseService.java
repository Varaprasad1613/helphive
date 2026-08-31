package com.helphive.api.response;

import com.helphive.api.auth.AuthenticatedUser;
import com.helphive.api.common.ConflictException;
import com.helphive.api.common.ResourceNotFoundException;
import com.helphive.api.post.HelpPost;
import com.helphive.api.post.HelpPostRepository;
import com.helphive.api.post.PostStatus;
import com.helphive.api.user.AppUser;
import com.helphive.api.user.AppUserRepository;
import java.util.List;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class HelpResponseService {
    private final HelpResponseRepository responses;
    private final HelpPostRepository posts;
    private final AppUserRepository users;

    public HelpResponseService(HelpResponseRepository responses, HelpPostRepository posts, AppUserRepository users) {
        this.responses = responses; this.posts = posts; this.users = users;
    }

    @Transactional
    public HelpResponseView create(Long postId, HelpResponseRequest request, AuthenticatedUser principal) {
        HelpPost post = requirePost(postId);
        if (post.getOwner() == null) throw new ConflictException("Demo posts do not accept responses");
        if (post.getOwner().getId().equals(principal.id())) throw new ConflictException("You cannot respond to your own post");
        if (post.getStatus() == PostStatus.COMPLETED) throw new ConflictException("This post is already completed");
        if (responses.existsByPostIdAndResponderId(postId, principal.id()))
            throw new ConflictException("You have already responded to this post");
        AppUser responder = users.findById(principal.id())
                .orElseThrow(() -> new ResourceNotFoundException("Your account was not found"));
        HelpResponse response = new HelpResponse();
        response.setPost(post); response.setResponder(responder); response.setMessage(request.message().strip());
        return HelpResponseView.from(responses.save(response), principal.id());
    }

    public List<HelpResponseView> sent(AuthenticatedUser principal) {
        return responses.findByResponderIdOrderByCreatedAtDesc(principal.id()).stream()
                .map(response -> HelpResponseView.from(response, principal.id())).toList();
    }

    public List<HelpResponseView> received(AuthenticatedUser principal) {
        return responses.findByPostOwnerIdOrderByCreatedAtDesc(principal.id()).stream()
                .map(response -> HelpResponseView.from(response, principal.id())).toList();
    }

    @Transactional
    public HelpResponseView updateStatus(Long id, ResponseStatus status, AuthenticatedUser principal) {
        if (status == ResponseStatus.PENDING) throw new ConflictException("A response cannot be returned to pending");
        HelpResponse response = requireResponse(id);
        if (response.getPost().getOwner() == null || !response.getPost().getOwner().getId().equals(principal.id()))
            throw new AccessDeniedException("Only the post owner can accept or decline responses");
        if (response.getStatus() != ResponseStatus.PENDING)
            throw new ConflictException("This response has already been reviewed");
        response.setStatus(status);
        if (status == ResponseStatus.ACCEPTED) {
            response.getPost().setStatus(PostStatus.IN_PROGRESS);
            responses.findByPostId(response.getPost().getId()).stream()
                    .filter(other -> !other.getId().equals(id) && other.getStatus() == ResponseStatus.PENDING)
                    .forEach(other -> other.setStatus(ResponseStatus.DECLINED));
        }
        return HelpResponseView.from(responses.save(response), principal.id());
    }

    @Transactional
    public void withdraw(Long id, AuthenticatedUser principal) {
        HelpResponse response = requireResponse(id);
        if (!response.getResponder().getId().equals(principal.id()))
            throw new AccessDeniedException("Only the responder can withdraw this response");
        if (response.getStatus() != ResponseStatus.PENDING)
            throw new ConflictException("Only a pending response can be withdrawn");
        responses.delete(response);
    }

    private HelpPost requirePost(Long id) {
        return posts.findById(id).orElseThrow(() -> new ResourceNotFoundException("Help post " + id + " was not found"));
    }
    private HelpResponse requireResponse(Long id) {
        return responses.findById(id).orElseThrow(() -> new ResourceNotFoundException("Response " + id + " was not found"));
    }
}
