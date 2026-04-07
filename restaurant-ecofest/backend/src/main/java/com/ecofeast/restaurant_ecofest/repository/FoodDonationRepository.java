package com.ecofeast.restaurant_ecofest.repository;

import com.ecofeast.restaurant_ecofest.model.FoodDonation;
import com.ecofeast.restaurant_ecofest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodDonationRepository extends JpaRepository<FoodDonation, Long> {
    List<FoodDonation> findByUser(User user);
}
