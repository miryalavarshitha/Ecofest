package com.ecofeast.restaurant_ecofest.controller;

import com.ecofeast.restaurant_ecofest.model.RewardTransaction;
import com.ecofeast.restaurant_ecofest.service.RewardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RewardController {

    private final RewardService rewardService;

    @GetMapping("/balance/{userId}")
    public int getBalance(@PathVariable Long userId) {
        return rewardService.getBalance(userId);
    }

    @GetMapping("/history/{userId}")
    public List<RewardTransaction> history(@PathVariable Long userId) {
        return rewardService.history(userId);
    }

    @PostMapping("/submit")
    public RewardTransaction submitActivity(
            @RequestParam Long userId,
            @RequestParam String activityType,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile image) {
        return rewardService.submitActivity(userId, activityType, description, image);
    }
}