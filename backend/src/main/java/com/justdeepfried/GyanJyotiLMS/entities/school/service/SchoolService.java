package com.justdeepfried.GyanJyotiLMS.entities.school.service;

import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolModel;
import com.justdeepfried.GyanJyotiLMS.entities.school.repository.SchoolRepo;
import com.justdeepfried.GyanJyotiLMS.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SchoolService {

    private final SchoolRepo schoolRepo;

    public SchoolModel findById(Long schoolId) {
        return schoolRepo.findById(schoolId).orElseThrow(() -> new ResourceNotFoundException("School not found with id: " + schoolId));
    }
}
