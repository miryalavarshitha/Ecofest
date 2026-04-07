package com.ecofeast.restaurant_ecofest.controller;

import com.ecofeast.restaurant_ecofest.dto.EcoBotRequest;
import com.ecofeast.restaurant_ecofest.dto.EcoBotResponse;
import com.ecofeast.restaurant_ecofest.model.FoodItem;
import com.ecofeast.restaurant_ecofest.service.FoodRecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/food")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class FoodRecommendationController {

    private final FoodRecommendationService foodRecommendationService;

    @GetMapping("/items")
    public List<FoodItem> getItems() {
        return foodRecommendationService.getAllItems();
    }

    @GetMapping("/recommend")
    public List<FoodItem> recommend(@RequestParam(defaultValue = "") String preferences) {
        return foodRecommendationService.recommend(preferences);
    }

    @PostMapping("/chat")
    public EcoBotResponse chat(@Valid @RequestBody EcoBotRequest request) {
        return foodRecommendationService.getBotReply(request.getMessage());
    }
}
