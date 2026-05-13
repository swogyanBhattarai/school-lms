package com.justdeepfried.GyanJyotiLMS.entities.academicYear.dtos;

import com.justdeepfried.GyanJyotiLMS.entities.section.model.SectionModel;

public record YearClassSectionResponse (
        Long sectionId,
        String sectionName
) {
    public static YearClassSectionResponse from(SectionModel sectionModel) {
        return new YearClassSectionResponse(
                sectionModel.getSectionId(),
                sectionModel.getSectionName()
        );
    }
}
