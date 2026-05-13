package com.justdeepfried.GyanJyotiLMS.entities.section.dto;

import com.justdeepfried.GyanJyotiLMS.entities.classAssignment.dtos.ClassAssignmentResponse;
import com.justdeepfried.GyanJyotiLMS.entities.classAssignment.model.ClassAssignmentModel;
import com.justdeepfried.GyanJyotiLMS.entities.section.model.SectionModel;

import java.util.List;

public record SectionResponse (
        Long sectionId,
        String sectionName,
        List<SectionStudentResponse> students,
        List<ClassAssignmentResponse> classAssignments,
        String grade
) {
    public static SectionResponse from(SectionModel section) {
        return new SectionResponse(
                section.getSectionId(),
                section.getSectionName(),
                section.getStudents()
                        .stream()
                        .map(SectionStudentResponse::from)
                        .toList(),
                section.getClassAssignments()
                        .stream()
                        .map(ClassAssignmentResponse::from)
                        .toList(),
                section.getSchoolClass().getGrade()
        );
    }
}
