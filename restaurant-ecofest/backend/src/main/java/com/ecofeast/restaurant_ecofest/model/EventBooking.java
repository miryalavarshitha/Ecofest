package com.ecofeast.restaurant_ecofest.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "event_bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventType;   // e.g., Birthday, Corporate, Wedding
    private LocalDateTime eventDateTime;
    private Integer guestCount;

    private Double totalAmount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
}
