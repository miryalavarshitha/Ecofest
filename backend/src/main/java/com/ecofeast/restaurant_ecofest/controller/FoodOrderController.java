package com.ecofeast.restaurant_ecofest.controller;

import com.ecofeast.restaurant_ecofest.dto.ApiResponse;
import com.ecofeast.restaurant_ecofest.dto.FoodOrderRequest;
import com.ecofeast.restaurant_ecofest.model.FoodOrder;
import com.ecofeast.restaurant_ecofest.service.FoodOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class FoodOrderController {

    private final FoodOrderService foodOrderService;

    @PostMapping
    public ApiResponse placeOrder(@Valid @RequestBody FoodOrderRequest request) {
        FoodOrder saved = foodOrderService.placeOrder(request);
        return new ApiResponse("Order placed successfully. Order #" + saved.getId());
    }
}
