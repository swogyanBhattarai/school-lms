import api from "@/lib/api";

export type LoginPayload = {
  username: string;
  password: string;
};

export const login = async (payload: LoginPayload) => {
  const response = await api.post<string>("/api/auth/login", payload);
  return response.data;
};
