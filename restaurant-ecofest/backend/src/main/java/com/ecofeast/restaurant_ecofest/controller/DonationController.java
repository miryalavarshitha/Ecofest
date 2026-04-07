package com.ecofeast.restaurant_ecofest.controller;

import com.ecofeast.restaurant_ecofest.dto.FoodDonationRequest;
import com.ecofeast.restaurant_ecofest.model.FoodDonation;
import com.ecofeast.restaurant_ecofest.service.DonationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/donations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DonationController {

    private final DonationService donationService;

    @PostMapping
    public FoodDonation donate(@Valid @RequestBody FoodDonationRequest request) {
        return donationService.donateFood(request);
    }
}
