package com.justdeepfried.GyanJyotiLMS.entities.school.repository;

import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolRepo extends JpaRepository<SchoolModel, Long> {
}
