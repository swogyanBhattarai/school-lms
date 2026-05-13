package com.justdeepfried.GyanJyotiLMS.entities.classAssignment.dtos;

import com.justdeepfried.GyanJyotiLMS.entities.classAssignment.model.ClassAssignmentModel;
import com.justdeepfried.GyanJyotiLMS.enums.TEACHER_ROLES;

public record ClassAssignmentResponse (
        Long classAssignmentId,
        Long teacherId,
        String teacherName,
        TEACHER_ROLES teacherRole,
        Long subjectId,
        String subjectName
) {
    public static ClassAssignmentResponse from(ClassAssignmentModel assignmentModel) {
        return new ClassAssignmentResponse(
                assignmentModel.getClassAssignmentId(),
                assignmentModel.getTeacher().getTeacherId(),
                assignmentModel.getTeacher().getTeacherName(),
                assignmentModel.getTeacher().getTeacherRole(),
                assignmentModel.getSubject().getSubjectId(),
                assignmentModel.getSubject().getSubjectName()
        );
    }
}
