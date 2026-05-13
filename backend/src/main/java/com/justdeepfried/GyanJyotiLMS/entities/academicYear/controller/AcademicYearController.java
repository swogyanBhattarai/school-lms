package com.justdeepfried.GyanJyotiLMS.entities.academicYear.controller;

import com.justdeepfried.GyanJyotiLMS.entities.academicYear.dtos.AcademicYearCreate;
import com.justdeepfried.GyanJyotiLMS.entities.academicYear.dtos.AcademicYearResponse;
import com.justdeepfried.GyanJyotiLMS.entities.academicYear.model.AcademicYearModel;
import com.justdeepfried.GyanJyotiLMS.entities.academicYear.service.AcademicYearService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic-year")
@RequiredArgsConstructor
public class AcademicYearController {

    private final AcademicYearService academicYearService;

    @GetMapping
    public ResponseEntity<List<AcademicYearResponse>> findAll() {
        return ResponseEntity.ok(academicYearService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcademicYearModel> findById(@PathVariable Long id) {
        return ResponseEntity.ok(academicYearService.findById(id));
    }

    @PostMapping
    public ResponseEntity<AcademicYearResponse> create(@RequestBody AcademicYearCreate academicYear) {
        return ResponseEntity.ok(academicYearService.createAcademicYear(academicYear));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AcademicYearModel> update(@PathVariable Long id, @RequestBody AcademicYearCreate update) {
        return ResponseEntity.ok(academicYearService.editAcademicYear(id, update));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        academicYearService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
