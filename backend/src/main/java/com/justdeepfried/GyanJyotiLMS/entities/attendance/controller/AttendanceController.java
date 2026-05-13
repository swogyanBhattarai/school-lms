package com.justdeepfried.GyanJyotiLMS.entities.attendance.controller;

import com.justdeepfried.GyanJyotiLMS.entities.attendance.model.AttendanceModel;
import com.justdeepfried.GyanJyotiLMS.entities.attendance.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping
    public ResponseEntity<List<AttendanceModel>> findAll() {
        return ResponseEntity.ok(attendanceService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceModel> findById(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.findById(id));
    }

    @PostMapping
    public ResponseEntity<AttendanceModel> create(@RequestBody AttendanceModel attendance) {
        return ResponseEntity.ok(attendanceService.save(attendance));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        attendanceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
