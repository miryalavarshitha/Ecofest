package com.ecofeast.restaurant_ecofest.service;

import com.ecofeast.restaurant_ecofest.model.RewardTransaction;
import com.ecofeast.restaurant_ecofest.model.User;
import com.ecofeast.restaurant_ecofest.repository.RewardTransactionRepository;
import com.ecofeast.restaurant_ecofest.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RewardService {

    private final UserRepository userRepository;
    private final RewardTransactionRepository rewardTransactionRepository;

    private static final Map<String, Integer> ACTIVITY_POINTS = new HashMap<>();
    
    static {
        ACTIVITY_POINTS.put("PLANT_TREE", 50);
        ACTIVITY_POINTS.put("CYCLE_TO_RESTAURANT", 25);
        ACTIVITY_POINTS.put("CARPOOL", 15);
        ACTIVITY_POINTS.put("REUSABLE_CONTAINER", 10);
        ACTIVITY_POINTS.put("PUBLIC_TRANSPORT", 20);
    }

    public void addPoints(User user, int points, String reason) {
        user.setRewardPoints(user.getRewardPoints() + points);
        userRepository.save(user);

        RewardTransaction txn = RewardTransaction.builder()
                .user(user)
                .pointsChange(points)
                .reason(reason)
                .createdAt(LocalDateTime.now())
                .build();
        rewardTransactionRepository.save(txn);
    }

    public RewardTransaction submitActivity(Long userId, String activityType, String description, MultipartFile image) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        int points = ACTIVITY_POINTS.getOrDefault(activityType, 0);
        if (points == 0) {
            throw new RuntimeException("Invalid activity type");
        }

        String reason = activityType.replace("_", " ");
        if (description != null && !description.isEmpty()) {
            reason += " - " + description;
        }

        // Note: In a production system, you would save the image file to storage (S3, local filesystem, etc.)
        // For now, we'll just verify the activity and award points
        // Image handling can be added later with proper file storage configuration

        addPoints(user, points, reason);

        // Return the most recent transaction
        List<RewardTransaction> transactions = rewardTransactionRepository.findByUser(user);
        return transactions.isEmpty() ? null : transactions.get(transactions.size() - 1);
    }

    public int getBalance(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getRewardPoints();
    }

    public List<RewardTransaction> history(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return rewardTransactionRepository.findByUser(user);
    }
}
