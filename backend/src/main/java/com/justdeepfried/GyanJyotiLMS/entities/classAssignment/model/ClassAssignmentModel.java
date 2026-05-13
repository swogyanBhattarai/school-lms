package com.justdeepfried.GyanJyotiLMS.entities.classAssignment.model;

import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolFilterPropagator;
import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolModel;
import com.justdeepfried.GyanJyotiLMS.entities.section.model.SectionModel;
import com.justdeepfried.GyanJyotiLMS.entities.subject.model.SubjectModel;
import com.justdeepfried.GyanJyotiLMS.entities.teacher.model.TeacherModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Filter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Setter
@Getter
@NamedEntityGraphs(
        {
                @NamedEntityGraph(
                        name = "classAssignment.teacherSubject",
                        attributeNodes = {
                                @NamedAttributeNode(value = "teacher"),
                                @NamedAttributeNode(value = "subject")
                        }
                        ),
                @NamedEntityGraph(
                        name = "classAssignment.teacherSubjectSection",
                        attributeNodes = {
                                @NamedAttributeNode(value = "teacher"),
                                @NamedAttributeNode(value = "subject"),
                                @NamedAttributeNode(value = "section")
                        }
                )
        }
)

@Filter(name = "schoolIdFilter", condition = "school_id = :schoolId")
public class ClassAssignmentModel extends SchoolFilterPropagator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long classAssignmentId;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private TeacherModel teacher;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private SubjectModel subject;

    @ManyToOne
    @JoinColumn(name = "section_id")
    private SectionModel section;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolModel school;
}
