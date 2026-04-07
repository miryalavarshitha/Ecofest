// AuthService.java - CORRECTED (remove duplicate constructor)
package com.ecofeast.restaurant_ecofest.service;

import com.ecofeast.restaurant_ecofest.dto.LoginRequest;
import com.ecofeast.restaurant_ecofest.dto.SignupRequest;
import com.ecofeast.restaurant_ecofest.model.Role;
import com.ecofeast.restaurant_ecofest.model.User;
import com.ecofeast.restaurant_ecofest.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .rewardPoints(0)
                .build();

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }
}