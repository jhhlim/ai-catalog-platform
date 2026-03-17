package com.example.validator.service;

import com.example.validator.model.ValidationRequest;
import com.example.validator.model.ValidationResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ValidationService {
    public ValidationResponse validate(ValidationRequest request) {
        List<String> errors = new ArrayList<>();

        if (isBlank(request.getSku())) errors.add("sku is required");
        if (isBlank(request.getName())) errors.add("name is required");
        if (isBlank(request.getCategory())) errors.add("category is required");
        if (isBlank(request.getDescription())) errors.add("description is required");

        Map<String, Object> attributes = request.getAttributes();
        if (attributes == null || attributes.isEmpty()) {
            errors.add("attributes are required");
        } else {
            if ("storage".equalsIgnoreCase(request.getCategory())) {
                require(attributes, "capacityClass", errors);
                require(attributes, "protocolSupport", errors);
            }
            if ("networking".equalsIgnoreCase(request.getCategory())) {
                require(attributes, "throughput", errors);
            }
            if ("software".equalsIgnoreCase(request.getCategory())) {
                require(attributes, "licenseModel", errors);
            }
        }

        return new ValidationResponse(errors.isEmpty(), errors);
    }

    private void require(Map<String, Object> attributes, String key, List<String> errors) {
        Object value = attributes.get(key);
        if (value == null || value.toString().isBlank()) {
            errors.add(key + " is required for category");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
