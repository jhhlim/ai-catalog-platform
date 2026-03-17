package com.example.validator.controller;

import com.example.validator.model.ValidationRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ValidationControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void validatesStoragePayload() throws Exception {
        ValidationRequest request = new ValidationRequest();
        request.setSku("SKU-1");
        request.setName("Object Storage");
        request.setCategory("storage");
        request.setDescription("High performance cloud object storage with S3 support");
        request.setAttributes(Map.of(
                "capacityClass", "petabyte-scale",
                "protocolSupport", "S3"
        ));

        mockMvc.perform(post("/api/validate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.valid").value(true));
    }
}
