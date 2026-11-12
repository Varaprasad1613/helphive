package com.helphive.api.chat;

import com.helphive.api.auth.AuthenticatedUser;
import com.helphive.api.common.ConflictException;
import com.helphive.api.common.ResourceNotFoundException;
import com.helphive.api.post.HelpPost;
import com.helphive.api.post.HelpPostRepository;
import com.helphive.api.response.HelpResponse;
import com.helphive.api.response.HelpResponseRepository;
import com.helphive.api.user.AppUser;
import com.helphive.api.user.AppUserRepository;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ChatService {
    private final ChatKeyRepository keys;
    private final ChatRequestRepository requests;
    private final ChatConversationRepository conversations;
    private final ChatMessageRepository messages;
    private final ChatBlockRepository blocks;
    private final ChatReportRepository reports;
    private final AppUserRepository users;
    private final HelpPostRepository posts;
    private final HelpResponseRepository responses;

    public ChatService(ChatKeyRepository keys, ChatRequestRepository requests,
                       ChatConversationRepository conversations, ChatMessageRepository messages,
                       ChatBlockRepository blocks, ChatReportRepository reports,
                       AppUserRepository users, HelpPostRepository posts, HelpResponseRepository responses) {
        this.keys = keys;
        this.requests = requests;
        this.conversations = conversations;
        this.messages = messages;
        this.blocks = blocks;
        this.reports = reports;
        this.users = users;
        this.posts = posts;
        this.responses = responses;
    }

    public ChatKeyView myKey(AuthenticatedUser principal) {
        return keys.findByUserId(principal.id()).map(ChatKeyView::from).orElse(null);
    }

    public ChatKeyView publicKey(Long userId, AuthenticatedUser principal) {
        if (userId.equals(principal.id())) {
            throw new ConflictException("Use the chat key setup endpoint for your own key");
        }
        return keys.findByUserId(userId).map(ChatKeyView::publicOnly)
                .orElseThrow(() -> new ConflictException("This member has not set up secure messaging"));
    }

    @Transactional
    public ChatKeyView saveKey(ChatKeyRequest request, AuthenticatedUser principal) {
        if (keys.findByUserId(principal.id()).isPresent()) {
            throw new ConflictException("Secure messaging keys are already set up and cannot be replaced");
        }
        ChatKey key = new ChatKey();
        key.setUser(requireUser(principal.id()));
        key.setPublicKey(request.publicKey());
        key.setEncryptedPrivateKey(request.encryptedPrivateKey());
        key.setSalt(request.salt());
        key.setIv(request.iv());
        return ChatKeyView.from(keys.save(key));
    }

    @Transactional
    public ChatRequestView createRequest(ChatRequestCreate input, AuthenticatedUser principal) {
        Long requesterId = principal.id();
        if (input.recipientId().equals(requesterId)) {
            throw new ConflictException("You cannot request a chat with yourself");
        }
        if (input.postId() == null && input.responseId() == null) {
            throw new ConflictException("A chat request must be connected to a community post or response");
        }
        if (input.postId() != null && input.responseId() != null) {
            throw new ConflictException("Choose a post or a response as the chat context, not both");
        }

        AppUser requester = requireUser(requesterId);
        AppUser recipient = requireUser(input.recipientId());
        requireKey(requesterId);
        requireKey(input.recipientId());
        requireNotBlocked(requesterId, input.recipientId());
        if (requests.countByRequesterIdAndCreatedAtAfter(requesterId, Instant.now().minus(Duration.ofDays(1))) >= 10) {
            throw new ConflictException("You have reached the daily limit for chat requests");
        }
        if (requests.existsByRequesterIdAndRecipientIdAndStatus(
                requesterId, input.recipientId(), ChatRequestStatus.PENDING)
                || requests.existsByRequesterIdAndRecipientIdAndStatus(
                input.recipientId(), requesterId, ChatRequestStatus.PENDING)) {
            throw new ConflictException("A chat request is already waiting for a response");
        }
        if (hasConversation(requesterId, input.recipientId())) {
            throw new ConflictException("You already have a conversation with this member");
        }

        ChatRequest request = new ChatRequest();
        request.setRequester(requester);
        request.setRecipient(recipient);
        if (input.postId() != null) {
            HelpPost post = posts.findById(input.postId())
                    .orElseThrow(() -> new ResourceNotFoundException("Help post was not found"));
            if (post.getOwner() == null || !post.getOwner().getId().equals(input.recipientId())) {
                throw new ConflictException("A post chat request must be sent to its owner");
            }
            if (post.getOwner().getId().equals(requesterId)) {
                throw new ConflictException("You cannot request a chat with yourself");
            }
            request.setPost(post);
        } else {
            HelpResponse response = responses.findById(input.responseId())
                    .orElseThrow(() -> new ResourceNotFoundException("Help response was not found"));
            Long ownerId = response.getPost().getOwner() == null ? null : response.getPost().getOwner().getId();
            Long responderId = response.getResponder().getId();
            boolean requesterIsParticipant = requesterId.equals(ownerId) || requesterId.equals(responderId);
            Long expectedRecipient = requesterId.equals(ownerId) ? responderId : ownerId;
            if (!requesterIsParticipant || expectedRecipient == null
                    || !expectedRecipient.equals(input.recipientId())) {
                throw new ConflictException("A response chat request must be sent between its participants");
            }
            request.setPost(response.getPost());
            request.setResponse(response);
        }
        return ChatRequestView.from(requests.save(request));
    }

    public List<ChatRequestView> myRequests(AuthenticatedUser principal) {
        return requests.findByRequesterIdOrRecipientIdOrderByUpdatedAtDesc(principal.id(), principal.id()).stream()
                .filter(request -> !isBlocked(request.getRequester().getId(), request.getRecipient().getId()))
                .map(ChatRequestView::from).toList();
    }

    @Transactional
    public ChatRequestView decide(Long requestId, ChatDecisionRequest decision, AuthenticatedUser principal) {
        ChatRequest request = requests.findByIdAndRecipientId(requestId, principal.id())
                .orElseThrow(() -> new ResourceNotFoundException("Chat request was not found"));
        if (request.getStatus() != ChatRequestStatus.PENDING) {
            throw new ConflictException("This chat request has already been handled");
        }
        requireNotBlocked(request.getRequester().getId(), request.getRecipient().getId());
        if (!decision.accept()) {
            request.setStatus(ChatRequestStatus.DECLINED);
            return ChatRequestView.from(requests.save(request));
        }
        if (decision.requesterKeyEnvelope() == null || decision.requesterKeyEnvelope().isBlank()
                || decision.recipientKeyEnvelope() == null || decision.recipientKeyEnvelope().isBlank()) {
            throw new ConflictException("Encrypted conversation keys are required to accept a chat request");
        }
        requireKey(request.getRequester().getId());
        requireKey(request.getRecipient().getId());
        request.setStatus(ChatRequestStatus.ACCEPTED);
        ChatRequest saved = requests.save(request);
        ChatConversation conversation = new ChatConversation();
        conversation.setRequest(saved);
        conversation.setRequesterKeyEnvelope(decision.requesterKeyEnvelope());
        conversation.setRecipientKeyEnvelope(decision.recipientKeyEnvelope());
        conversations.save(conversation);
        return ChatRequestView.from(saved);
    }

    @Transactional
    public ChatRequestView cancel(Long requestId, AuthenticatedUser principal) {
        ChatRequest request = requests.findByIdAndRequesterId(requestId, principal.id())
                .orElseThrow(() -> new ResourceNotFoundException("Chat request was not found"));
        if (request.getStatus() != ChatRequestStatus.PENDING) {
            throw new ConflictException("Only a pending chat request can be cancelled");
        }
        request.setStatus(ChatRequestStatus.CANCELLED);
        return ChatRequestView.from(requests.save(request));
    }

    public List<ChatConversationView> conversations(AuthenticatedUser principal, boolean archived) {
        return conversations.findAllByRequestRequesterIdOrRequestRecipientIdOrderByUpdatedAtDesc(
                        principal.id(), principal.id()).stream()
                .filter(conversation -> isArchived(conversation, principal.id()) == archived)
                .filter(conversation -> !isBlocked(
                        conversation.getRequest().getRequester().getId(),
                        conversation.getRequest().getRecipient().getId()))
                .map(conversation -> ChatConversationView.from(conversation, principal.id())).toList();
    }

    public List<ChatMessageView> messages(Long conversationId, AuthenticatedUser principal) {
        ChatConversation conversation = requireConversation(conversationId);
        requireParticipant(conversation, principal.id());
        return messages.findTop100ByConversationIdOrderByIdDesc(conversationId).stream()
                .sorted(java.util.Comparator.comparing(ChatMessage::getId))
                .map(ChatMessageView::from).toList();
    }

    @Transactional
    public void markRead(Long conversationId, ChatReadRequest request, AuthenticatedUser principal) {
        ChatConversation conversation = requireConversation(conversationId);
        requireParticipant(conversation, principal.id());
        ChatMessage message = messages.findByIdAndConversationId(request.messageId(), conversationId)
                .orElseThrow(() -> new ResourceNotFoundException("Chat message was not found"));
        if (conversation.getRequest().getRequester().getId().equals(principal.id())) {
            if (conversation.getRequesterLastReadMessageId() == null
                    || request.messageId() > conversation.getRequesterLastReadMessageId()) {
                conversation.setRequesterLastReadMessageId(message.getId());
            }
        } else if (conversation.getRecipientLastReadMessageId() == null
                || request.messageId() > conversation.getRecipientLastReadMessageId()) {
            conversation.setRecipientLastReadMessageId(message.getId());
        }
    }

    public ChatNotificationSummary notifications(AuthenticatedUser principal) {
        long unreadMessages = 0;
        for (ChatConversation conversation : conversations.findAllByRequestRequesterIdOrRequestRecipientIdOrderByUpdatedAtDesc(
                principal.id(), principal.id())) {
            if (isBlocked(conversation.getRequest().getRequester().getId(),
                    conversation.getRequest().getRecipient().getId())) {
                continue;
            }
            boolean requester = conversation.getRequest().getRequester().getId().equals(principal.id());
            Long peerId = requester
                    ? conversation.getRequest().getRecipient().getId()
                    : conversation.getRequest().getRequester().getId();
            Long lastReadMessageId = requester
                    ? conversation.getRequesterLastReadMessageId()
                    : conversation.getRecipientLastReadMessageId();
            unreadMessages += messages.countByConversationIdAndSenderIdAndIdGreaterThan(
                    conversation.getId(), peerId, lastReadMessageId == null ? 0L : lastReadMessageId);
        }
        long pendingRequests = requests.findByRequesterIdOrRecipientIdOrderByUpdatedAtDesc(
                        principal.id(), principal.id()).stream()
                .filter(request -> request.getRecipient().getId().equals(principal.id()))
                .filter(request -> request.getStatus() == ChatRequestStatus.PENDING)
                .filter(request -> !isBlocked(request.getRequester().getId(), request.getRecipient().getId()))
                .count();
        return new ChatNotificationSummary(unreadMessages, pendingRequests);
    }

    @Transactional
    public ChatMessageView send(Long conversationId, ChatMessageCreate input, AuthenticatedUser principal) {
        ChatConversation conversation = requireConversation(conversationId);
        requireParticipant(conversation, principal.id());
        Long peerId = peerId(conversation, principal.id());
        requireNotBlocked(principal.id(), peerId);
        if (input.ciphertext().length() < 23 || input.iv().length() < 12) {
            throw new ConflictException("Message ciphertext or encryption nonce is invalid");
        }

        ChatMessage message = new ChatMessage();
        message.setConversation(conversation);
        message.setSender(requireUser(principal.id()));
        message.setCiphertext(input.ciphertext());
        message.setIv(input.iv());
        conversation.setRequesterArchivedAt(null);
        conversation.setRecipientArchivedAt(null);
        conversation.touch();
        return ChatMessageView.from(messages.save(message));
    }

    @Transactional
    public void archive(Long conversationId, ChatArchiveRequest request, AuthenticatedUser principal) {
        ChatConversation conversation = requireConversation(conversationId);
        requireParticipant(conversation, principal.id());
        Instant archivedAt = request.archived() ? Instant.now() : null;
        if (conversation.getRequest().getRequester().getId().equals(principal.id())) {
            conversation.setRequesterArchivedAt(archivedAt);
        } else {
            conversation.setRecipientArchivedAt(archivedAt);
        }
        conversations.save(conversation);
    }

    public List<ChatBlockView> blockedUsers(AuthenticatedUser principal) {
        return blocks.findAllByBlockerIdOrderByCreatedAtDesc(principal.id()).stream()
                .map(ChatBlockView::from).toList();
    }

    @Transactional
    public void block(Long userId, AuthenticatedUser principal) {
        if (userId.equals(principal.id())) {
            throw new ConflictException("You cannot block yourself");
        }
        AppUser blocker = requireUser(principal.id());
        AppUser blocked = requireUser(userId);
        if (!blocks.existsByBlockerIdAndBlockedId(principal.id(), userId)) {
            ChatBlock block = new ChatBlock();
            block.setBlocker(blocker);
            block.setBlocked(blocked);
            blocks.save(block);
        }
        requests.findByRequesterIdOrRecipientIdOrderByUpdatedAtDesc(userId, userId).stream()
                .filter(request -> request.getStatus() == ChatRequestStatus.PENDING)
                .filter(request -> pairMatches(request.getRequester().getId(), request.getRecipient().getId(),
                        principal.id(), userId))
                .forEach(request -> request.setStatus(ChatRequestStatus.CANCELLED));
    }

    @Transactional
    public void unblock(Long userId, AuthenticatedUser principal) {
        ChatBlock block = blocks.findByBlockerIdAndBlockedId(principal.id(), userId)
                .orElseThrow(() -> new ResourceNotFoundException("Blocked member was not found"));
        blocks.delete(block);
    }

    @Transactional
    public void report(Long conversationId, ChatReportRequest input, AuthenticatedUser principal) {
        ChatConversation conversation = requireConversation(conversationId);
        requireParticipant(conversation, principal.id());
        Long reportedUserId = peerId(conversation, principal.id());
        ChatReport report = new ChatReport();
        report.setConversation(conversation);
        report.setReporter(requireUser(principal.id()));
        report.setReportedUser(requireUser(reportedUserId));
        report.setReason(input.reason().strip());
        report.setOptionalEvidence(input.optionalEvidence() == null || input.optionalEvidence().isBlank()
                ? null : input.optionalEvidence().strip());
        reports.save(report);
    }

    public List<ChatReportView> reports() {
        return reports.findAllByOrderByCreatedAtDesc().stream().map(ChatReportView::from).toList();
    }

    @Transactional
    public ChatReportView updateReport(Long reportId, ChatReportStatus status) {
        ChatReport report = reports.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Chat report was not found"));
        report.setStatus(status);
        return ChatReportView.from(report);
    }

    private ChatConversation requireConversation(Long id) {
        return conversations.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation was not found"));
    }

    private void requireParticipant(ChatConversation conversation, Long userId) {
        ChatRequest request = conversation.getRequest();
        if (!request.getRequester().getId().equals(userId) && !request.getRecipient().getId().equals(userId)) {
            throw new AccessDeniedException("Only conversation participants can access its messages");
        }
    }

    private Long peerId(ChatConversation conversation, Long userId) {
        ChatRequest request = conversation.getRequest();
        return request.getRequester().getId().equals(userId)
                ? request.getRecipient().getId() : request.getRequester().getId();
    }

    private boolean isArchived(ChatConversation conversation, Long userId) {
        return conversation.getRequest().getRequester().getId().equals(userId)
                ? conversation.getRequesterArchivedAt() != null : conversation.getRecipientArchivedAt() != null;
    }

    private boolean hasConversation(Long firstId, Long secondId) {
        return conversations.findAllByRequestRequesterIdOrRequestRecipientIdOrderByUpdatedAtDesc(firstId, firstId)
                .stream().anyMatch(conversation -> pairMatches(
                        conversation.getRequest().getRequester().getId(),
                        conversation.getRequest().getRecipient().getId(), firstId, secondId));
    }

    private boolean isBlocked(Long firstId, Long secondId) {
        return blocks.existsByBlockerIdAndBlockedId(firstId, secondId)
                || blocks.existsByBlockerIdAndBlockedId(secondId, firstId);
    }

    private void requireNotBlocked(Long firstId, Long secondId) {
        if (isBlocked(firstId, secondId)) {
            throw new AccessDeniedException("Messaging is unavailable between these members");
        }
    }

    private void requireKey(Long userId) {
        if (!keys.findByUserId(userId).isPresent()) {
            throw new ConflictException("Both members must set up secure messaging before chatting");
        }
    }

    private AppUser requireUser(Long id) {
        return users.findById(id).orElseThrow(() -> new ResourceNotFoundException("Member was not found"));
    }

    private boolean pairMatches(Long first, Long second, Long expectedFirst, Long expectedSecond) {
        return first.equals(expectedFirst) && second.equals(expectedSecond)
                || first.equals(expectedSecond) && second.equals(expectedFirst);
    }
}
