package com.ecofeast.restaurant_ecofest.service;

import com.ecofeast.restaurant_ecofest.dto.FoodOrderRequest;
import com.ecofeast.restaurant_ecofest.model.FoodOrder;
import com.ecofeast.restaurant_ecofest.model.PaymentStatus;
import com.ecofeast.restaurant_ecofest.model.User;
import com.ecofeast.restaurant_ecofest.repository.FoodOrderRepository;
import com.ecofeast.restaurant_ecofest.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FoodOrderService {

    private final FoodOrderRepository foodOrderRepository;
    private final UserRepository userRepository;
    private final RewardService rewardService;

    public FoodOrder placeOrder(FoodOrderRequest request) {
        User user = null;
        if (request.getUserId() != null) {
            user = userRepository.findById(request.getUserId()).orElse(null);
        }

        FoodOrder order = FoodOrder.builder()
                .user(user)
                .itemsDescription(request.getItemsDescription())
                .totalAmount(request.getTotalAmount())
                .paymentStatus(PaymentStatus.PAID)
                .orderedAt(LocalDateTime.now())
                .build();

        FoodOrder saved = foodOrderRepository.save(order);

        int points = (int) (request.getTotalAmount() / 100);
        if (user != null && points > 0) {
            rewardService.addPoints(user, points, "FOOD_ORDER");
        }

        return saved;
    }
}
