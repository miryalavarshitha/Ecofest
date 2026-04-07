package com.ecofeast.restaurant_ecofest.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EcoBotRequest {
    @NotBlank
    private String message;
}
