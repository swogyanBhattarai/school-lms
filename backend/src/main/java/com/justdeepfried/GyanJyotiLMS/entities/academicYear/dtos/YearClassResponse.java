package com.justdeepfried.GyanJyotiLMS.entities.academicYear.dtos;

import com.justdeepfried.GyanJyotiLMS.entities.schoolClass.model.SchoolClassModel;
import com.justdeepfried.GyanJyotiLMS.entities.section.model.SectionModel;

import java.util.List;

public record YearClassResponse (
        Long schoolClassId,
        String grade,
        List<YearClassSectionResponse> sections
){
    public static YearClassResponse from(SchoolClassModel schoolClassModel) {
        return new YearClassResponse(
                schoolClassModel.getSchoolClassId(),
                schoolClassModel.getGrade(),
                schoolClassModel.getSections()
                        .stream().map(YearClassSectionResponse::from)
                        .toList()
        );
    }
}
