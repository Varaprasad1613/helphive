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
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class HelpResponseService {
    private final HelpResponseRepository responses;
    private final HelpPostRepository posts;
    private final AppUserRepository users;
    private final ApplicationEventPublisher events;

    public HelpResponseService(HelpResponseRepository responses, HelpPostRepository posts, AppUserRepository users,
                               ApplicationEventPublisher events) {
        this.responses = responses; this.posts = posts; this.users = users; this.events = events;
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
        HelpResponse saved = responses.save(response);
        events.publishEvent(new ResponseNotificationEvent(
                saved.getId(), post.getOwner().getEmail(), ResponseNotificationType.NEW_RESPONSE));
        return HelpResponseView.from(saved, principal.id());
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
        List<HelpResponse> automaticallyDeclined = List.of();
        if (status == ResponseStatus.ACCEPTED) {
            response.getPost().setStatus(PostStatus.IN_PROGRESS);
            automaticallyDeclined = responses.findByPostId(response.getPost().getId()).stream()
                    .filter(other -> !other.getId().equals(id) && other.getStatus() == ResponseStatus.PENDING)
                    .peek(other -> other.setStatus(ResponseStatus.DECLINED))
                    .toList();
            responses.saveAll(automaticallyDeclined);
        }
        HelpResponse saved = responses.save(response);
        events.publishEvent(new ResponseNotificationEvent(
                saved.getId(), saved.getResponder().getEmail(), notificationType(status)));
        automaticallyDeclined.forEach(declined -> events.publishEvent(new ResponseNotificationEvent(
                declined.getId(), declined.getResponder().getEmail(), ResponseNotificationType.RESPONSE_DECLINED)));
        return HelpResponseView.from(saved, principal.id());
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

    private ResponseNotificationType notificationType(ResponseStatus status) {
        return switch (status) {
            case ACCEPTED -> ResponseNotificationType.RESPONSE_ACCEPTED;
            case DECLINED -> ResponseNotificationType.RESPONSE_DECLINED;
            case PENDING -> throw new ConflictException("A response cannot be returned to pending");
        };
    }
}
