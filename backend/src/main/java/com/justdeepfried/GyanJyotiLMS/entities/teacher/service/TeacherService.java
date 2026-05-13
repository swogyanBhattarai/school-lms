package com.justdeepfried.GyanJyotiLMS.entities.teacher.service;

import com.justdeepfried.GyanJyotiLMS.entities.school.context.SchoolContext;
import com.justdeepfried.GyanJyotiLMS.entities.school.service.SchoolService;
import com.justdeepfried.GyanJyotiLMS.entities.teacher.model.TeacherModel;
import com.justdeepfried.GyanJyotiLMS.entities.teacher.repository.TeacherRepo;
import com.justdeepfried.GyanJyotiLMS.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TeacherService {

    private final TeacherRepo teacherRepo;
    private final SchoolService schoolService;

    @Transactional(readOnly = true)
    public List<TeacherModel> findAll() {
        return teacherRepo.findAll();
    }

    @Transactional(readOnly = true)
    public TeacherModel findById(Long id) {
        return teacherRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Teacher not found with id: " + id));
    }

    public TeacherModel save(String teacherName, String teacherPhoneNumber) {
        TeacherModel teacherModel = new TeacherModel();
        teacherModel.setTeacherName(teacherName);
        teacherModel.setTeacherPhoneNumber(teacherPhoneNumber);
        teacherModel.setSchool(schoolService.findById(SchoolContext.get()));
        return teacherRepo.save(teacherModel);
    }

    public void deleteById(Long id) {
        teacherRepo.deleteById(id);
    }
}
