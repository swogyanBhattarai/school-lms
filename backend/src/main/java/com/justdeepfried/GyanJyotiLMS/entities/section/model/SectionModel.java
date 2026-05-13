package com.justdeepfried.GyanJyotiLMS.entities.section.model;

import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolFilterPropagator;
import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolModel;
import com.justdeepfried.GyanJyotiLMS.entities.classAssignment.model.ClassAssignmentModel;
import com.justdeepfried.GyanJyotiLMS.entities.schoolClass.model.SchoolClassModel;
import com.justdeepfried.GyanJyotiLMS.entities.student.model.StudentModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Filter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Setter
@Getter
@Filter(name = "schoolIdFilter", condition = "school_id = :schoolId")
public class SectionModel extends SchoolFilterPropagator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long sectionId;

    private String sectionName;

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentModel> students = new ArrayList<>();

    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClassAssignmentModel> classAssignments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "schoolClass_id")
    private SchoolClassModel schoolClass;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolModel school;
}
