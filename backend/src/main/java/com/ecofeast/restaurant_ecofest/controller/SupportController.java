package com.ecofeast.restaurant_ecofest.controller;

import com.ecofeast.restaurant_ecofest.dto.ApiResponse;
import com.ecofeast.restaurant_ecofest.dto.ComplaintRequest;
import com.ecofeast.restaurant_ecofest.model.Complaint;
import com.ecofeast.restaurant_ecofest.service.ComplaintService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class SupportController {

    private final ComplaintService complaintService;

    @PostMapping("/complaints")
    public ApiResponse fileComplaint(@Valid @RequestBody ComplaintRequest request) {
        Complaint complaint = complaintService.fileComplaint(request);
        return new ApiResponse("Complaint filed successfully. Ticket #" + complaint.getId());
    }
}
