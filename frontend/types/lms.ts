// --- ClassAssignment DTOs ---
export type TeacherRoles = 'CLASS_TEACHER' | 'SUBJECT_TEACHER'; // Adjust as per TEACHER_ROLES enum values

export interface ClassAssignmentResponse {
  classAssignmentId: number;
  teacherId: number;
  teacherName: string;
  teacherRole: TeacherRoles;
  subjectId: number;
  subjectName: string;
}
// Types generated from backend Java DTOs and Models
// These types are for use in the Next.js frontend

// --- Section DTOs ---
export interface SectionCreate {
  sectionName: string;
  classId: number;
}

export interface SectionUpdate {
  sectionName: string;
}

export interface SectionStudentResponse {
  studentId: number;
  studentName: string;
}

export interface SectionResponse {
  sectionId: number;
  sectionName: string;
  students: SectionStudentResponse[];
  classAssignments: ClassAssignmentResponse[];
  grade: string;
}

export type YearClassSectionResponse = {
  sectionId: number;
  sectionName: string;
};

export type YearClassResponse = {
  schoolClassId: number;
  grade: string;
  sections: YearClassSectionResponse[];
};

export type AcademicYearResponse = {
  academicYearId: number;
  academicYear: string;
  startDate: string;
  endDate: string;
  classes: YearClassResponse[];
};

export type SchoolClassCreate = {
  grade: string;
  academicYearId: number;
};

export type SchoolClassResponse = {
  schoolClassId: number;
  grade: string;
  sectionNames: string[];
};

export type SchoolClassUpdate = {
  grade: string;
};

export type SectionModel = {
  sectionId: number;
  sectionName: string;
  // students, classAssignments, schoolClass, createdAt, updatedAt, school omitted for brevity
};

export type SchoolClassModel = {
  schoolClassId: number;
  grade: string;
  sections: SectionModel[];
  // academicYear, createdAt, updatedAt, school omitted for brevity
};

export type AcademicYearModel = {
  academicYearId: number;
  academicYear: string;
  startDate: string;
  endDate: string;
  classes: SchoolClassModel[];
  // school omitted for brevity
};

export type AcademicYearCreate = {
  academicYear: string;
  startDate: string;
  endDate: string;
};

export type StudentModel = {
  studentId: number;
  studentName: string;
  // section, parents, school omitted for brevity
};

export type TeacherModel = {
  teacherId: number;
  teacherName: string;
  teacherPhoneNumber: string;
  // classAssignments, school omitted for brevity
};

export type SubjectModel = {
  subjectId: number;
  subjectName: string;
  isActive: boolean;
  // classAssignments, createdAt, updatedAt, school omitted for brevity
};

export type ParentModel = {
  parentId: number;
  parentName: string;
  parentNumber: string;
  // children, school omitted for brevity
};

export type UserRoles = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

export type UserModel = {
  userId: number;
  username: string;
  password: string;
  role: UserRoles;
  // school, createdAt, updatedAt omitted for brevity
};

export type SubscriptionTier = 'PREMIUM' | 'EXTRA_PREMIUM';

export type SchoolModel = {
  schoolId: number;
  schoolName: string;
  address: string;
  phoneNumber: string;
  email: string;
  subscriptionTier: SubscriptionTier;
  messagingEnabled: boolean;
  monthlyMessageLimit: number;
  active: boolean;
  // users, createdAt, updatedAt omitted for brevity
};
