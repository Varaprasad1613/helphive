package com.helphive.api.post;

import java.util.List;
import org.springframework.data.domain.Page;

public record HelpPostPageResponse(
        List<HelpPostResponse> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean first,
        boolean last
) {
    static HelpPostPageResponse from(Page<HelpPostResponse> page) {
        return new HelpPostPageResponse(
                page.getContent(), page.getNumber(), page.getSize(), page.getTotalElements(),
                page.getTotalPages(), page.isFirst(), page.isLast());
    }
}
