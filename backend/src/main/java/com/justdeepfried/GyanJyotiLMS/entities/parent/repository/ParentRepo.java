package com.justdeepfried.GyanJyotiLMS.entities.parent.repository;

import com.justdeepfried.GyanJyotiLMS.entities.parent.model.ParentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParentRepo extends JpaRepository<ParentModel, Long> {
    Optional<ParentModel> findByParentNumber(String phoneNumber);
}
