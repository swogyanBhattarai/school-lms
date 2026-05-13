package com.justdeepfried.GyanJyotiLMS.entities.section.service;

import com.justdeepfried.GyanJyotiLMS.entities.school.context.SchoolContext;
import com.justdeepfried.GyanJyotiLMS.entities.school.service.SchoolService;
import com.justdeepfried.GyanJyotiLMS.entities.schoolClass.service.SchoolClassService;
import com.justdeepfried.GyanJyotiLMS.entities.section.dto.SectionResponse;
import com.justdeepfried.GyanJyotiLMS.entities.section.dto.SectionUpdate;
import com.justdeepfried.GyanJyotiLMS.entities.section.model.SectionModel;
import com.justdeepfried.GyanJyotiLMS.entities.section.repository.SectionRepo;
import com.justdeepfried.GyanJyotiLMS.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SectionService {

    private final SectionRepo sectionRepo;
    private final SchoolClassService classService;
    private final SchoolService schoolService;

    @Transactional(readOnly = true)
    public List<SectionResponse> findAll() {
        return sectionRepo.findAll().stream().map(SectionResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public List<SectionResponse> findAllBySchoolClassId(Long schoolClassId) {
        return sectionRepo.findAllBySchoolClass_SchoolClassId(schoolClassId).stream().map(SectionResponse::from).toList();
    }

    @Transactional(readOnly = true)
    public SectionResponse findById(Long id) {
        SectionModel sectionModel = sectionRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Section not found with id: " + id));
        return SectionResponse.from(sectionModel);
    }

    @Transactional(readOnly = true)
    public SectionModel findModelById(Long id) {
        return sectionRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Section not found with id: " + id));
    }

    public SectionModel createSection(String sectionName, Long classId) {
        SectionModel sectionModel = new SectionModel();
        sectionModel.setSchoolClass(classService.findById(classId));
        sectionModel.setSectionName(sectionName);
        sectionModel.setSchool(schoolService.findById(SchoolContext.get()));
        return sectionRepo.save(sectionModel);
    }

    public SectionModel updateSection(Long id, SectionUpdate sectionUpdate) {
        SectionModel sectionModel = findModelById(id);
        sectionModel.setSectionName(sectionUpdate.sectionName());
        return sectionRepo.save(sectionModel);
    }

    public void deleteById(Long id) {
        sectionRepo.deleteById(id);
    }
}
