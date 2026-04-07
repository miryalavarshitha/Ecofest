package com.ecofeast.restaurant_ecofest.service;

import com.ecofeast.restaurant_ecofest.dto.FoodDonationRequest;
import com.ecofeast.restaurant_ecofest.model.FoodDonation;
import com.ecofeast.restaurant_ecofest.model.User;
import com.ecofeast.restaurant_ecofest.repository.FoodDonationRepository;
import com.ecofeast.restaurant_ecofest.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final FoodDonationRepository foodDonationRepository;
    private final UserRepository userRepository;
    private final RewardService rewardService;

    public FoodDonation donateFood(FoodDonationRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        FoodDonation donation = FoodDonation.builder()
                .user(user)
                .foodDetails(request.getFoodDetails())
                .servings(request.getServings())
                .donationTime(LocalDateTime.now())
                .build();

        FoodDonation saved = foodDonationRepository.save(donation);

        int points = request.getServings() * 5;
        rewardService.addPoints(user, points, "FOOD_DONATION");

        return saved;
    }
}
