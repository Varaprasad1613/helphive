package com.helphive.api;

import jakarta.servlet.http.Cookie;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

public final class CsrfTestSupport {
    private static final String TOKEN = "test-csrf-token";

    private CsrfTestSupport() {}

    public static ResultActions performWithCsrf(MockMvc mockMvc, MockHttpServletRequestBuilder request)
            throws Exception {
        request.cookie(new Cookie("XSRF-TOKEN", TOKEN));
        request.header("X-XSRF-TOKEN", TOKEN);
        return mockMvc.perform(request);
    }
}
