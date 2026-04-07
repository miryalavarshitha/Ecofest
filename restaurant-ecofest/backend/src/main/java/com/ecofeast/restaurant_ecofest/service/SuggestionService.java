package com.ecofeast.restaurant_ecofest.service;

import com.ecofeast.restaurant_ecofest.dto.SuggestionRequest;
import com.ecofeast.restaurant_ecofest.model.Suggestion;
import com.ecofeast.restaurant_ecofest.repository.SuggestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SuggestionService {
    private final SuggestionRepository suggestionRepository;

    public Suggestion createSuggestion(SuggestionRequest request) {
        Suggestion suggestion = Suggestion.builder()
                .userId(request.getUserId())
                .title(request.getTitle())
                .message(request.getMessage())
                .createdAt(LocalDateTime.now())
                .build();
        return suggestionRepository.save(suggestion);
    }
}
