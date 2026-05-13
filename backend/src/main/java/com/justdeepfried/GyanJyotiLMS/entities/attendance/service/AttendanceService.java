package com.justdeepfried.GyanJyotiLMS.entities.attendance.service;

import com.justdeepfried.GyanJyotiLMS.entities.attendance.model.AttendanceModel;
import com.justdeepfried.GyanJyotiLMS.entities.attendance.repository.AttendanceRepo;
import com.justdeepfried.GyanJyotiLMS.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepo attendanceRepo;

    @Transactional(readOnly = true)
    public List<AttendanceModel> findAll() {
        return attendanceRepo.findAll();
    }

    @Transactional(readOnly = true)
    public AttendanceModel findById(Long id) {
        return attendanceRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Attendance record not found with id: " + id));
    }

    public AttendanceModel save(AttendanceModel attendance) {
        return attendanceRepo.save(attendance);
    }

    public void deleteById(Long id) {
        attendanceRepo.deleteById(id);
    }
}
