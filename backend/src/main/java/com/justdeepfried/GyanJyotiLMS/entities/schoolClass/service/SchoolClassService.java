package com.justdeepfried.GyanJyotiLMS.entities.schoolClass.service;

import com.justdeepfried.GyanJyotiLMS.entities.academicYear.service.AcademicYearService;
import com.justdeepfried.GyanJyotiLMS.entities.school.context.SchoolContext;
import com.justdeepfried.GyanJyotiLMS.entities.school.service.SchoolService;
import com.justdeepfried.GyanJyotiLMS.entities.schoolClass.model.SchoolClassModel;
import com.justdeepfried.GyanJyotiLMS.entities.schoolClass.repository.StudentClassRepo;
import com.justdeepfried.GyanJyotiLMS.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SchoolClassService {

    private final StudentClassRepo studentClassRepo;
    private final AcademicYearService academicYearService;
    private final SchoolService schoolService;

    @Transactional(readOnly = true)
    public List<SchoolClassModel> findAll() {
        return studentClassRepo.findAll();
    }

    @Transactional(readOnly = true)
    public SchoolClassModel findById(Long id) {
        return studentClassRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("School Class not found with id: " + id));
    }

    public SchoolClassModel save(String grade, Long academicYearId) {
        SchoolClassModel schoolClass = new SchoolClassModel();
        schoolClass.setGrade(grade);
        schoolClass.setSchool(schoolService.findById(SchoolContext.get()));
        schoolClass.setAcademicYear(academicYearService.findById(academicYearId));
        return studentClassRepo.save(schoolClass);
    }

    public SchoolClassModel editSchoolClass(String grade, Long schoolClassId) {
        SchoolClassModel classModel = studentClassRepo.findById(schoolClassId).orElseThrow(() -> new ResourceNotFoundException("School Class not found with id: " + schoolClassId));
        classModel.setGrade(grade);
        return studentClassRepo.save(classModel);
    }

    public void deleteById(Long id) {
        studentClassRepo.deleteById(id);
    }
}
