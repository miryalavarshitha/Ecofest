package com.ecofeast.restaurant_ecofest.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "food_donations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodDonation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String foodDetails;
    private Integer servings;        // how many people
    private LocalDateTime donationTime;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
