package com.justdeepfried.GyanJyotiLMS.entities.schoolClass.repository;

import com.justdeepfried.GyanJyotiLMS.entities.schoolClass.model.SchoolClassModel;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentClassRepo extends JpaRepository<SchoolClassModel, Long> {
}
