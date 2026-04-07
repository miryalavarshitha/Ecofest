package com.ecofeast.restaurant_ecofest.config;

import com.ecofeast.restaurant_ecofest.model.FoodItem;
import com.ecofeast.restaurant_ecofest.repository.FoodItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Set;

@Configuration
public class FoodDataSeeder {

    @Bean
    CommandLineRunner seedFoodItems(FoodItemRepository foodItemRepository) {
        return args -> {
            if (foodItemRepository.count() > 0) {
                return;
            }

            List<FoodItem> items = List.of(
                    build("Caesar Salad", "Italian", "Fresh lettuce with light dressing and croutons.", "/food/i10.jpg", 159, 260, Set.of("healthy", "low-calorie", "vegetarian")),
                    build("Miso Soup", "Japanese", "Traditional soup with tofu and seaweed.", "/food/j3.jpg", 99, 90, Set.of("healthy", "low-calorie", "vegan")),
                    build("Edamame", "Japanese", "Steamed soybeans with sea salt.", "/food/j10.jpg", 139, 190, Set.of("healthy", "vegan", "protein")),
                    build("Teriyaki Tofu Bowl", "Japanese", "Tofu and vegetables with teriyaki glaze.", "/food/j5.png", 229, 450, Set.of("protein", "vegetarian")),
                    build("Vegetable Ramen", "Japanese", "Noodle soup with vegetables and soy broth.", "/food/j2.jpg", 249, 480, Set.of("spicy", "vegetarian")),
                    build("Dal Tadka", "Asian", "Tempered yellow lentils with spices.", "/food/a8.jpg", 129, 280, Set.of("healthy", "protein", "vegetarian")),
                    build("Veg Manchuria", "Chinese", "Vegetable dumplings in tangy sauce.", "/food/food5.jpg", 149, 320, Set.of("spicy", "vegetarian")),
                    build("Kung Pao Vegetables", "Chinese", "Stir-fried veggies with peanuts.", "/food/c5.jpg", 189, 410, Set.of("spicy", "vegan")),
                    build("Chilli Paneer", "Chinese", "Paneer tossed in hot chilli sauce.", "/food/c7.jpg", 199, 390, Set.of("spicy", "protein", "vegetarian")),
                    build("Margherita Pizza", "Italian", "Classic pizza with tomato and mozzarella.", "/food/food13.jpg", 199, 600, Set.of("vegetarian")),
                    build("Penne Arrabbiata", "Italian", "Penne in spicy tomato sauce.", "/food/i8.jpeg", 189, 520, Set.of("spicy", "vegan")),
                    build("Fruit Mocktail", "Asian", "Fresh fruit and soda blend.", "/food/food9.jpg", 149, 150, Set.of("healthy", "low-calorie", "vegan")),
                    build("Fresh Lime Soda", "Asian", "Refreshing lime juice with soda and mint.", "/food/a12.jpg", 59, 70, Set.of("low-calorie", "vegan")),
                    build("Hot and Sour Soup", "Chinese", "Tangy soup with vegetables.", "/food/c8.jpg", 119, 150, Set.of("low-calorie", "spicy", "vegan")),
                    build("Orange Chicken", "Chinese", "Crispy chicken in orange glaze.", "/food/food1.jpg", 199, 520, Set.of("protein", "spicy"))
            );

            foodItemRepository.saveAll(items);
        };
    }

    private FoodItem build(
            String name,
            String cuisine,
            String description,
            String image,
            int price,
            int calories,
            Set<String> tags
    ) {
        return FoodItem.builder()
                .name(name)
                .cuisine(cuisine)
                .description(description)
                .image(image)
                .price(price)
                .calories(calories)
                .tags(tags)
                .build();
    }
}
