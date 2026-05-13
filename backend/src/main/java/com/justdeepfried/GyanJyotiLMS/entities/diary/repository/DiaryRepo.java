package com.justdeepfried.GyanJyotiLMS.entities.diary.repository;

import com.justdeepfried.GyanJyotiLMS.entities.diary.model.DiaryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepo extends JpaRepository<DiaryModel, Long> {
}
