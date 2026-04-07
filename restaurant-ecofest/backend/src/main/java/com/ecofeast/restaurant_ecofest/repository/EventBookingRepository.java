package com.ecofeast.restaurant_ecofest.repository;

import com.ecofeast.restaurant_ecofest.model.EventBooking;
import com.ecofeast.restaurant_ecofest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventBookingRepository extends JpaRepository<EventBooking, Long> {
    List<EventBooking> findByUser(User user);
}
