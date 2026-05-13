package com.justdeepfried.GyanJyotiLMS.entities.attendance.repository;

import com.justdeepfried.GyanJyotiLMS.entities.attendance.model.AttendanceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepo extends JpaRepository<AttendanceModel, Long> {
}
