package com.justdeepfried.GyanJyotiLMS.entities.academicYear.repository;

import com.justdeepfried.GyanJyotiLMS.entities.academicYear.model.AcademicYearModel;
import jakarta.persistence.NamedAttributeNode;
import jakarta.persistence.NamedEntityGraph;
import jakarta.persistence.NamedSubgraph;
import org.jspecify.annotations.NullMarked;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcademicYearRepo extends JpaRepository<AcademicYearModel, Long> {
}
