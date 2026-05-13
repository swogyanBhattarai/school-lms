package com.justdeepfried.GyanJyotiLMS.entities.parent.service;

import com.justdeepfried.GyanJyotiLMS.entities.parent.dtos.ParentCreate;
import com.justdeepfried.GyanJyotiLMS.entities.parent.model.ParentModel;
import com.justdeepfried.GyanJyotiLMS.entities.parent.repository.ParentRepo;
import com.justdeepfried.GyanJyotiLMS.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ParentService {
    private final ParentRepo parentRepo;

    public ParentModel findById(Long parentId) {
        return parentRepo.findById(parentId).orElseThrow(() -> new ResourceNotFoundException("Parent not found with id: " + parentId));
    }

    public ParentModel findByParentNumber(String phoneNumber) {
        return parentRepo.findByParentNumber(phoneNumber).orElseThrow(() -> new ResourceNotFoundException("Parent not found with parentNumber: " + phoneNumber));
    }

    public ParentModel createParent(ParentCreate parentCreate) {
        return parentRepo.findByParentNumber(parentCreate.parentNumber())
                .orElseGet(() -> {
                    ParentModel p = new ParentModel();
                    p.setParentName(parentCreate.parentName());
                    p.setParentNumber(parentCreate.parentNumber());
                    return parentRepo.save(p);
                });
    }

    public ParentModel updateParent(Long parentId, ParentCreate parentCreate) {
        ParentModel parent = findById(parentId);
        parent.setParentName(parentCreate.parentName());
        parent.setParentNumber(parentCreate.parentNumber());
        return parentRepo.save(parent);
    }
}
