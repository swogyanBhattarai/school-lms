package com.justdeepfried.GyanJyotiLMS.entities.schoolClass.controller;

import com.justdeepfried.GyanJyotiLMS.entities.schoolClass.dtos.SchoolClassCreate;
import com.justdeepfried.GyanJyotiLMS.entities.schoolClass.dtos.SchoolClassUpdate;
import com.justdeepfried.GyanJyotiLMS.entities.schoolClass.model.SchoolClassModel;
import com.justdeepfried.GyanJyotiLMS.entities.schoolClass.service.SchoolClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/school-class")
@RequiredArgsConstructor
public class SchoolClassController {

    private final SchoolClassService schoolClassService;

    @GetMapping
    public ResponseEntity<List<SchoolClassModel>> findAll() {
        return ResponseEntity.ok(schoolClassService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchoolClassModel> findById(@PathVariable Long id) {
        return ResponseEntity.ok(schoolClassService.findById(id));
    }

    @PostMapping
    public ResponseEntity<SchoolClassModel> create(@RequestBody SchoolClassCreate creation) {
        return ResponseEntity.ok(schoolClassService.save(creation.grade(), creation.academicYearId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SchoolClassModel> update(@PathVariable Long id, @RequestBody SchoolClassUpdate update) {
        return ResponseEntity.ok(schoolClassService.editSchoolClass(update.grade(), id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        schoolClassService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
