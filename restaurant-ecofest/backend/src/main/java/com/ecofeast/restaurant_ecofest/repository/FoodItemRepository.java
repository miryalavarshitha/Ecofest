package com.ecofeast.restaurant_ecofest.repository;

import com.ecofeast.restaurant_ecofest.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
}
