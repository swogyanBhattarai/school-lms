// app/dashboard/sections/[sectionId]/page.tsx
"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  BookOpen,
  BookMarked,
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
  Search,
  GraduationCap,
  UserCircle,
  Calendar,
  Star,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Badge } from "@/app/_components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/_components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/app/_components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/app/_components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { getSectionById } from "@/lib/api/section";
import type {
  ClassAssignmentResponse,
  SectionResponse,
  SectionStudentResponse,
  TeacherRoles,
} from "@/types/lms";

type AssignmentRole = TeacherRoles | "ASSISTANT_TEACHER";

interface DiaryEntry {
  id: number;
  date: string;
  subject: string;
  teacherName: string;
  title: string;
  description: string;
  attachments?: number;
  createdBy: string;
}

const MOCK_DIARY: DiaryEntry[] = [
  {
    id: 1,
    date: "2026-05-10",
    subject: "Mathematics",
    teacherName: "Mr. Ram Sharma",
    title: "Algebra Practice Problems",
    description: "Complete exercises 5.1 to 5.4 from the textbook. Focus on quadratic equations and their solutions.",
    attachments: 2,
    createdBy: "Mr. Ram Sharma",
  },
  {
    id: 2,
    date: "2026-05-09",
    subject: "Science",
    teacherName: "Mrs. Sita Adhikari",
    title: "Chemical Reactions Lab Report",
    description: "Write a detailed lab report on the chemical reactions experiment conducted in class. Include observations and conclusions.",
    attachments: 1,
    createdBy: "Mrs. Sita Adhikari",
  },
  {
    id: 3,
    date: "2026-05-09",
    subject: "English",
    teacherName: "Mr. Hari Thapa",
    title: "Essay Writing - Environmental Conservation",
    description: "Write a 500-word essay on the importance of environmental conservation. Submit by Friday.",
    attachments: 0,
    createdBy: "Mr. Hari Thapa",
  },
  {
    id: 4,
    date: "2026-05-08",
    subject: "Nepali",
    teacherName: "Ms. Gita Rai",
    title: "कविता लेखन",
    description: "प्रकृति विषयमा एउटा कविता लेख्नुहोस् र आइतबारसम्म पेश गर्नुहोस्।",
    attachments: 0,
    createdBy: "Ms. Gita Rai",
  },
  {
    id: 5,
    date: "2026-05-08",
    subject: "Social Studies",
    teacherName: "Mr. Deepak Gurung",
    title: "Map Work - South Asia",
    description: "Label all countries and major rivers of South Asia on the provided map. Color code different regions.",
    attachments: 1,
    createdBy: "Mr. Deepak Gurung",
  },
];

type Tab = "students" | "assignments" | "diary";

export default function SectionDetailsPage() {
  const router = useRouter();
  const params = useParams<{ sectionId: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("students");
  const [search, setSearch] = useState("");
  
  // Dialog states
  const [addStudentDialog, setAddStudentDialog] = useState(false);
  const [addAssignmentDialog, setAddAssignmentDialog] = useState(false);
  const [addDiaryDialog, setAddDiaryDialog] = useState(false);
  const [editStudentDialog, setEditStudentDialog] = useState<SectionStudentResponse | null>(null);
  const [editAssignmentDialog, setEditAssignmentDialog] = useState<ClassAssignmentResponse | null>(null);
  const [editDiaryDialog, setEditDiaryDialog] = useState<DiaryEntry | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    type: string;
    id: number;
    name: string;
  } | null>(null);

  // Form states
  const [addStudentForm, setAddStudentForm] = useState({
    studentName: "",
    email: "",
    phone: "",
  });
  const [editStudentForm, setEditStudentForm] = useState({
    studentName: "",
    email: "",
    phone: "",
  });
  const [assignmentForm, setAssignmentForm] = useState({
    teacherId: "",
    subjectId: "",
    teacherRole: "SUBJECT_TEACHER" as AssignmentRole,
  });
  const [editAssignmentForm, setEditAssignmentForm] = useState({
    teacherId: "",
    subjectId: "",
    teacherRole: "SUBJECT_TEACHER" as AssignmentRole,
  });

  const sectionId = Number(params.sectionId);
  const hasValidSectionId = Number.isFinite(sectionId);

  const {
    data: section,
    isLoading,
    isError,
  } = useQuery<SectionResponse>({
    queryKey: ["section", sectionId],
    queryFn: () => getSectionById(sectionId),
    enabled: hasValidSectionId,
  });

  // Stats
  const studentCount = section?.students.length ?? 0;
  const teacherCount = new Set(section?.classAssignments.map((a) => a.teacherId) ?? []).size;
  const classTeacher = section?.classAssignments.find((a) => a.teacherRole === "CLASS_TEACHER");

  // Filtered data
  const filteredStudents = (section?.students ?? []).filter((s) =>
    s.studentName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAssignments = (section?.classAssignments ?? []).filter((a) =>
    a.teacherName.toLowerCase().includes(search.toLowerCase()) ||
    a.subjectName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDiary = MOCK_DIARY.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.subject.toLowerCase().includes(search.toLowerCase()) ||
    d.teacherName.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { id: "students" as Tab, label: "Students", icon: Users, count: studentCount },
    { id: "assignments" as Tab, label: "Class Assignments", icon: BookOpen, count: teacherCount },
    { id: "diary" as Tab, label: "Daily Diary", icon: BookMarked, count: MOCK_DIARY.length },
  ];

  const getRoleBadge = (role: AssignmentRole) => {
    switch (role) {
      case "CLASS_TEACHER":
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200 gap-1">
          <Star className="h-3 w-3" /> Class Teacher
        </Badge>;
      case "SUBJECT_TEACHER":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Subject Teacher</Badge>;
      case "ASSISTANT_TEACHER":
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Assistant</Badge>;
    }
  };

  const openEditStudent = (student: SectionStudentResponse) => {
    setEditStudentDialog(student);
    setEditStudentForm({
      studentName: student.studentName,
      email: "",
      phone: "",
    });
  };

  const openEditAssignment = (assignment: ClassAssignmentResponse) => {
    setEditAssignmentDialog(assignment);
    setEditAssignmentForm({
      teacherId: String(assignment.teacherId),
      subjectId: String(assignment.subjectId),
      teacherRole: assignment.teacherRole,
    });
  };

  if (!hasValidSectionId) {
    return (
      <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        Invalid section id.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        Loading section details...
      </div>
    );
  }

  if (isError || !section) {
    return (
      <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        Unable to load section details.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-sm font-bold text-amber-600">{section.sectionName}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Grade {section.grade} - Section {section.sectionName}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {studentCount} students • {teacherCount} teachers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Students</p>
              <p className="text-xl font-bold">{studentCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Teachers</p>
              <p className="text-xl font-bold">{teacherCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Class Teacher</p>
              <p className="text-sm font-semibold truncate">{classTeacher?.teacherName || "Not assigned"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors relative",
                  "hover:text-foreground",
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                <Badge className="ml-1 text-xs">
                  {tab.count}
                </Badge>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-3 px-6 py-3 border-b">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
          <div className="ml-auto">
            {activeTab === "students" && (
              <Button size="sm" className="gap-1.5" onClick={() => setAddStudentDialog(true)}>
                <Plus className="h-3.5 w-3.5" />
                Add Student
              </Button>
            )}
            {activeTab === "assignments" && (
              <Button size="sm" className="gap-1.5" onClick={() => setAddAssignmentDialog(true)}>
                <Plus className="h-3.5 w-3.5" />
                Assign Teacher
              </Button>
            )}
            {activeTab === "diary" && (
              <Button size="sm" className="gap-1.5" onClick={() => setAddDiaryDialog(true)}>
                <Plus className="h-3.5 w-3.5" />
                Add Entry
              </Button>
            )}
          </div>
        </div>

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="divide-y">
            {filteredStudents.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No students found</p>
              </div>
            ) : (
              filteredStudents.map((student, index) => (
                <div
                  key={student.studentId}
                  className="flex items-center gap-4 px-6 py-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-600">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{student.studentName}</p>
                    <p className="text-xs text-muted-foreground">ID: {student.studentId}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <UserCircle className="mr-2 h-4 w-4" /> View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEditStudent(student)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() =>
                          setDeleteDialog({
                            type: "student",
                            id: student.studentId,
                            name: student.studentName,
                          })
                        }
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        )}

        {/* Class Assignments Tab */}
        {activeTab === "assignments" && (
          <div className="divide-y">
            {filteredAssignments.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No assignments found</p>
              </div>
            ) : (
              filteredAssignments.map((assignment) => (
                <div
                  key={assignment.classAssignmentId}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-muted/30 transition-colors"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    assignment.teacherRole === "CLASS_TEACHER" 
                      ? "bg-amber-100" 
                      : "bg-violet-100"
                  )}>
                    <GraduationCap className={cn(
                      "w-5 h-5",
                      assignment.teacherRole === "CLASS_TEACHER"
                        ? "text-amber-600"
                        : "text-violet-600"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{assignment.teacherName}</p>
                      {getRoleBadge(assignment.teacherRole)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {assignment.subjectName}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditAssignment(assignment)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BadgeCheck className="mr-2 h-4 w-4" /> Change Role
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() =>
                          setDeleteDialog({
                            type: "assignment",
                            id: assignment.classAssignmentId,
                            name: `${assignment.teacherName} - ${assignment.subjectName}`,
                          })
                        }
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        )}

        {/* Diary Tab */}
        {activeTab === "diary" && (
          <div className="divide-y">
            {filteredDiary.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <BookMarked className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No diary entries found</p>
              </div>
            ) : (
              filteredDiary.map((entry) => (
                <div
                  key={entry.id}
                  className="px-6 py-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold">{entry.title}</h3>
                        <Badge className="text-xs">
                          {entry.subject}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {entry.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {entry.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          {entry.teacherName}
                        </span>
                        {(entry.attachments ?? 0) > 0 && (
                          <span className="flex items-center gap-1">
                            <BookMarked className="h-3 w-3" />
                            {entry.attachments ?? 0} attachment{(entry.attachments ?? 0) > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditDiaryDialog(entry)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() =>
                            setDeleteDialog({
                              type: "diary",
                              id: entry.id,
                              name: entry.title,
                            })
                          }
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {activeTab === "students" && `${filteredStudents.length} of ${studentCount} students`}
            {activeTab === "assignments" && `${filteredAssignments.length} of ${section.classAssignments.length} assignments`}
            {activeTab === "diary" && `${filteredDiary.length} of ${MOCK_DIARY.length} entries`}
          </span>
          <span className="flex items-center gap-1">
            <BadgeCheck className="h-3 w-3 text-emerald-500" />
            Data synced
          </span>
        </div>
      </div>

      {/* Add Student Dialog */}
      <Dialog open={addStudentDialog} onOpenChange={setAddStudentDialog}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="px-6 pt-6 pb-4">
            <DialogHeader className="space-y-1.5">
              <DialogTitle className="text-xl font-semibold">Add Student</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                Add a student to Grade {section.grade} - Section {section.sectionName}.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="border-t" />

          <div className="px-6 py-5 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Student Name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Enter student name"
                value={addStudentForm.studentName}
                onChange={(e) => setAddStudentForm((prev) => ({ ...prev, studentName: e.target.value }))}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="student@example.com"
                value={addStudentForm.email}
                onChange={(e) => setAddStudentForm((prev) => ({ ...prev, email: e.target.value }))}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                placeholder="Phone number"
                value={addStudentForm.phone}
                onChange={(e) => setAddStudentForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="h-11"
              />
            </div>
          </div>

          <div className="border-t" />

          <div className="px-6 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setAddStudentDialog(false)} className="text-sm font-medium">
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({ title: "Student added", description: "Student has been added successfully." });
                setAddStudentDialog(false);
                setAddStudentForm({ studentName: "", email: "", phone: "" });
              }}
              className="gap-2 text-sm font-medium"
            >
              <Plus className="h-4 w-4" /> Add Student
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={!!editStudentDialog} onOpenChange={(open) => !open && setEditStudentDialog(null)}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="px-6 pt-6 pb-4">
            <DialogHeader className="space-y-1.5">
              <DialogTitle className="text-xl font-semibold">Edit Student</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                Update student details for Grade {section.grade} - Section {section.sectionName}.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="border-t" />

          <div className="px-6 py-5 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Student Name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Enter student name"
                value={editStudentForm.studentName}
                onChange={(e) => setEditStudentForm((prev) => ({ ...prev, studentName: e.target.value }))}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="student@example.com"
                value={editStudentForm.email}
                onChange={(e) => setEditStudentForm((prev) => ({ ...prev, email: e.target.value }))}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                placeholder="Phone number"
                value={editStudentForm.phone}
                onChange={(e) => setEditStudentForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="h-11"
              />
            </div>
          </div>

          <div className="border-t" />

          <div className="px-6 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setEditStudentDialog(null)} className="text-sm font-medium">
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({ title: "Updated", description: "Student has been updated successfully." });
                setEditStudentDialog(null);
              }}
              className="gap-2 text-sm font-medium"
            >
              <Pencil className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Assignment Dialog */}
      <Dialog open={addAssignmentDialog} onOpenChange={setAddAssignmentDialog}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="px-6 pt-6 pb-4">
            <DialogHeader className="space-y-1.5">
              <DialogTitle className="text-xl font-semibold">Assign Teacher</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                Assign a teacher to this section with a subject and role.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="border-t" />
          <div className="px-6 py-5 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Teacher *</label>
              <Select value={assignmentForm.teacherId} onValueChange={(v) => setAssignmentForm(f => ({ ...f, teacherId: v }))}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="101">Mr. Ram Sharma</SelectItem>
                  <SelectItem value="102">Mrs. Sita Adhikari</SelectItem>
                  <SelectItem value="106">Mr. New Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject *</label>
              <Select value={assignmentForm.subjectId} onValueChange={(v) => setAssignmentForm(f => ({ ...f, subjectId: v }))}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="201">Mathematics</SelectItem>
                  <SelectItem value="202">Science</SelectItem>
                  <SelectItem value="203">English</SelectItem>
                  <SelectItem value="204">Nepali</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select 
                value={assignmentForm.teacherRole} 
                onValueChange={(v) => setAssignmentForm(f => ({ ...f, teacherRole: v as AssignmentRole }))}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CLASS_TEACHER">Class Teacher</SelectItem>
                  <SelectItem value="SUBJECT_TEACHER">Subject Teacher</SelectItem>
                  <SelectItem value="ASSISTANT_TEACHER">Assistant Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="border-t" />
          <div className="px-6 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setAddAssignmentDialog(false)} className="text-sm font-medium">
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({ title: "Assignment added", description: "Teacher has been assigned successfully." });
                setAddAssignmentDialog(false);
                setAssignmentForm({ teacherId: "", subjectId: "", teacherRole: "SUBJECT_TEACHER" });
              }}
              className="gap-2 text-sm font-medium"
            >
              <Plus className="h-4 w-4" /> Assign Teacher
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Assignment Dialog */}
      <Dialog open={!!editAssignmentDialog} onOpenChange={(open) => !open && setEditAssignmentDialog(null)}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="px-6 pt-6 pb-4">
            <DialogHeader className="space-y-1.5">
              <DialogTitle className="text-xl font-semibold">Edit Assignment</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                Update teacher assignment details for this section.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="border-t" />

          <div className="px-6 py-5 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Teacher *</label>
              <Select value={editAssignmentForm.teacherId} onValueChange={(v) => setEditAssignmentForm((f) => ({ ...f, teacherId: v }))}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="101">Mr. Ram Sharma</SelectItem>
                  <SelectItem value="102">Mrs. Sita Adhikari</SelectItem>
                  <SelectItem value="106">Mr. New Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject *</label>
              <Select value={editAssignmentForm.subjectId} onValueChange={(v) => setEditAssignmentForm((f) => ({ ...f, subjectId: v }))}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="201">Mathematics</SelectItem>
                  <SelectItem value="202">Science</SelectItem>
                  <SelectItem value="203">English</SelectItem>
                  <SelectItem value="204">Nepali</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select
                value={editAssignmentForm.teacherRole}
                onValueChange={(v) => setEditAssignmentForm((f) => ({ ...f, teacherRole: v as AssignmentRole }))}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CLASS_TEACHER">Class Teacher</SelectItem>
                  <SelectItem value="SUBJECT_TEACHER">Subject Teacher</SelectItem>
                  <SelectItem value="ASSISTANT_TEACHER">Assistant Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t" />

          <div className="px-6 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setEditAssignmentDialog(null)} className="text-sm font-medium">
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({ title: "Updated", description: "Assignment has been updated successfully." });
                setEditAssignmentDialog(null);
              }}
              className="gap-2 text-sm font-medium"
            >
              <Pencil className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {deleteDialog?.type}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove <strong>{deleteDialog?.name}</strong>.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                toast({ 
                  title: "Removed", 
                  description: `${deleteDialog?.name} has been removed.` 
                });
                setDeleteDialog(null);
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}