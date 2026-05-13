package com.justdeepfried.GyanJyotiLMS.entities.section.controller;

import com.justdeepfried.GyanJyotiLMS.entities.section.dto.SectionCreate;
import com.justdeepfried.GyanJyotiLMS.entities.section.dto.SectionResponse;
import com.justdeepfried.GyanJyotiLMS.entities.section.dto.SectionUpdate;
import com.justdeepfried.GyanJyotiLMS.entities.section.model.SectionModel;
import com.justdeepfried.GyanJyotiLMS.entities.section.service.SectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/section")
@RequiredArgsConstructor
public class SectionController {

    private final SectionService sectionService;

    @GetMapping
    public ResponseEntity<List<SectionResponse>> findAll() {
        return ResponseEntity.ok(sectionService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SectionResponse> findById(@PathVariable Long id) {
        return ResponseEntity.ok(sectionService.findById(id));
    }

    @GetMapping("/class/{id}")
    public ResponseEntity<List<SectionResponse>> findBySchoolClassId(@PathVariable("id") Long schoolClassId) {
        return ResponseEntity.ok(sectionService.findAllBySchoolClassId(schoolClassId));
    }

    @PostMapping
    public ResponseEntity<SectionModel> create(@RequestBody SectionCreate sectionCreate) {
        return ResponseEntity.ok(sectionService.createSection(sectionCreate.sectionName(), sectionCreate.classId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SectionModel> update(@PathVariable Long id, @RequestBody SectionUpdate sectionUpdate) {
        return ResponseEntity.ok(sectionService.updateSection(id, sectionUpdate));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        sectionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
