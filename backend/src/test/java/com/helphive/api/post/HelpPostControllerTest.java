package com.helphive.api.post;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
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
    @Autowired HelpPostRepository repository;

    @BeforeEach
    void cleanDatabase() {
        repository.deleteAll();
    }

    @Test
    void createsFiltersUpdatesAndDeletesPost() throws Exception {
        String body = """
                {"title":"Help setting up a phone","description":"Need patient help transferring photos to a new phone this weekend.","authorName":"Alex Kim","contact":"alex@example.com","location":"West End","category":"TECHNOLOGY","type":"REQUEST"}
                """;

        String response = mockMvc.perform(post("/api/posts").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value("OPEN"))
                .andReturn().getResponse().getContentAsString();
        long id = Long.parseLong(response.replaceAll(".*\\\"id\\\":(\\d+).*", "$1"));

        mockMvc.perform(get("/api/posts").param("category", "TECHNOLOGY").param("search", "phone"))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)));
        mockMvc.perform(patch("/api/posts/{id}/status", id).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"COMPLETED\"}"))
                .andExpect(status().isOk()).andExpect(jsonPath("$.status").value("COMPLETED"));
        mockMvc.perform(delete("/api/posts/{id}", id)).andExpect(status().isNoContent());
        mockMvc.perform(get("/api/posts/{id}", id)).andExpect(status().isNotFound());
    }

    @Test
    void rejectsInvalidPosts() throws Exception {
        mockMvc.perform(post("/api/posts").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"\",\"description\":\"too short\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.title").exists())
                .andExpect(jsonPath("$.errors.description").exists());
    }
}
