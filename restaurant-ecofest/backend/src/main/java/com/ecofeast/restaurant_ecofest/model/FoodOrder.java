package com.ecofeast.restaurant_ecofest.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "food_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Simplified: one string instead of items table
    private String itemsDescription; // e.g., "Pizza x1, Pasta x2"

    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private LocalDateTime orderedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}