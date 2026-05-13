package com.justdeepfried.GyanJyotiLMS.entities.subject.controller;

import com.justdeepfried.GyanJyotiLMS.entities.subject.model.SubjectModel;
import com.justdeepfried.GyanJyotiLMS.entities.subject.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subject")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;

    @GetMapping
    public ResponseEntity<List<SubjectModel>> findAll() {
        return ResponseEntity.ok(subjectService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectModel> findById(@PathVariable Long id) {
        return ResponseEntity.ok(subjectService.findById(id));
    }

    @PostMapping
    public ResponseEntity<SubjectModel> create(@RequestBody SubjectModel subject) {
        return ResponseEntity.ok(subjectService.save(subject.getSubjectName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        subjectService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
