package com.justdeepfried.GyanJyotiLMS.entities.school.aspect;

import com.justdeepfried.GyanJyotiLMS.entities.school.context.SchoolContext;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.hibernate.Session;
import org.springframework.stereotype.Component;

@Aspect
@Component
@RequiredArgsConstructor
public class SchoolFilterAspect {

    private final EntityManager entityManager;

    @Around("@within(org.springframework.stereotype.Service) && @within(org.springframework.transaction.annotation.Transactional)")
    public Object schoolFilterHandler(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Long schoolId = SchoolContext.get();

        if (schoolId != null) {
            Session session = entityManager.unwrap(Session.class);
            session.enableFilter("schoolIdFilter")
                    .setParameter("schoolId", schoolId);
        }
        return proceedingJoinPoint.proceed();
    }
}
