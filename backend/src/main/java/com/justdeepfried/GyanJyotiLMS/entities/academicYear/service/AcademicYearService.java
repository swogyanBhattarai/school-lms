package com.justdeepfried.GyanJyotiLMS.entities.academicYear.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.justdeepfried.GyanJyotiLMS.entities.academicYear.dtos.AcademicYearCreate;
import com.justdeepfried.GyanJyotiLMS.entities.academicYear.dtos.AcademicYearResponse;
import com.justdeepfried.GyanJyotiLMS.entities.academicYear.model.AcademicYearModel;
import com.justdeepfried.GyanJyotiLMS.entities.academicYear.repository.AcademicYearRepo;
import com.justdeepfried.GyanJyotiLMS.entities.school.context.SchoolContext;
import com.justdeepfried.GyanJyotiLMS.entities.school.service.SchoolService;
import com.justdeepfried.GyanJyotiLMS.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AcademicYearService {

    private final AcademicYearRepo academicYearRepo;
    private final SchoolService schoolService;

    @Transactional(readOnly = true)
    public List<AcademicYearResponse> findAll() {
        return academicYearRepo.findAll()
                .stream().map(AcademicYearResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public AcademicYearModel findById(Long id) {
        return academicYearRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Academic Year not found with id: " + id));
    }

    public AcademicYearResponse createAcademicYear(AcademicYearCreate yearCreate) {
        AcademicYearModel yearModel = new AcademicYearModel();
        yearModel.setAcademicYear(yearCreate.academicYear());
        yearModel.setStartDate(yearCreate.startDate());
        yearModel.setEndDate(yearCreate.endDate());
        yearModel.setSchool(schoolService.findById(SchoolContext.get()));
        return AcademicYearResponse.from(academicYearRepo.save(yearModel));
    }

    public AcademicYearModel editAcademicYear(Long academicYearId, AcademicYearCreate yearUpdate) {
        AcademicYearModel yearModel = academicYearRepo.findById(academicYearId).orElseThrow(() -> new ResourceNotFoundException("Academic Year not found with id: " + academicYearId));
        yearModel.setAcademicYear(yearUpdate.academicYear());
        yearModel.setStartDate(yearUpdate.startDate());
        yearModel.setEndDate(yearUpdate.endDate());
        return academicYearRepo.save(yearModel);
    }

    public void deleteById(Long academicYearId) {
        academicYearRepo.deleteById(academicYearId);
    }
}
