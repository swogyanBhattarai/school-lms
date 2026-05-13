import api from "../../api";
import type { SchoolClassCreate, SchoolClassUpdate, SchoolClassModel } from "@/types/lms";

// Get all school classes
export const getSchoolClasses = async (): Promise<SchoolClassModel[]> => {
  const res = await api.get<SchoolClassModel[]>("/api/school-class");
  return res.data;
};

// Get school class by ID
export const getSchoolClassById = async (id: number): Promise<SchoolClassModel> => {
  const res = await api.get<SchoolClassModel>(`/api/school-class/${id}`);
  return res.data;
};

// Create school class
export const createSchoolClass = async (payload: SchoolClassCreate): Promise<SchoolClassModel> => {
  const res = await api.post<SchoolClassModel>("/api/school-class", payload);
  return res.data;
};

// Update school class
export const updateSchoolClass = async (id: number, payload: SchoolClassUpdate): Promise<SchoolClassModel> => {
  const res = await api.put<SchoolClassModel>(`/api/school-class/${id}`, payload);
  return res.data;
};

// Delete school class
export const deleteSchoolClass = async (id: number): Promise<void> => {
  await api.delete(`/api/school-class/${id}`);
};
