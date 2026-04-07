package com.ecofeast.restaurant_ecofest.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reward_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RewardTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer pointsChange;
    private String reason;
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
