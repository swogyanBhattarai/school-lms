package com.justdeepfried.GyanJyotiLMS.entities.student.repository;

import com.justdeepfried.GyanJyotiLMS.entities.student.model.StudentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<StudentModel, Long> {
}
