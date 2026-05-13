package com.justdeepfried.GyanJyotiLMS.entities.attendance.model;

import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolFilterPropagator;
import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolModel;
import com.justdeepfried.GyanJyotiLMS.entities.section.model.SectionModel;
import com.justdeepfried.GyanJyotiLMS.entities.student.model.StudentModel;
import com.justdeepfried.GyanJyotiLMS.entities.user.model.UserModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Filter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;

@Entity
@Setter
@Getter
@Filter(name = "schoolIdFilter", condition = "school_id = :schoolId")
public class AttendanceModel extends SchoolFilterPropagator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long attendanceId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private StudentModel student;

    @ManyToOne
    @JoinColumn(name = "section_id")
    private SectionModel section;

    @CreatedDate
    private LocalDate attendanceDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel performedBy;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolModel school;
}
