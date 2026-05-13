package com.justdeepfried.GyanJyotiLMS.entities.student.controller;

import com.justdeepfried.GyanJyotiLMS.entities.student.dtos.StudentCreate;
import com.justdeepfried.GyanJyotiLMS.entities.student.model.StudentModel;
import com.justdeepfried.GyanJyotiLMS.entities.student.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public ResponseEntity<List<StudentModel>> findAll() {
        return ResponseEntity.ok(studentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentModel> findById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.findById(id));
    }

    @PostMapping("/{id}")
    public ResponseEntity<StudentModel> create(@RequestBody StudentCreate student, @PathVariable("id") Long sectionId) {
        return ResponseEntity.ok(studentService.createStudent(student, sectionId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        studentService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
