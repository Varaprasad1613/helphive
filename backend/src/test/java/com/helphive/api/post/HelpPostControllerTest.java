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
        String token = registerAndLogin("Alex Kim", "alex-create@example.com");
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

        mockMvc.perform(get("/api/posts/mine").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(id));
        mockMvc.perform(get("/api/posts").header("Authorization", "Bearer " + token)
                        .param("category", "TECHNOLOGY").param("search", "phone"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.content", hasSize(1)))
                .andExpect(jsonPath("$.totalElements").value(1));
        mockMvc.perform(patch("/api/posts/{id}/status", id).header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"COMPLETED\"}"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.status").value("COMPLETED"));
        mockMvc.perform(delete("/api/posts/{id}", id).header("Authorization", "Bearer " + token))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/api/posts/{id}", id).header("Authorization", "Bearer " + token))
                .andExpect(status().isNotFound());
    }

    @Test
    void rejectsInvalidPosts() throws Exception {
        String token = registerAndLogin("Alex Kim", "alex-invalid@example.com");
        mockMvc.perform(post("/api/posts").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"\",\"description\":\"too short\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.title").exists())
                .andExpect(jsonPath("$.errors.description").exists());
    }

    @Test
    void requiresAuthenticationAndEnforcesOwnership() throws Exception {
        String ownerToken = registerAndLogin("Owner", "owner@example.com");
        String otherToken = registerAndLogin("Other Member", "other@example.com");
        String body = """
                {"title":"Community garden planning","description":"Looking for neighbors to plan the spring garden beds together.","location":"North Hills","category":"HOME_AND_GARDEN","type":"REQUEST"}
                """;

        mockMvc.perform(post("/api/posts").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/posts")).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/posts/stats")).andExpect(status().isUnauthorized());

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
        mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Alex Kim\",\"email\":\"alex-login@example.com\",\"password\":\"strong-pass-123\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("alex-login@example.com"))
                .andExpect(jsonPath("$.token").doesNotExist());
        mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"ALEX-LOGIN@example.com\",\"password\":\"strong-pass-123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.user.email").value("alex-login@example.com"));
        mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Duplicate\",\"email\":\"alex-login@example.com\",\"password\":\"another-pass-123\"}"))
                .andExpect(status().isConflict());
        mockMvc.perform(post("/api/auth/forgot-password").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"alex-login@example.com\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value(org.hamcrest.Matchers.containsString("If an account exists")));
    }

    @Test
    void restrictsAdminDashboardAndPromotesConfiguredAdminEmail() throws Exception {
        String memberToken = registerAndLogin("Regular Member", "regular-admin-test@example.com");
        mockMvc.perform(get("/api/admin/overview").header("Authorization", "Bearer " + memberToken))
                .andExpect(status().isForbidden());
        String adminToken = registerAndLogin("Community Admin", "admin@example.com");
        mockMvc.perform(get("/api/admin/overview").header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk()).andExpect(jsonPath("$.users").isNumber());
        mockMvc.perform(get("/api/admin/users").header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk()).andExpect(jsonPath("$", org.hamcrest.Matchers.hasItem(
                        org.hamcrest.Matchers.hasEntry("role", "ADMIN"))));
    }

    private String registerAndLogin(String name, String email) throws Exception {
        mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"" + name + "\",\"email\":\"" + email
                                + "\",\"password\":\"strong-pass-123\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value(email));
        String response = mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + email + "\",\"password\":\"strong-pass-123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andReturn().getResponse().getContentAsString();
        return response.replaceAll(".*\\\"token\\\":\\\"([^\\\"]+)\\\".*", "$1");
    }

    @Test
    void readsAndUpdatesProfileAndChangesPassword() throws Exception {
        String token = registerAndLogin("Profile Member", "profile@example.com");
        mockMvc.perform(get("/api/users/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andExpect(jsonPath("$.name").value("Profile Member"));
        mockMvc.perform(org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put("/api/users/me")
                        .header("Authorization", "Bearer " + token).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Updated Member\",\"email\":\"updated-profile@example.com\"}"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.email").value("updated-profile@example.com"));
        mockMvc.perform(patch("/api/users/me/password").header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"currentPassword\":\"strong-pass-123\",\"newPassword\":\"new-strong-pass-456\"}"))
                .andExpect(status().isNoContent());
        mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"updated-profile@example.com\",\"password\":\"new-strong-pass-456\"}"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.token").isNotEmpty());
    }

    @Test
    void sendsReceivesAndAcceptsHelpResponse() throws Exception {
        String ownerToken = registerAndLogin("Response Owner", "response-owner@example.com");
        String helperToken = registerAndLogin("Helpful Member", "response-helper@example.com");
        String postResponse = mockMvc.perform(post("/api/posts").header("Authorization", "Bearer " + ownerToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Need help moving a desk\",\"description\":\"Looking for one neighbor to help move a desk downstairs safely.\",\"location\":\"Oak Street\",\"category\":\"HOME_AND_GARDEN\",\"type\":\"REQUEST\"}"))
                .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
        long postId = Long.parseLong(postResponse.replaceAll(".*\\\"id\\\":(\\d+).*", "$1"));
        String responseBody = mockMvc.perform(post("/api/posts/{postId}/responses", postId)
                        .header("Authorization", "Bearer " + helperToken).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"message\":\"I can bring moving straps and help on Saturday morning.\"}"))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.status").value("PENDING"))
                .andReturn().getResponse().getContentAsString();
        long responseId = Long.parseLong(responseBody.replaceAll(".*\\\"id\\\":(\\d+).*", "$1"));
        mockMvc.perform(get("/api/responses/received").header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].responderName").value("Helpful Member"));
        mockMvc.perform(patch("/api/responses/{id}/status", responseId)
                        .header("Authorization", "Bearer " + ownerToken).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"ACCEPTED\"}"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.status").value("ACCEPTED"));
        mockMvc.perform(get("/api/responses/mine").header("Authorization", "Bearer " + helperToken))
                .andExpect(status().isOk()).andExpect(jsonPath("$[0].status").value("ACCEPTED"));
        mockMvc.perform(get("/api/posts/{id}", postId).header("Authorization", "Bearer " + ownerToken))
                .andExpect(status().isOk()).andExpect(jsonPath("$.status").value("IN_PROGRESS"));
    }

    @Test
    void filtersAndPaginatesCommunityPosts() throws Exception {
        String token = registerAndLogin("Pagination Member", "pagination-member@example.com");
        for (int index = 0; index < 12; index++) {
            String body = """
                    {"title":"Pagination Suite %d","description":"A community post created for pagination tests.","location":"West End","category":"OTHER","type":"REQUEST"}
                    """.formatted(index);
            mockMvc.perform(post("/api/posts").header("Authorization", "Bearer " + token)
                            .contentType(MediaType.APPLICATION_JSON).content(body))
                    .andExpect(status().isCreated());
        }

        mockMvc.perform(get("/api/posts").header("Authorization", "Bearer " + token)
                        .param("search", "pagination suite").param("category", "OTHER")
                        .param("page", "0").param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(5)))
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(5))
                .andExpect(jsonPath("$.totalElements").value(12))
                .andExpect(jsonPath("$.totalPages").value(3))
                .andExpect(jsonPath("$.first").value(true))
                .andExpect(jsonPath("$.last").value(false));

        mockMvc.perform(get("/api/posts").header("Authorization", "Bearer " + token)
                        .param("search", "pagination suite").param("page", "2").param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.last").value(true));

        mockMvc.perform(get("/api/posts").header("Authorization", "Bearer " + token).param("page", "-1"))
                .andExpect(status().isBadRequest());
        mockMvc.perform(get("/api/posts").header("Authorization", "Bearer " + token).param("size", "51"))
                .andExpect(status().isBadRequest());
    }

}
