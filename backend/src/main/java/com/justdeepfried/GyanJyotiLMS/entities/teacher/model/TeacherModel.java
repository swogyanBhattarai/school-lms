package com.justdeepfried.GyanJyotiLMS.entities.teacher.model;

import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolFilterPropagator;
import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolModel;
import com.justdeepfried.GyanJyotiLMS.entities.classAssignment.model.ClassAssignmentModel;
import com.justdeepfried.GyanJyotiLMS.enums.TEACHER_ROLES;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Filter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@Filter(name = "schoolIdFilter", condition = "school_id = :schoolId")
public class TeacherModel extends SchoolFilterPropagator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long teacherId;

    private String teacherName;

    private String teacherPhoneNumber;

    @Enumerated(EnumType.STRING)
    private TEACHER_ROLES teacherRole;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClassAssignmentModel> classAssignments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolModel school;
}
