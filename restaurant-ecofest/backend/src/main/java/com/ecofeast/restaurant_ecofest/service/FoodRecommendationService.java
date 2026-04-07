package com.ecofeast.restaurant_ecofest.service;

import com.ecofeast.restaurant_ecofest.dto.EcoBotResponse;
import com.ecofeast.restaurant_ecofest.model.FoodItem;
import com.ecofeast.restaurant_ecofest.repository.FoodItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodRecommendationService {

    private final FoodItemRepository foodItemRepository;

    public List<FoodItem> getAllItems() {
        return foodItemRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(FoodItem::getName))
                .toList();
    }

    public List<FoodItem> recommend(String preferences) {
        Set<String> keys = parseKeywords(preferences);
        return foodItemRepository.findAll()
                .stream()
                .filter(item -> keys.isEmpty() || item.getTags().stream().anyMatch(keys::contains))
                .sorted(Comparator.comparing(FoodItem::getCalories).thenComparing(FoodItem::getPrice))
                .limit(6)
                .toList();
    }

    public EcoBotResponse getBotReply(String message) {
        String normalized = message.toLowerCase(Locale.ROOT);
        List<FoodItem> recommendations = recommend(message);

        if (containsAny(normalized, "healthy", "low calorie", "low-calorie", "fitness", "diet")) {
            return EcoBotResponse.builder()
                    .reply("For healthy choices, try low-calorie bowls, soups, salads, or grilled options. Here are great picks for you.")
                    .recommendations(recommendations)
                    .build();
        }
        if (containsAny(normalized, "vegan", "plant based", "plant-based", "vegetarian")) {
            return EcoBotResponse.builder()
                    .reply("Great choice. Vegan and plant-forward meals reduce environmental impact too. These options match your preference.")
                    .recommendations(recommendations)
                    .build();
        }
        if (containsAny(normalized, "protein", "high protein", "high-protein", "gym")) {
            return EcoBotResponse.builder()
                    .reply("Here are protein-rich options to support your goals. Pair with lighter sides for better calorie balance.")
                    .recommendations(recommendations)
                    .build();
        }
        if (containsAny(normalized, "spicy", "hot", "chilli", "chili")) {
            return EcoBotResponse.builder()
                    .reply("Love spicy food. I found flavorful options with a good spice profile for you.")
                    .recommendations(recommendations)
                    .build();
        }
        if (containsAny(normalized, "eco", "sustainable", "environment", "planet", "green")) {
            return EcoBotResponse.builder()
                    .reply("Eco tip: choose plant-based meals, avoid over-ordering, and prefer local seasonal ingredients to lower your footprint.")
                    .recommendations(recommend("healthy vegan low-calorie"))
                    .build();
        }
        if (containsAny(normalized, "hello", "hi", "hey")) {
            return EcoBotResponse.builder()
                    .reply("Hey, I'm your EcoBot. Tell me your taste: healthy, vegan, low-calorie, protein-rich, or spicy.")
                    .recommendations(recommend("healthy"))
                    .build();
        }
        if (containsAny(normalized, "website", "app", "feature", "how to order", "how do i order")) {
            return EcoBotResponse.builder()
                    .reply("Website guide: open Food Ordering to add items, check calories in cart, then Pay Now. You can also use Table Booking, Event Booking, Food Donation, and Eco Rewards.")
                    .recommendations(recommend("healthy"))
                    .build();
        }
        if (containsAny(normalized, "complaint", "issue", "problem", "bug")) {
            return EcoBotResponse.builder()
                    .reply("I can help file a complaint. Type your message as: complaint: <your issue details>.")
                    .recommendations(List.of())
                    .build();
        }
        if (containsAny(normalized, "calorie", "calories", "kcal")) {
            return EcoBotResponse.builder()
                    .reply("Every menu card shows calories, and your cart displays total calories so you can manage your meal goals.")
                    .recommendations(recommend("low-calorie healthy"))
                    .build();
        }

        return EcoBotResponse.builder()
                .reply("I can help with eco-friendly food choices and smart ordering. Try asking: 'suggest low-calorie', 'vegan options', or 'protein-rich food'.")
                .recommendations(recommendations)
                .build();
    }

    private Set<String> parseKeywords(String text) {
        if (text == null || text.isBlank()) {
            return Set.of();
        }
        return Arrays.stream(text.toLowerCase(Locale.ROOT).split("[,\\s]+"))
                .filter(s -> !s.isBlank())
                .collect(Collectors.toSet());
    }

    private boolean containsAny(String source, String... probes) {
        return Arrays.stream(probes).anyMatch(source::contains);
    }
}
