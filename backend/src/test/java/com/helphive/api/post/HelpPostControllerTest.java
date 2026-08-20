package com.helphive.api.post;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class HelpPostControllerTest {
    @Autowired MockMvc mockMvc;

    @Test
    void createsFiltersUpdatesAndDeletesPost() throws Exception {
        String token = register("Alex Kim", "alex-create@example.com");
        String body = """
                {"title":"Help setting up a phone","description":"Need patient help transferring photos to a new phone this weekend.","location":"West End","category":"TECHNOLOGY","type":"REQUEST"}
                """;

        String response = mockMvc.perform(post("/api/posts").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value("OPEN"))
                .andExpect(jsonPath("$.authorName").value("Alex Kim"))
                .andExpect(jsonPath("$.ownedByCurrentUser").value(true))
                .andReturn().getResponse().getContentAsString();
        long id = Long.parseLong(response.replaceAll(".*\\\"id\\\":(\\d+).*", "$1"));

        mockMvc.perform(get("/api/posts").param("category", "TECHNOLOGY").param("search", "phone"))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)));
        mockMvc.perform(patch("/api/posts/{id}/status", id).header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"COMPLETED\"}"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.status").value("COMPLETED"));
        mockMvc.perform(delete("/api/posts/{id}", id).header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/api/posts/{id}", id)).andExpect(status().isNotFound());
    }

    @Test
    void rejectsInvalidPosts() throws Exception {
        String token = register("Alex Kim", "alex-invalid@example.com");
        mockMvc.perform(post("/api/posts").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"\",\"description\":\"too short\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.title").exists())
                .andExpect(jsonPath("$.errors.description").exists());
    }

    @Test
    void requiresAuthenticationAndEnforcesOwnership() throws Exception {
        String ownerToken = register("Owner", "owner@example.com");
        String otherToken = register("Other Member", "other@example.com");
        String body = """
                {"title":"Community garden planning","description":"Looking for neighbors to plan the spring garden beds together.","location":"North Hills","category":"HOME_AND_GARDEN","type":"REQUEST"}
                """;

        mockMvc.perform(post("/api/posts").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isUnauthorized());

        String response = mockMvc.perform(post("/api/posts").header("Authorization", "Bearer " + ownerToken)
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
        long id = Long.parseLong(response.replaceAll(".*\\\"id\\\":(\\d+).*", "$1"));

        mockMvc.perform(delete("/api/posts/{id}", id).header("Authorization", "Bearer " + otherToken))
                .andExpect(status().isForbidden());
        mockMvc.perform(get("/api/posts/{id}", id).header("Authorization", "Bearer " + otherToken))
                .andExpect(status().isOk()).andExpect(jsonPath("$.ownedByCurrentUser").value(false));
        mockMvc.perform(get("/api/posts/{id}", id).header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isOk()).andExpect(jsonPath("$.ownedByCurrentUser").value(true));
    }

    @Test
    void registersLogsInAndRejectsDuplicateAccount() throws Exception {
        register("Alex Kim", "alex-login@example.com");
        mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"ALEX-LOGIN@example.com\",\"password\":\"strong-pass-123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.user.email").value("alex-login@example.com"));
        mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Duplicate\",\"email\":\"alex-login@example.com\",\"password\":\"another-pass-123\"}"))
                .andExpect(status().isConflict());
    }

    private String register(String name, String email) throws Exception {
        String response = mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"" + name + "\",\"email\":\"" + email
                                + "\",\"password\":\"strong-pass-123\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andReturn().getResponse().getContentAsString();
        return response.replaceAll(".*\\\"token\\\":\\\"([^\\\"]+)\\\".*", "$1");
    }
}
