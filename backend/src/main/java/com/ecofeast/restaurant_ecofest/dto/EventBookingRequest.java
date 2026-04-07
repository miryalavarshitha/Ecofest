// EventBookingRequest.java - CORRECTED
package com.ecofeast.restaurant_ecofest.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class EventBookingRequest {

    @NotNull
    private Long userId;

    @NotBlank
    private String eventType;

    @NotNull
    @Future
    private LocalDateTime eventDateTime;

    @NotNull
    @Min(1)
    private Integer guestCount;

    @NotNull
    @Min(0)
    private Double totalAmount;
}