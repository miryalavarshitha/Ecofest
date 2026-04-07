package com.ecofeast.restaurant_ecofest.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuggestionRequest {
    private Long userId;
    @NotBlank
    private String title;
    @NotBlank
    private String message;
}
