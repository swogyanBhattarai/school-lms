package com.justdeepfried.GyanJyotiLMS.entities.section.dto;

import com.justdeepfried.GyanJyotiLMS.entities.student.model.StudentModel;

public record SectionStudentResponse (
        Long studentId,
        String studentName
) {
    public static SectionStudentResponse from(StudentModel studentModel) {
        return new SectionStudentResponse(
                studentModel.getStudentId(),
                studentModel.getStudentName()
        );
    }
}
