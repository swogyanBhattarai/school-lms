package com.justdeepfried.GyanJyotiLMS.entities.classAssignment.service;

import com.justdeepfried.GyanJyotiLMS.entities.classAssignment.dtos.ClassAssignmentResponse;
import com.justdeepfried.GyanJyotiLMS.entities.classAssignment.model.ClassAssignmentModel;
import com.justdeepfried.GyanJyotiLMS.entities.classAssignment.repository.ClassAssignmentRepo;
import com.justdeepfried.GyanJyotiLMS.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ClassAssignmentService {

    private final ClassAssignmentRepo classAssignmentRepo;

    @Transactional(readOnly = true)
    public List<ClassAssignmentModel> findAll() {
        return classAssignmentRepo.findAll();
    }

    @Transactional(readOnly = true)
    public List<ClassAssignmentResponse> findAllBySectionId(Long sectionId) {
        return classAssignmentRepo.findAllBySection_SectionId(sectionId).stream()
                .map(ClassAssignmentResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public ClassAssignmentModel findById(Long id) {
        return classAssignmentRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Class Assignment not found with id: " + id));
    }

    public ClassAssignmentModel save(ClassAssignmentModel classAssignment) {
        return classAssignmentRepo.save(classAssignment);
    }

    public void deleteById(Long id) {
        classAssignmentRepo.deleteById(id);
    }
}
