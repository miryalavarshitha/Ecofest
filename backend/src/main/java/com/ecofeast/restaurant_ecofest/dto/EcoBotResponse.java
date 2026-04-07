package com.ecofeast.restaurant_ecofest.dto;

import com.ecofeast.restaurant_ecofest.model.FoodItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class EcoBotResponse {
    private String reply;
    private List<FoodItem> recommendations;
}
