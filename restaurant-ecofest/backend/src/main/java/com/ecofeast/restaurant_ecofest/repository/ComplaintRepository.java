package com.ecofeast.restaurant_ecofest.repository;

import com.ecofeast.restaurant_ecofest.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
}
