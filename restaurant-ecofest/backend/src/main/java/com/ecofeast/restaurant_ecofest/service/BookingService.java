package com.ecofeast.restaurant_ecofest.service;

import com.ecofeast.restaurant_ecofest.dto.EventBookingRequest;
import com.ecofeast.restaurant_ecofest.dto.TableBookingRequest;
import com.ecofeast.restaurant_ecofest.model.*;
import com.ecofeast.restaurant_ecofest.repository.EventBookingRepository;
import com.ecofeast.restaurant_ecofest.repository.TableBookingRepository;
import com.ecofeast.restaurant_ecofest.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final UserRepository userRepository;
    private final TableBookingRepository tableBookingRepository;
    private final EventBookingRepository eventBookingRepository;
    private final RewardService rewardService;

    public TableBooking bookTable(TableBookingRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        TableBooking booking = TableBooking.builder()
                .user(user)
                .bookingTime(request.getBookingTime())
                .numberOfPeople(request.getNumberOfPeople())
                .specialRequests(request.getSpecialRequests())
                .paymentStatus(PaymentStatus.PAID)
                .build();

        TableBooking saved = tableBookingRepository.save(booking);

        rewardService.addPoints(user, 10, "TABLE_BOOKING");
        return saved;
    }

    public EventBooking bookEvent(EventBookingRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        EventBooking booking = EventBooking.builder()
                .user(user)
                .eventType(request.getEventType())
                .eventDateTime(request.getEventDateTime())
                .guestCount(request.getGuestCount())
                .totalAmount(request.getTotalAmount())
                .paymentStatus(PaymentStatus.PAID)
                .build();

        EventBooking saved = eventBookingRepository.save(booking);

        int points = (int) (request.getTotalAmount() / 100);
        rewardService.addPoints(user, points, "EVENT_BOOKING");
        return saved;
    }
}
