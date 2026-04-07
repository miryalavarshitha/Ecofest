package com.ecofeast.restaurant_ecofest.controller;

import com.ecofeast.restaurant_ecofest.dto.ApiResponse;
import com.ecofeast.restaurant_ecofest.dto.SuggestionRequest;
import com.ecofeast.restaurant_ecofest.model.Suggestion;
import com.ecofeast.restaurant_ecofest.service.SuggestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/suggestions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SuggestionController {

    private final SuggestionService suggestionService;

    @PostMapping
    public ApiResponse create(@Valid @RequestBody SuggestionRequest request) {
        Suggestion saved = suggestionService.createSuggestion(request);
        return new ApiResponse("Suggestion received successfully. Ref #" + saved.getId());
    }
}
