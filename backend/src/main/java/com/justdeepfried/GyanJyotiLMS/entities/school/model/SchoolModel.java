package com.justdeepfried.GyanJyotiLMS.entities.school.model;

import com.justdeepfried.GyanJyotiLMS.entities.user.model.UserModel;
import com.justdeepfried.GyanJyotiLMS.enums.SUBSCRIPTION_TIER;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class SchoolModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long schoolId;

    private String schoolName;

    private String address;

    private String phoneNumber;

    private String email;

    @Enumerated(EnumType.STRING)
    private SUBSCRIPTION_TIER subscriptionTier;

    private boolean messagingEnabled = false;

    private int monthlyMessageLimit;

    private boolean active = true;

    @OneToMany(mappedBy = "school")
    private List<UserModel> users;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
