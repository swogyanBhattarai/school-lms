package com.justdeepfried.GyanJyotiLMS.entities.student.dtos;

public record StudentCreate (
        String studentName,

        String parentName1,
        String parentPhoneNumber1,

        String parentName2,
        String parentPhoneNumber2
){
}
