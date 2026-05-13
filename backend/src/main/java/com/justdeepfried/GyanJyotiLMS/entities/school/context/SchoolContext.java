package com.justdeepfried.GyanJyotiLMS.entities.school.context;


public class SchoolContext {
    private static final ThreadLocal<Long> currentSchoolId =  new ThreadLocal<>();

    public static void set(Long schoolId) {
        currentSchoolId.set(schoolId);
    }

    public static Long get() {
        return currentSchoolId.get();
    }

    public static void clear() {
        currentSchoolId.remove();
    }

}
