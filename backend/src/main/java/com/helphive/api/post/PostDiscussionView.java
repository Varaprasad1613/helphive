package com.helphive.api.post;

import java.util.List;

public record PostDiscussionView(
        List<PostProgressUpdateView> updates,
        boolean commentsOpen,
        boolean canPostNote) {}
