package com.justdeepfried.GyanJyotiLMS.entities.teacher.controller;

import com.justdeepfried.GyanJyotiLMS.entities.teacher.model.TeacherModel;
import com.justdeepfried.GyanJyotiLMS.entities.teacher.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @GetMapping
    public ResponseEntity<List<TeacherModel>> findAll() {
        return ResponseEntity.ok(teacherService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherModel> findById(@PathVariable Long id) {
        return ResponseEntity.ok(teacherService.findById(id));
    }

    @PostMapping
    public ResponseEntity<TeacherModel> create(@RequestBody TeacherModel teacher) {
        return ResponseEntity.ok(teacherService.save(teacher.getTeacherName(), teacher.getTeacherPhoneNumber()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        teacherService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
