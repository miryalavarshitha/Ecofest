package com.ecofeast.restaurant_ecofest.controller;

import com.ecofeast.restaurant_ecofest.dto.ApiResponse;
import com.ecofeast.restaurant_ecofest.dto.LoginRequest;
import com.ecofeast.restaurant_ecofest.dto.SignupRequest;
import com.ecofeast.restaurant_ecofest.model.User;
import com.ecofeast.restaurant_ecofest.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public User signup(@Valid @RequestBody SignupRequest request) {
        return authService.signup(request);
    }

    @PostMapping("/login")
    public User login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/health")
    public ApiResponse health() {
        return new ApiResponse("Auth service up");
    }
}
