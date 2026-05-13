package com.justdeepfried.GyanJyotiLMS.entities.subject.repository;

import com.justdeepfried.GyanJyotiLMS.entities.subject.model.SubjectModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepo extends JpaRepository<SubjectModel, Long> {
}
