package com.justdeepfried.GyanJyotiLMS.entities.subject.service;

import com.justdeepfried.GyanJyotiLMS.entities.school.context.SchoolContext;
import com.justdeepfried.GyanJyotiLMS.entities.school.service.SchoolService;
import com.justdeepfried.GyanJyotiLMS.entities.subject.model.SubjectModel;
import com.justdeepfried.GyanJyotiLMS.entities.subject.repository.SubjectRepo;
import com.justdeepfried.GyanJyotiLMS.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepo subjectRepo;
    private final SchoolService schoolService;

    @Transactional(readOnly = true)
    public List<SubjectModel> findAll() {
        return subjectRepo.findAll();
    }

    @Transactional(readOnly = true)
    public SubjectModel findById(Long id) {
        return subjectRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Subject not found with id: " + id));
    }

    public SubjectModel save(String subjectName) {
        SubjectModel subjectModel = new SubjectModel();
        subjectModel.setSubjectName(subjectName);
        subjectModel.setSchool(schoolService.findById(SchoolContext.get()));
        return subjectRepo.save(subjectModel);
    }

    public void deleteById(Long id) {
        subjectRepo.deleteById(id);
    }
}
