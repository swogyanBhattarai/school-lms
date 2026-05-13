package com.justdeepfried.GyanJyotiLMS.entities.school.interceptor;

import com.justdeepfried.GyanJyotiLMS.entities.school.context.SchoolContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class SchoolInterceptor implements HandlerInterceptor {
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
        SchoolContext.clear();
    }
}
