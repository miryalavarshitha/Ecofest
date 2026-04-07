package com.ecofeast.restaurant_ecofest.repository;

import com.ecofeast.restaurant_ecofest.model.FoodOrder;
import com.ecofeast.restaurant_ecofest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Long> {
    List<FoodOrder> findByUser(User user);
}
