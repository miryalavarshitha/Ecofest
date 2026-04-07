package com.ecofeast.restaurant_ecofest.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodDonationRequest {

    @NotNull
    private Long userId;

    @NotBlank
    private String foodDetails;

    @Min(1)
    private Integer servings;
}
