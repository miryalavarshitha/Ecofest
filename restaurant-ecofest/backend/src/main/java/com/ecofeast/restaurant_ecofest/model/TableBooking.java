package com.ecofeast.restaurant_ecofest.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "table_bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TableBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime bookingTime;

    private Integer numberOfPeople;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private String specialRequests;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
