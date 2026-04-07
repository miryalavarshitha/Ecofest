package com.ecofeast.restaurant_ecofest.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FoodOrderRequest {

    @NotBlank
    private String itemsDescription;

    @NotNull
    @Min(1)
    private Double totalAmount;

    private Long userId;
}
