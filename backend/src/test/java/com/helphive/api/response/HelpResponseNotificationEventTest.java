package com.helphive.api.response;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.helphive.api.auth.AuthenticatedUser;
import com.helphive.api.post.HelpPost;
import com.helphive.api.post.HelpPostRepository;
import com.helphive.api.user.AppUser;
import com.helphive.api.user.AppUserRepository;
import com.helphive.api.user.UserRole;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationEventPublisher;

class HelpResponseNotificationEventTest {
    private final HelpResponseRepository responses = mock(HelpResponseRepository.class);
    private final HelpPostRepository posts = mock(HelpPostRepository.class);
    private final AppUserRepository users = mock(AppUserRepository.class);
    private final ApplicationEventPublisher events = mock(ApplicationEventPublisher.class);
    private final HelpResponseService service = new HelpResponseService(responses, posts, users, events);

    @Test
    void creatingResponseNotifiesPostOwner() {
        AppUser owner = user(1L, "owner@example.com");
        AppUser responder = user(2L, "responder@example.com");
        HelpPost post = mock(HelpPost.class);
        when(post.getOwner()).thenReturn(owner);
        when(post.getId()).thenReturn(10L);
        when(post.getTitle()).thenReturn("Post");
        when(post.getAuthorName()).thenReturn("Owner");
        HelpResponse saved = response(22L, post, responder);

        when(posts.findById(10L)).thenReturn(Optional.of(post));
        when(responses.existsByPostIdAndResponderId(10L, 2L)).thenReturn(false);
        when(users.findById(2L)).thenReturn(Optional.of(responder));
        when(responses.save(any(HelpResponse.class))).thenReturn(saved);

        service.create(10L, new HelpResponseRequest("I can help with this request."),
                new AuthenticatedUser(2L, "responder@example.com", "Responder", UserRole.MEMBER));

        verify(events).publishEvent(new ResponseNotificationEvent(
                22L, "owner@example.com", ResponseNotificationType.NEW_RESPONSE));
    }

    @Test
    void acceptingResponseNotifiesAcceptedResponderAndAutomaticallyDeclinedResponders() {
        AppUser owner = user(1L, "owner@example.com");
        AppUser acceptedResponder = user(2L, "accepted@example.com");
        AppUser declinedResponder = user(3L, "declined@example.com");
        HelpPost post = mock(HelpPost.class);
        when(post.getOwner()).thenReturn(owner);
        when(post.getId()).thenReturn(10L);
        when(post.getTitle()).thenReturn("Post");
        when(post.getAuthorName()).thenReturn("Owner");

        HelpResponse accepted = response(20L, post, acceptedResponder);
        HelpResponse declined = response(21L, post, declinedResponder);
        when(responses.findById(20L)).thenReturn(Optional.of(accepted));
        when(responses.findByPostId(10L)).thenReturn(List.of(accepted, declined));
        when(responses.save(any(HelpResponse.class))).thenAnswer(invocation -> invocation.getArgument(0));

        service.updateStatus(20L, ResponseStatus.ACCEPTED,
                new AuthenticatedUser(1L, "owner@example.com", "Owner", UserRole.MEMBER));

        verify(events).publishEvent(new ResponseNotificationEvent(
                20L, "accepted@example.com", ResponseNotificationType.RESPONSE_ACCEPTED));
        verify(events).publishEvent(new ResponseNotificationEvent(
                21L, "declined@example.com", ResponseNotificationType.RESPONSE_DECLINED));
        verify(responses).saveAll(List.of(declined));
    }

    @Test
    void decliningResponseNotifiesResponder() {
        AppUser owner = user(1L, "owner@example.com");
        AppUser responder = user(2L, "responder@example.com");
        HelpPost post = mock(HelpPost.class);
        when(post.getOwner()).thenReturn(owner);
        HelpResponse declined = response(23L, post, responder);
        when(responses.findById(23L)).thenReturn(Optional.of(declined));
        when(responses.save(declined)).thenReturn(declined);

        service.updateStatus(23L, ResponseStatus.DECLINED,
                new AuthenticatedUser(1L, "owner@example.com", "Owner", UserRole.MEMBER));

        verify(events).publishEvent(new ResponseNotificationEvent(
                23L, "responder@example.com", ResponseNotificationType.RESPONSE_DECLINED));
    }

    private AppUser user(Long id, String email) {
        AppUser user = mock(AppUser.class);
        when(user.getId()).thenReturn(id);
        when(user.getEmail()).thenReturn(email);
        when(user.getName()).thenReturn(email);
        return user;
    }

    private HelpResponse response(Long id, HelpPost post, AppUser responder) {
        HelpResponse response = mock(HelpResponse.class);
        when(response.getId()).thenReturn(id);
        when(response.getPost()).thenReturn(post);
        when(response.getResponder()).thenReturn(responder);
        when(response.getStatus()).thenReturn(ResponseStatus.PENDING);
        return response;
    }
}
