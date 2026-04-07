package com.ecofeast.restaurant_ecofest.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class EcoActivityRequest {

    @NotNull
    private Long userId;

    @NotBlank
    private String activityType;

    private String description;

    private MultipartFile image;
}

