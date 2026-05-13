package com.justdeepfried.GyanJyotiLMS.entities.user.model;

import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolFilterPropagator;
import com.justdeepfried.GyanJyotiLMS.entities.school.model.SchoolModel;
import com.justdeepfried.GyanJyotiLMS.enums.USER_ROLES;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Filter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Setter
@Getter
@Filter(name = "schoolIdFilter", condition = "school_id = :schoolId")
public class UserModel extends SchoolFilterPropagator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private USER_ROLES role;

    @ManyToOne
    @JoinColumn(name = "school_id")
    private SchoolModel school;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
