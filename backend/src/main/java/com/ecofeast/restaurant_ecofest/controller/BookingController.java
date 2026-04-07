package com.ecofeast.restaurant_ecofest.controller;

import com.ecofeast.restaurant_ecofest.dto.EventBookingRequest;
import com.ecofeast.restaurant_ecofest.dto.TableBookingRequest;
import com.ecofeast.restaurant_ecofest.model.EventBooking;
import com.ecofeast.restaurant_ecofest.model.TableBooking;
import com.ecofeast.restaurant_ecofest.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping("/table")
    public TableBooking bookTable(@Valid @RequestBody TableBookingRequest request) {
        return bookingService.bookTable(request);
    }

    @PostMapping("/event")
    public EventBooking bookEvent(@Valid @RequestBody EventBookingRequest request) {
        return bookingService.bookEvent(request);
    }
}
