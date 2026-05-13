package com.justdeepfried.GyanJyotiLMS.entities.student.model;

import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolFilterPropagator;
import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolModel;
import com.justdeepfried.GyanJyotiLMS.entities.parent.model.ParentModel;
import com.justdeepfried.GyanJyotiLMS.entities.section.model.SectionModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Filter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@Filter(name = "schoolIdFilter", condition = "school_id = :schoolId")
public class StudentModel extends SchoolFilterPropagator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long studentId;

    private String studentName;

    @ManyToOne
    @JoinColumn(name = "section_id")
    private SectionModel section;

    @ManyToMany
    @JoinTable(
            name = "student_parents",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "parent_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "parent_id"})
    )
    private Set<ParentModel> parents = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolModel school;
}
