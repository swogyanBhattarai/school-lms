package com.justdeepfried.GyanJyotiLMS.entities.academicYear.dtos;

import com.justdeepfried.GyanJyotiLMS.entities.academicYear.model.AcademicYearModel;

import java.util.List;

public record AcademicYearResponse (
        Long academicYearId,
        String academicYear,
        String startDate,
        String endDate,
        List<YearClassResponse> classes
) {
    public static AcademicYearResponse from(AcademicYearModel yearModel) {
        return new AcademicYearResponse(
                yearModel.getAcademicYearId(),
                yearModel.getAcademicYear(),
                yearModel.getStartDate(),
                yearModel.getEndDate(),
                yearModel.getClasses()
                        .stream()
                        .map(YearClassResponse::from)
                        .toList()
        );
    }

    public static AcademicYearResponse from(AcademicYearModel yearModel, List<YearClassResponse> yearClassResponses) {
        return new AcademicYearResponse(
                yearModel.getAcademicYearId(),
                yearModel.getAcademicYear(),
                yearModel.getStartDate(),
                yearModel.getEndDate(),
                yearClassResponses
        );
    }
}
