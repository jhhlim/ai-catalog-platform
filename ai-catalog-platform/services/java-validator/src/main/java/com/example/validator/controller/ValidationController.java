package com.example.validator.controller;

import com.example.validator.model.ValidationRequest;
import com.example.validator.model.ValidationResponse;
import com.example.validator.service.ValidationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ValidationController {
    private final ValidationService validationService;

    public ValidationController(ValidationService validationService) {
        this.validationService = validationService;
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of("ok", true, "service", "java-validator");
    }

    @PostMapping("/validate")
    public ValidationResponse validate(@RequestBody ValidationRequest request) {
        return validationService.validate(request);
    }
}
