package com.justdeepfried.GyanJyotiLMS.entities.parent.model;

import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolFilterPropagator;
import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolModel;
import com.justdeepfried.GyanJyotiLMS.entities.student.model.StudentModel;
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
public class ParentModel extends SchoolFilterPropagator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long parentId;

    private String parentName;

    private String parentNumber;

    @ManyToMany(mappedBy = "parents")
    private List<StudentModel> children = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolModel school;
}
