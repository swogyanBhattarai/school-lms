package com.justdeepfried.GyanJyotiLMS.entities.schoolClass.dtos;


import com.justdeepfried.GyanJyotiLMS.entities.schoolClass.model.SchoolClassModel;
import com.justdeepfried.GyanJyotiLMS.entities.section.model.SectionModel;

import java.util.List;

public record SchoolClassResponse (
    Long schoolClassId,
    String grade,
    List<String> sectionNames
) {
    public static SchoolClassResponse from(SchoolClassModel schoolClassModel) {
        return new SchoolClassResponse(
                schoolClassModel.getSchoolClassId(),
                schoolClassModel.getGrade(),
                schoolClassModel.getSections().stream().map(SectionModel::getSectionName).toList()
        );
    }
}
