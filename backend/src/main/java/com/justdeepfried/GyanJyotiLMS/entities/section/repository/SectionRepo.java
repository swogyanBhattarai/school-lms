package com.justdeepfried.GyanJyotiLMS.entities.section.repository;

import com.justdeepfried.GyanJyotiLMS.entities.section.model.SectionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SectionRepo extends JpaRepository<SectionModel, Long> {
    List<SectionModel> findAllBySchoolClass_SchoolClassId(Long schoolClassId);
}
