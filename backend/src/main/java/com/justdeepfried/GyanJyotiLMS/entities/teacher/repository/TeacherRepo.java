package com.justdeepfried.GyanJyotiLMS.entities.teacher.repository;

import com.justdeepfried.GyanJyotiLMS.entities.teacher.model.TeacherModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepo extends JpaRepository<TeacherModel, Long> {
}
