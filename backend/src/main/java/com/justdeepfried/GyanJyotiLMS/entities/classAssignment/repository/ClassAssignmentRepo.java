package com.justdeepfried.GyanJyotiLMS.entities.classAssignment.repository;

import com.justdeepfried.GyanJyotiLMS.entities.classAssignment.model.ClassAssignmentModel;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassAssignmentRepo extends JpaRepository<ClassAssignmentModel, Long> {

    @Query("SELECT a FROM ClassAssignmentModel a")
    @EntityGraph("classAssignment.teacherSubjectSection")
    List<ClassAssignmentModel> findAllWithEagerLoading();

    @EntityGraph("classAssignment.teacherSubject")
    List<ClassAssignmentModel> findAllBySection_SectionId(Long sectionId);
}
