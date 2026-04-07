package com.ecofeast.restaurant_ecofest.service;

import com.ecofeast.restaurant_ecofest.dto.ComplaintRequest;
import com.ecofeast.restaurant_ecofest.model.Complaint;
import com.ecofeast.restaurant_ecofest.repository.ComplaintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ComplaintService {
    private final ComplaintRepository complaintRepository;

    public Complaint fileComplaint(ComplaintRequest request) {
        Complaint complaint = Complaint.builder()
                .userId(request.getUserId())
                .message(request.getMessage())
                .status("OPEN")
                .createdAt(LocalDateTime.now())
                .build();
        return complaintRepository.save(complaint);
    }
}
