package com.ecofeast.restaurant_ecofest.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComplaintRequest {
    private Long userId;
    @NotBlank
    private String message;
}
