package com.helphive.api.post;

import com.helphive.api.auth.AuthenticatedUser;
import com.helphive.api.common.ConflictException;
import com.helphive.api.common.ResourceNotFoundException;
import com.helphive.api.response.HelpResponseRepository;
import com.helphive.api.response.ResponseStatus;
import com.helphive.api.user.AppUser;
import com.helphive.api.user.AppUserRepository;
import java.util.List;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class PostDiscussionService {
    private final HelpPostRepository posts;
    private final PostProgressUpdateRepository updates;
    private final HelpResponseRepository responses;
    private final AppUserRepository users;

    public PostDiscussionService(HelpPostRepository posts, PostProgressUpdateRepository updates,
                                 HelpResponseRepository responses, AppUserRepository users) {
        this.posts = posts;
        this.updates = updates;
        this.responses = responses;
        this.users = users;
    }

    public PostDiscussionView find(Long postId, AuthenticatedUser currentUser) {
        HelpPost post = requirePost(postId);
        boolean commentsOpen = post.getStatus() == PostStatus.IN_PROGRESS;
        boolean canPostNote = commentsOpen
                && responses.existsByPostIdAndResponderIdAndStatus(postId, currentUser.id(), ResponseStatus.ACCEPTED);
        List<PostProgressUpdateView> entries = updates.findByPostIdOrderByCreatedAtAscIdAsc(postId).stream()
                .map(PostProgressUpdateView::from)
                .toList();
        return new PostDiscussionView(entries, commentsOpen, canPostNote);
    }

    @Transactional
    public PostProgressUpdateView create(Long postId, PostProgressUpdateRequest request, AuthenticatedUser principal) {
        HelpPost post = requirePost(postId);
        if (post.getStatus() != PostStatus.IN_PROGRESS) {
            throw new ConflictException("Comments and notes can only be added while this post is in progress");
        }

        PostProgressUpdate parent = null;
        if (request.type() == PostProgressUpdateType.NOTE) {
            if (request.parentId() != null) {
                throw new ConflictException("Progress notes cannot be replies");
            }
            if (!responses.existsByPostIdAndResponderIdAndStatus(
                    postId, principal.id(), ResponseStatus.ACCEPTED)) {
                throw new AccessDeniedException("Only the accepted helper can post progress notes");
            }
        } else if (request.parentId() != null) {
            parent = updates.findById(request.parentId())
                    .orElseThrow(() -> new ResourceNotFoundException("Progress note was not found"));
            if (!parent.getPost().getId().equals(postId) || parent.getType() != PostProgressUpdateType.NOTE) {
                throw new ConflictException("Comments can only reply to a progress note on this post");
            }
        }

        AppUser author = users.findById(principal.id())
                .orElseThrow(() -> new ResourceNotFoundException("Your account was not found"));
        PostProgressUpdate update = new PostProgressUpdate();
        update.setPost(post);
        update.setAuthor(author);
        update.setParent(parent);
        update.setType(request.type());
        update.setContent(request.content().strip());
        return PostProgressUpdateView.from(updates.save(update));
    }

    private HelpPost requirePost(Long id) {
        return posts.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Help post " + id + " was not found"));
    }
}
