"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
  MoreHorizontal,
  BookOpen,
  CalendarDays,
  School,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
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
import { useToast } from "@/app/_components/ui/use-toast";
import { MiniCalendar } from "@/app/_components/MiniNepaliCalendarPicker";
import {
  createAcademicYear,
  deleteAcademicYear,
  getAcademicYears,
  updateAcademicYear,
} from "@/lib/api/academicYear";
import {
  createSchoolClass,
  deleteSchoolClass,
  updateSchoolClass,
} from "@/lib/api/schoolClass";
import {
  createSection,
  deleteSection,
  updateSection,
} from "@/lib/api/section";
import { convertADToBS, convertBSToAD, formatBSDate } from "@/lib/nepali-calendar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Types
import type {
  AcademicYearCreate,
  AcademicYearResponse,
  SchoolClassCreate,
  SchoolClassUpdate,
} from "@/types/lms";

// Helper function to format date
function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-NP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function fmtDateWithBS(d: string) {
  if (!d) return "—";
  const adDate = new Date(d);
  const bsDate = convertADToBS(adDate);
  return `${fmtDate(d)} (${formatBSDate(bsDate.year, bsDate.month, bsDate.day)})`;
}

// Form types for CRUD operations
interface AcademicYearForm {
  name: string;
  startDate: string;
  endDate: string;
}

const blankAcademicYear = (): AcademicYearForm => ({
  name: "",
  startDate: "",
  endDate: "",
});

export default function AcademicYearsPage() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedClasses, setExpandedClasses] = useState<Set<string>>(new Set());

  // Dialog states
  const [yearDialog, setYearDialog] = useState(false);
  const [editingYearId, setEditingYearId] = useState<string | null>(null);
  const [editingYearApiId, setEditingYearApiId] = useState<number | null>(null);
  const [yearForm, setYearForm] = useState<AcademicYearForm>(blankAcademicYear());

  const [classDialog, setClassDialog] = useState(false);
  const [editingClassId, setEditingClassId] = useState<number | null>(null);
  const [classAcademicYearId, setClassAcademicYearId] = useState<number | null>(null);
  const [classForm, setClassForm] = useState<SchoolClassCreate>({ grade: "", academicYearId: 0 });

  const [deleteDialog, setDeleteDialog] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [deleteClassDialog, setDeleteClassDialog] = useState<{
    id: number;
    grade: string;
  } | null>(null);

  const [sectionDialog, setSectionDialog] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [sectionClassId, setSectionClassId] = useState<number | null>(null);
  const [sectionForm, setSectionForm] = useState<{ sectionName: string }>({ sectionName: "" });

  const [deleteSectionDialog, setDeleteSectionDialog] = useState<{
    id: number;
    name: string;
    classId: number;
  } | null>(null);

  const { data: academicYearData } = useQuery({
    queryKey: ["academic-years"],
    queryFn: getAcademicYears,
  });

  const createYearMutation = useMutation({
    mutationFn: (payload: AcademicYearCreate) => createAcademicYear(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
    },
  });

  const updateYearMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: AcademicYearCreate }) =>
      updateAcademicYear(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
    },
  });

  const deleteYearMutation = useMutation({
    mutationFn: (id: number) => deleteAcademicYear(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
    },
  });

  const createClassMutation = useMutation({
    mutationFn: (payload: SchoolClassCreate) => createSchoolClass(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
    },
  });

  const updateClassMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: SchoolClassUpdate }) =>
      updateSchoolClass(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
    },
  });

  const deleteClassMutation = useMutation({
    mutationFn: (id: number) => deleteSchoolClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
    },
  });

  const createSectionMutation = useMutation({
    mutationFn: (payload: { sectionName: string; classId: number }) => createSection(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
    },
  });

  const updateSectionMutation = useMutation({
    mutationFn: ({ sectionId, sectionName }: { sectionId: number; sectionName: string }) =>
      updateSection(sectionId, { sectionName }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
    },
  });

  const deleteSectionMutation = useMutation({
    mutationFn: (id: number) => deleteSection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academic-years"] });
    },
  });

  const academicYears = academicYearData ?? [];

  // Toggle accordion
  const toggleYear = (id: string) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleClass = (id: string) => {
    setExpandedClasses((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filter years based on search
  const filteredYears = academicYears.filter(
    (y) =>
      y.academicYear.toLowerCase().includes(search.toLowerCase())
  );

  // Academic Year CRUD
  const openCreateYear = () => {
    setEditingYearId(null);
    setEditingYearApiId(null);
    setYearForm(blankAcademicYear());
    setYearDialog(true);
  };

  const openEditYear = (year: AcademicYearResponse) => {
    setEditingYearId(String(year.academicYearId));
    setEditingYearApiId(year.academicYearId);
    setYearForm({
      name: year.academicYear,
      startDate: year.startDate ?? "",
      endDate: year.endDate ?? "",
    });
    setYearDialog(true);
  };

  const openCreateClass = (academicYearId: number) => {
    setEditingClassId(null);
    setClassAcademicYearId(academicYearId);
    setClassForm({ grade: "", academicYearId });
    setClassDialog(true);
  };

  const openEditClass = (schoolClassId: number, grade: string, academicYearId: number) => {
    setEditingClassId(schoolClassId);
    setClassAcademicYearId(academicYearId);
    setClassForm({ grade, academicYearId });
    setClassDialog(true);
  };

  const openCreateSection = (schoolClassId: number) => {
    setEditingSectionId(null);
    setSectionClassId(schoolClassId);
    setSectionForm({ sectionName: "" });
    setSectionDialog(true);
  };

  const openEditSection = (sectionId: number, sectionName: string, schoolClassId: number) => {
    setEditingSectionId(sectionId);
    setSectionClassId(schoolClassId);
    setSectionForm({ sectionName });
    setSectionDialog(true);
  };

  const handleSaveYear = () => {
    if (!yearForm.name.trim()) {
      toast({
        title: "Validation error",
        description: "Please enter an academic year.",
        variant: "destructive",
      });
      return;
    }

    if (!yearForm.startDate || !yearForm.endDate) {
      toast({
        title: "Validation error",
        description: "Please select both start and end dates.",
        variant: "destructive",
      });
      return;
    }

    if (new Date(yearForm.endDate) <= new Date(yearForm.startDate)) {
      toast({
        title: "Validation error",
        description: "End date must be after the start date.",
        variant: "destructive",
      });
      return;
    }

    if (editingYearId && editingYearApiId) {
      updateYearMutation.mutate(
        {
          id: editingYearApiId,
          payload: {
            academicYear: yearForm.name.trim(),
            startDate: yearForm.startDate,
            endDate: yearForm.endDate,
          },
        },
        {
          onSuccess: () => {
            toast({ title: "Updated", description: `${yearForm.name} has been updated.` });
            setYearDialog(false);
          },
          onError: (error) => {
            console.error("Update error:", error);
            toast({ title: "Error", description: "Failed to update academic year.", variant: "destructive" });
          },
        }
      );
    } else if (!editingYearId) {
      createYearMutation.mutate({
        academicYear: yearForm.name.trim(),
        startDate: yearForm.startDate,
        endDate: yearForm.endDate,
      }, {
        onSuccess: () => {
          toast({ title: "Created", description: `${yearForm.name} has been added.` });
          setYearDialog(false);
          setYearForm(blankAcademicYear());
        },
        onError: (error) => {
          console.error("Create error:", error);
          toast({ title: "Error", description: "Failed to create academic year.", variant: "destructive" });
        },
      });
    }
  };

  // Delete handlers
  const handleDelete = () => {
    if (!deleteDialog) return;

    const { id, name } = deleteDialog;
    deleteYearMutation.mutate(id, {
      onSuccess: () => {
        toast({ title: "Deleted", description: `${name} has been removed.` });
      },
    });

    setDeleteDialog(null);
  };

  const handleSaveClass = () => {
    if (!classForm.grade.trim()) {
      toast({
        title: "Validation error",
        description: "Please enter a class grade.",
        variant: "destructive",
      });
      return;
    }

    if (editingClassId) {
      updateClassMutation.mutate(
        {
          id: editingClassId,
          payload: { grade: classForm.grade.trim() },
        },
        {
          onSuccess: () => {
            toast({ title: "Updated", description: "Class has been updated." });
            setClassDialog(false);
          },
          onError: (error) => {
            console.error("Class update error:", error);
            toast({ title: "Error", description: "Failed to update class.", variant: "destructive" });
          },
        }
      );
      return;
    }

    if (classAcademicYearId) {
      createClassMutation.mutate(
        {
          grade: classForm.grade.trim(),
          academicYearId: classAcademicYearId,
        },
        {
          onSuccess: () => {
            toast({ title: "Created", description: "Class has been added." });
            setClassDialog(false);
            setClassForm({ grade: "", academicYearId: classAcademicYearId });
          },
          onError: (error) => {
            console.error("Class create error:", error);
            toast({ title: "Error", description: "Failed to create class.", variant: "destructive" });
          },
        }
      );
    }
  };

  const handleDeleteClass = () => {
    if (!deleteClassDialog) return;

    deleteClassMutation.mutate(deleteClassDialog.id, {
      onSuccess: () => {
        toast({ title: "Deleted", description: "Class has been removed." });
      },
    });

    setDeleteClassDialog(null);
  };

  const handleSaveSection = () => {
    if (!sectionForm.sectionName.trim()) {
      toast({
        title: "Validation error",
        description: "Please enter a section name.",
        variant: "destructive",
      });
      return;
    }

    if (!sectionClassId) {
      toast({
        title: "Error",
        description: "Missing class for section.",
        variant: "destructive",
      });
      return;
    }

    if (editingSectionId) {
      updateSectionMutation.mutate(
        {
          sectionId: editingSectionId,
          sectionName: sectionForm.sectionName.trim(),
        },
        {
          onSuccess: () => {
            toast({ title: "Updated", description: "Section has been updated." });
            setSectionDialog(false);
          },
          onError: (error) => {
            console.error("Section update error:", error);
            toast({ title: "Error", description: "Failed to update section.", variant: "destructive" });
          },
        }
      );
      return;
    }

    createSectionMutation.mutate(
      {
        sectionName: sectionForm.sectionName.trim(),
        classId: sectionClassId,
      },
      {
        onSuccess: () => {
          toast({ title: "Created", description: "Section has been added." });
          setSectionDialog(false);
          setSectionForm({ sectionName: "" });
        },
        onError: (error) => {
          console.error("Section create error:", error);
          toast({ title: "Error", description: "Failed to create section.", variant: "destructive" });
        },
      }
    );
  };

  const handleDeleteSection = () => {
    if (!deleteSectionDialog) return;

    deleteSectionMutation.mutate(deleteSectionDialog.id, {
      onSuccess: () => {
        toast({ title: "Deleted", description: "Section has been removed." });
      },
    });

    setDeleteSectionDialog(null);
  };

  // Stats calculations
  const totalYears = academicYears.length;
  const totalClasses = academicYears.reduce((sum, y) => sum + (y.classes?.length ?? 0), 0);
  const totalSections = academicYears.reduce(
    (sum, y) => sum + (y.classes?.reduce((cSum, c) => cSum + (c.sections?.length ?? 0), 0) ?? 0),
    0
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Academic Years</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage academic cycles, classes, and sections
          </p>
        </div>
        <Button onClick={openCreateYear} className="gap-2">
          <Plus className="h-4 w-4" />
          New Academic Year
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Years</p>
              <p className="text-3xl font-bold">{totalYears}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Classes</p>
              <p className="text-3xl font-bold">{totalClasses}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <School className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Sections</p>
              <p className="text-3xl font-bold">{totalSections}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search academic years..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredYears.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border">
            <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No academic years found</p>
          </div>
        ) : (
          filteredYears.map((year) => (
            <div key={year.academicYearId} className="rounded-xl border bg-card shadow-sm overflow-hidden">
              {/* Year Header */}
              <div
                className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleYear(String(year.academicYearId))}
              >
                <div className="flex-1 flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold bg-muted text-muted-foreground"
                  >
                    {year.academicYear.replace(/\D/g, "").slice(-2)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{year.academicYear}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>{fmtDateWithBS(year.startDate)} → {fmtDateWithBS(year.endDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="hidden sm:inline">{year.classes?.length ?? 0} classes</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">
                    {(year.classes ?? []).reduce((sum, c) => sum + (c.sections?.length ?? 0), 0)} sections
                  </span>
                </div>

                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditYear(year)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() =>
                          setDeleteDialog({ id: year.academicYearId, name: year.academicYear })
                        }
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  {expandedYears.has(String(year.academicYearId)) ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedYears.has(String(year.academicYearId)) && (
                <div className="border-t bg-muted/20">
                  <div className="flex items-center justify-between px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold">Classes</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Manage classes and their sections in this academic year
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => openCreateClass(year.academicYearId)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Class
                    </Button>
                  </div>
                  {(year.classes ?? []).length === 0 ? (
                    <div className="px-6 pb-6">
                      <div className="rounded-lg border bg-card px-6 py-8 text-center text-sm text-muted-foreground">
                      No classes added yet.
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 pb-4 space-y-3">
                      {(year.classes ?? []).map((cls) => (
                        <div
                          key={cls.schoolClassId}
                          className="rounded-xl border bg-card/90 shadow-sm overflow-hidden"
                        >
                          {/* Class Header */}
                          <div
                            className="flex items-center gap-4 px-5 py-3.5 cursor-pointer hover:bg-muted/40 transition-colors"
                            onClick={() => toggleClass(String(cls.schoolClassId))}
                          >
                            <div className="flex-1 flex items-center gap-3">
                              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                                <span className="text-sm font-bold text-violet-700">
                                  {cls.grade.length <= 4 ? cls.grade : cls.grade.slice(0, 2).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-sm">Grade {cls.grade}</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {cls.sections?.length ?? 0} sections
                                </p>
                              </div>
                            </div>

                            {/* Removed Class ID display for cleaner UI */}

                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() =>
                                      openEditClass(cls.schoolClassId, cls.grade, year.academicYearId)
                                    }
                                  >
                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() =>
                                      setDeleteClassDialog({ id: cls.schoolClassId, grade: cls.grade })
                                    }
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              {expandedClasses.has(String(cls.schoolClassId)) ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          </div>

                          {/* Sections */}
                          {expandedClasses.has(String(cls.schoolClassId)) && (
                            <div className="border-t bg-muted/10">
                              <div className="flex items-center justify-between px-5 py-3">
                                <div>
                                  <p className="text-sm font-semibold">Sections</p>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    Manage sections under this class
                                  </p>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-2"
                                  onClick={() => openCreateSection(cls.schoolClassId)}
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                  Add Section
                                </Button>
                              </div>
                              {(cls.sections ?? []).length === 0 ? (
                                <div className="px-5 pb-5 text-center text-xs text-muted-foreground">
                                  No sections yet.
                                </div>
                              ) : (
                                <div className="px-3 pb-4 space-y-2">
                                  {(cls.sections ?? []).map((section) => (
                                    <div
                                      onClick={() => router.push(`/admin/sections/${section.sectionId}`)}
                                      className="flex items-center gap-3 rounded-md border bg-background px-4 py-2.5 hover:bg-muted/30 transition-colors cursor-pointer"
                                      role="button"
                                      tabIndex={0}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                          e.preventDefault();
                                          router.push(`/admin/sections/${section.sectionId}`);
                                        }
                                      }}
                                    >
                                      <div className="flex-1 flex items-center gap-3">
                                        <div className="w-7 h-7 bg-amber-100 rounded-md flex items-center justify-center">
                                          <span className="text-xs font-bold text-amber-600">
                                            {section.sectionName}
                                          </span>
                                        </div>
                                        <div className="text-sm leading-none">
                                          <span className="font-medium">Section {section.sectionName}</span>
                                        </div>
                                      </div>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-7 w-7">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem
                                            onClick={() =>
                                              openEditSection(
                                                section.sectionId,
                                                section.sectionName,
                                                cls.schoolClassId
                                              )
                                            }
                                          >
                                            <Pencil className="mr-2 h-4 w-4" /> Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem
                                            className="text-destructive"
                                            onClick={() =>
                                              setDeleteSectionDialog({
                                                id: section.sectionId,
                                                name: section.sectionName,
                                                classId: cls.schoolClassId,
                                              })
                                            }
                                          >
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Year Dialog */}
<Dialog open={yearDialog} onOpenChange={setYearDialog}>
  <DialogContent className="sm:max-w-lg p-0 gap-0">
    {/* Header */}
    <div className="px-6 pt-6 pb-4">
      <DialogHeader className="space-y-1.5">
        <DialogTitle className="text-xl font-semibold tracking-tight">
          {editingYearId ? "Edit Academic Year" : "New Academic Year"}
        </DialogTitle>
        <DialogDescription className="text-sm leading-relaxed">
          {editingYearId 
            ? "Modify the academic year details and save your changes." 
            : "Set up a new academic year by filling in the required information."}
        </DialogDescription>
      </DialogHeader>
    </div>

    {/* Divider */}
    <div className="border-t" />

    {/* Form Content */}
    <div className="px-6 py-5 space-y-5">
      {/* Name Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-1 text-sm font-medium">
          Academic Year Name
          <span className="text-destructive">*</span>
        </label>
        <div className="relative">
          <Input
            placeholder="e.g., 2083 B.S."
            value={yearForm.name}
            onChange={(e) => setYearForm((prev) => ({ ...prev, name: e.target.value }))}
            className="h-11 pl-10 pr-4 text-sm"
          />
          <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-[0.8rem] text-muted-foreground">
          Use the B.S. calendar format for consistency.
        </p>
      </div>

      {/* Date Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1.5">
          <label htmlFor="ay-start" className="text-sm font-medium">
            Start Date <span className="text-destructive">*</span>
          </label>
          <MiniCalendar
            value={
              yearForm.startDate
                ? (() => {
                    const ad = new Date(yearForm.startDate);
                    const bs = convertADToBS(ad);
                    return bs;
                  })()
                : undefined
            }
            onChange={(bsDate) => {
              const adDate = convertBSToAD(bsDate.year, bsDate.month, bsDate.day);
              const isoString = adDate.toISOString().split("T")[0];
              setYearForm((prev) => ({
                ...prev,
                startDate: isoString,
              }));
            }}
            placeholder="Select start date"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="ay-end" className="text-sm font-medium">
            End Date <span className="text-destructive">*</span>
          </label>
          <MiniCalendar
            value={
              yearForm.endDate
                ? (() => {
                    const ad = new Date(yearForm.endDate);
                    const bs = convertADToBS(ad);
                    return bs;
                  })()
                : undefined
            }
            onChange={(bsDate) => {
              const adDate = convertBSToAD(bsDate.year, bsDate.month, bsDate.day);
              const isoString = adDate.toISOString().split("T")[0];
              setYearForm((prev) => ({
                ...prev,
                endDate: isoString,
              }));
            }}
            placeholder="Select end date"
          />
        </div>
      </div>

      {/* Date Preview */}
      {yearForm.startDate && yearForm.endDate && (
        <div className="rounded-lg border bg-muted/30 px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Duration</span>
            </div>
            <span className="font-medium tabular-nums">
              {Math.round(
                (new Date(yearForm.endDate).getTime() - new Date(yearForm.startDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              days
            </span>
          </div>
        </div>
      )}
    </div>

    {/* Divider */}
    <div className="border-t" />

    {/* Footer */}
    <div className="px-6 py-4 flex items-center justify-between">
      <Button
        variant="ghost"
        onClick={() => setYearDialog(false)}
        className="text-sm font-medium"
      >
        Cancel
      </Button>
      <div className="flex items-center gap-2">
        {editingYearId && (
          <Button
            variant="outline"
            onClick={() => setYearForm(blankAcademicYear())}
            className="text-sm"
          >
            Reset
          </Button>
        )}
        <Button 
          onClick={handleSaveYear}
          className="text-sm font-medium gap-2"
        >
          {editingYearId ? (
            <>
              <Pencil className="h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Create Year
            </>
          )}
        </Button>
      </div>
    </div>
  </DialogContent>
</Dialog>


      {/* Delete Dialog */}
      <AlertDialog
        open={!!deleteDialog}
        onOpenChange={(open) => !open && setDeleteDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
                Delete academic year?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove <strong>{deleteDialog?.name}</strong> and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Class Dialog */}
      <Dialog open={classDialog} onOpenChange={setClassDialog}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="px-6 pt-6 pb-4">
            <DialogHeader className="space-y-1.5">
              <DialogTitle className="text-xl font-semibold tracking-tight">
                {editingClassId ? "Edit Class" : "Add Class"}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                {editingClassId
                  ? "Modify class details and save your changes."
                  : "Create a new class under this academic year."}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="border-t" />

          <div className="px-6 py-5 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Grade <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="e.g., 10"
                value={classForm.grade}
                onChange={(e) => setClassForm((prev) => ({ ...prev, grade: e.target.value }))}
                className="h-11"
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Use clear naming like 1, 2, 3... or Nursery/LKG as per your school convention.
              </p>
            </div>
          </div>

          <div className="border-t" />

          <div className="px-6 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setClassDialog(false)} className="text-sm font-medium">
              Cancel
            </Button>
            <Button onClick={handleSaveClass} className="gap-2 text-sm font-medium">
              {editingClassId ? (
                <>
                  <Pencil className="h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add Class
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Class Dialog */}
      <AlertDialog
        open={!!deleteClassDialog}
        onOpenChange={(open) => !open && setDeleteClassDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete class?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove Grade <strong>{deleteClassDialog?.grade}</strong> and all
              associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteClass}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Section Dialog */}
      <Dialog open={sectionDialog} onOpenChange={setSectionDialog}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="px-6 pt-6 pb-4">
            <DialogHeader className="space-y-1.5">
              <DialogTitle className="text-xl font-semibold tracking-tight">
                {editingSectionId ? "Edit Section" : "Add Section"}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                {editingSectionId
                  ? "Modify section details and save your changes."
                  : "Create a new section under this class."}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="border-t" />

          <div className="px-6 py-5 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Section Name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="e.g., A"
                value={sectionForm.sectionName}
                onChange={(e) => setSectionForm({ sectionName: e.target.value })}
                className="h-11"
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Use short labels like A, B, or Blue.
              </p>
            </div>
          </div>

          <div className="border-t" />

          <div className="px-6 py-4 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setSectionDialog(false)} className="text-sm font-medium">
              Cancel
            </Button>
            <Button onClick={handleSaveSection} className="gap-2 text-sm font-medium">
              {editingSectionId ? (
                <>
                  <Pencil className="h-4 w-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add Section
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Section Dialog */}
      <AlertDialog
        open={!!deleteSectionDialog}
        onOpenChange={(open) => !open && setDeleteSectionDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete section?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove Section <strong>{deleteSectionDialog?.name}</strong> and all
              associated data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSection}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}