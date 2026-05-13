package com.justdeepfried.GyanJyotiLMS.entities.student.service;

import com.justdeepfried.GyanJyotiLMS.entities.parent.dtos.ParentCreate;
import com.justdeepfried.GyanJyotiLMS.entities.parent.model.ParentModel;
import com.justdeepfried.GyanJyotiLMS.entities.parent.service.ParentService;
import com.justdeepfried.GyanJyotiLMS.entities.school.context.SchoolContext;
import com.justdeepfried.GyanJyotiLMS.entities.school.service.SchoolService;
import com.justdeepfried.GyanJyotiLMS.entities.section.service.SectionService;
import com.justdeepfried.GyanJyotiLMS.entities.student.dtos.StudentCreate;
import com.justdeepfried.GyanJyotiLMS.entities.student.model.StudentModel;
import com.justdeepfried.GyanJyotiLMS.entities.student.repository.StudentRepo;
import com.justdeepfried.GyanJyotiLMS.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepo studentRepo;
    private final SectionService sectionService;
    private final SchoolService schoolService;
    private final ParentService parentService;

    @Transactional(readOnly = true)
    public List<StudentModel> findAll() {
        return studentRepo.findAll();
    }

    @Transactional(readOnly = true)
    public StudentModel findById(Long id) {
        return studentRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public StudentModel createStudent(StudentCreate student, Long sectionId) {
        StudentModel studentModel = new StudentModel();
        studentModel.setStudentName(student.studentName());

        if (student.parentName1() != null && student.parentPhoneNumber1() != null) {
            ParentCreate parentCreate1 = new ParentCreate(student.parentName1(), student.parentPhoneNumber1());
            ParentModel parentModel = parentService.createParent(parentCreate1);
            studentModel.getParents().add()
        }

        studentModel.setSection(sectionService.findModelById(sectionId));
        studentModel.setSchool(schoolService.findById(SchoolContext.get()));
        return studentRepo.save(studentModel);
    }

    public void deleteById(Long id) {
        studentRepo.deleteById(id);
    }
}
