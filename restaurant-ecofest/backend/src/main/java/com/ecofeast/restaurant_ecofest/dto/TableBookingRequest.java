package com.ecofeast.restaurant_ecofest.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TableBookingRequest {

    @NotNull
    private Long userId;

    @NotNull
    @Future
    private LocalDateTime bookingTime;

    @NotNull
    @Min(1)
    private Integer numberOfPeople;

    private String specialRequests;
}
