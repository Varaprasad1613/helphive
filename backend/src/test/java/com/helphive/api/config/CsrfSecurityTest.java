package com.helphive.api.config;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import jakarta.servlet.http.Cookie;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest(properties = "app.public-url=https://helphive.example")
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CsrfSecurityTest {
    @Autowired MockMvc mockMvc;

    @Test
    void issuesCookieAndRequiresItsTokenForUnsafeRequests() throws Exception {
        MvcResult bootstrap = mockMvc.perform(get("/api/csrf"))
                .andExpect(status().isNoContent())
                .andReturn();
        Cookie csrfCookie = bootstrap.getResponse().getCookie("XSRF-TOKEN");
        assertNotNull(csrfCookie);
        assertTrue(csrfCookie.getSecure());
        assertFalse(csrfCookie.isHttpOnly());
        assertEquals("/", csrfCookie.getPath());
        assertEquals("Lax", csrfCookie.getAttribute("SameSite"));

        String email = "csrf-" + UUID.randomUUID() + "@example.com";
        String body = "{\"name\":\"CSRF Test\",\"email\":\"" + email
                + "\",\"password\":\"strong-pass-123\"}";
        mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isForbidden());

        mockMvc.perform(post("/api/auth/register")
                        .cookie(csrfCookie)
                        .header("X-XSRF-TOKEN", csrfCookie.getValue())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isCreated());
    }
}
