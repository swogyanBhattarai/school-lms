package com.justdeepfried.GyanJyotiLMS.entities.diary.model;

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

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Setter
@Getter
@Filter(name = "schoolIdFilter", condition = "school_id = :schoolId")
public class DiaryModel extends SchoolFilterPropagator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long diaryId;

    private LocalDate diaryDate;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private SubjectModel subject;

    private String content;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private TeacherModel createdBy;

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
