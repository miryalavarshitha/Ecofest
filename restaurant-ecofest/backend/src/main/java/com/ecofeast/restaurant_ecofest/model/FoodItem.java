package com.ecofeast.restaurant_ecofest.model;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "food_items")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String cuisine;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private Integer calories;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private Set<String> tags = new HashSet<>();
}
