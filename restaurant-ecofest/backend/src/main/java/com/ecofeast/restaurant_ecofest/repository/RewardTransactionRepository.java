package com.ecofeast.restaurant_ecofest.repository;

import com.ecofeast.restaurant_ecofest.model.RewardTransaction;
import com.ecofeast.restaurant_ecofest.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RewardTransactionRepository extends JpaRepository<RewardTransaction, Long> {
    List<RewardTransaction> findByUser(User user);
}
