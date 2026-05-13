package com.justdeepfried.GyanJyotiLMS.entities.school.model;

import jakarta.persistence.MappedSuperclass;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

@MappedSuperclass
@FilterDef(
        name = "schoolIdFilter",
        parameters = @ParamDef(name = "schoolId", type = Long.class)
)
public abstract class SchoolFilterPropagator {
}
