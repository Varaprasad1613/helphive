package com.helphive.api.chat;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Base64;
import java.util.UUID;
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
class ChatControllerTest {
    @Autowired MockMvc mockMvc;

    @Test
    void requiresRecipientConsentBeforeMessagingAndStoresOnlyCiphertext() throws Exception {
        String suffix = UUID.randomUUID().toString().substring(0, 8);
        String ownerToken = registerAndLogin("Chat Owner", "chat-owner-" + suffix + "@example.com");
        String senderToken = registerAndLogin("Chat Sender", "chat-sender-" + suffix + "@example.com");
        String outsiderToken = registerAndLogin("Chat Outsider", "chat-outsider-" + suffix + "@example.com");
        registerKey(ownerToken);
        registerKey(senderToken);

        String postBody = """
                {"title":"Chat test post","description":"A post used to test secure private chat requests.","location":"West End","category":"OTHER","type":"REQUEST"}
                """;
        String postResponse = mockMvc.perform(post("/api/posts").header("Authorization", bearer(ownerToken))
                        .contentType(MediaType.APPLICATION_JSON).content(postBody))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        long postId = number(postResponse, "id");
        mockMvc.perform(get("/api/posts/{id}", postId).header("Authorization", bearer(senderToken)))
                .andExpect(status().isOk()).andExpect(jsonPath("$.contact").value(org.hamcrest.Matchers.nullValue()));

        String requestBody = "{\"recipientId\":" + userIdFrom(ownerToken)
                + ",\"postId\":" + postId + ",\"responseId\":null}";
        String requestResponse = mockMvc.perform(post("/api/chat/requests")
                        .header("Authorization", bearer(senderToken))
                        .contentType(MediaType.APPLICATION_JSON).content(requestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("PENDING"))
                .andExpect(jsonPath("$.postTitle").value("Chat test post"))
                .andReturn().getResponse().getContentAsString();
        long requestId = number(requestResponse, "id");

        mockMvc.perform(get("/api/chat/requests").header("Authorization", bearer(ownerToken)))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)));
        mockMvc.perform(get("/api/chat/conversations").header("Authorization", bearer(senderToken)))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(0)));
        mockMvc.perform(get("/api/chat/conversations/999999/messages").header("Authorization", bearer(senderToken)))
                .andExpect(status().isNotFound());

        String accept = """
                {"accept":true,"requesterKeyEnvelope":"requester-envelope","recipientKeyEnvelope":"recipient-envelope"}
                """;
        mockMvc.perform(patch("/api/chat/requests/{id}", requestId).header("Authorization", bearer(ownerToken))
                        .contentType(MediaType.APPLICATION_JSON).content(accept))
                .andExpect(status().isOk()).andExpect(jsonPath("$.status").value("ACCEPTED"));

        String requesterConversations = mockMvc.perform(get("/api/chat/conversations")
                        .header("Authorization", bearer(senderToken)))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].encryptedKeyEnvelope").value("requester-envelope"))
                .andReturn().getResponse().getContentAsString();
        long conversationId = number(requesterConversations, "id");
        String encryptedMessage = "Y2lwaGVydGV4dC1ub3QtcGxhaW50ZXh0";
        String sendBody = "{\"ciphertext\":\"" + encryptedMessage + "\",\"iv\":\"YWJjZGVmZ2hpamts\"}";
        String sent = mockMvc.perform(post("/api/chat/conversations/{id}/messages", conversationId)
                        .header("Authorization", bearer(senderToken))
                        .contentType(MediaType.APPLICATION_JSON).content(sendBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ciphertext").value(encryptedMessage))
                .andReturn().getResponse().getContentAsString();
        org.junit.jupiter.api.Assertions.assertFalse(sent.contains("plaintext-message"));
        String oneCharacterCiphertext = Base64.getUrlEncoder().withoutPadding().encodeToString(new byte[17]);
        mockMvc.perform(post("/api/chat/conversations/{id}/messages", conversationId)
                        .header("Authorization", bearer(senderToken))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"ciphertext\":\"" + oneCharacterCiphertext + "\",\"iv\":\"YWJjZGVmZ2hpamts\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ciphertext").value(oneCharacterCiphertext));

        mockMvc.perform(get("/api/chat/conversations/{id}/messages", conversationId)
                        .header("Authorization", bearer(ownerToken)))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].ciphertext").value(encryptedMessage))
                .andExpect(jsonPath("$[1].ciphertext").value(oneCharacterCiphertext));
        mockMvc.perform(get("/api/chat/conversations/{id}/messages", conversationId)
                        .header("Authorization", bearer(outsiderToken)))
                .andExpect(status().isForbidden());
        mockMvc.perform(post("/api/chat/conversations/{id}/report", conversationId)
                        .header("Authorization", bearer(senderToken)).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"reason\":\"This member sent unwanted messages.\",\"optionalEvidence\":null}"))
                .andExpect(status().isOk());

        mockMvc.perform(patch("/api/chat/conversations/{id}/archive", conversationId)
                        .header("Authorization", bearer(senderToken)).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"archived\":true}"))
                .andExpect(status().isOk());
        mockMvc.perform(get("/api/chat/conversations").header("Authorization", bearer(senderToken)))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(0)));
        mockMvc.perform(get("/api/chat/conversations").param("archived", "true")
                        .header("Authorization", bearer(senderToken)))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)));

        mockMvc.perform(post("/api/chat/blocks/{userId}", userIdFrom(ownerToken))
                        .header("Authorization", bearer(senderToken)))
                .andExpect(status().isOk());
        mockMvc.perform(post("/api/chat/conversations/{id}/messages", conversationId)
                        .header("Authorization", bearer(senderToken))
                        .contentType(MediaType.APPLICATION_JSON).content(sendBody))
                .andExpect(status().isForbidden());
        mockMvc.perform(get("/api/chat/conversations").header("Authorization", bearer(senderToken)))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(0)));
        mockMvc.perform(delete("/api/chat/blocks/{userId}", userIdFrom(ownerToken))
                        .header("Authorization", bearer(senderToken)))
                .andExpect(status().isNoContent());
    }

    private void registerKey(String token) throws Exception {
        mockMvc.perform(put("/api/chat/keys/me").header("Authorization", bearer(token))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"publicKey":"public-key","encryptedPrivateKey":"encrypted-private-key","salt":"random-salt","iv":"random-iv"}
                                """))
                .andExpect(status().isOk());
    }

    private String registerAndLogin(String name, String email) throws Exception {
        mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"" + name + "\",\"email\":\"" + email
                                + "\",\"password\":\"strong-pass-123\"}"))
                .andExpect(status().isCreated());
        String response = mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"" + email + "\",\"password\":\"strong-pass-123\"}"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        return response.replaceAll(".*\\\"token\\\":\\\"([^\\\"]+)\\\".*", "$1");
    }

    private Long userIdFrom(String token) throws Exception {
        String response = mockMvc.perform(get("/api/users/me").header("Authorization", bearer(token)))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        return number(response, "id");
    }

    private long number(String json, String name) {
        return Long.parseLong(json.replaceAll(".*\\\"" + name + "\\\":(\\d+).*", "$1"));
    }

    private String bearer(String token) {
        return "Bearer " + token;
    }
}
