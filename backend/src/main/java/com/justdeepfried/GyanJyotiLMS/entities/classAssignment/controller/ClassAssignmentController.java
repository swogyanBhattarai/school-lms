package com.justdeepfried.GyanJyotiLMS.entities.classAssignment.controller;

import com.justdeepfried.GyanJyotiLMS.entities.classAssignment.dtos.ClassAssignmentResponse;
import com.justdeepfried.GyanJyotiLMS.entities.classAssignment.model.ClassAssignmentModel;
import com.justdeepfried.GyanJyotiLMS.entities.classAssignment.service.ClassAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/class-assignment")
@RequiredArgsConstructor
public class ClassAssignmentController {

    private final ClassAssignmentService classAssignmentService;

    @GetMapping
    public ResponseEntity<List<ClassAssignmentModel>> findAll() {
        return ResponseEntity.ok(classAssignmentService.findAll());
    }

    @GetMapping("/section/{id}")
    public ResponseEntity<List<ClassAssignmentResponse>> findAllBySectionId(@PathVariable("id") Long sectionId) {
        return ResponseEntity.ok(classAssignmentService.findAllBySectionId(sectionId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassAssignmentModel> findById(@PathVariable Long id) {
        return ResponseEntity.ok(classAssignmentService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ClassAssignmentModel> create(@RequestBody ClassAssignmentModel classAssignment) {
        return ResponseEntity.ok(classAssignmentService.save(classAssignment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        classAssignmentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
