import type { UserInfo } from "../types/user";

export const saveToken = (token: string): void => {
  localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const removeToken = (): void => {
  localStorage.removeItem("token");
};

export const saveUser = (user: UserInfo): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): UserInfo | null => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserInfo;
  } catch {
    return null;
  }
};

export const removeUser = (): void => {
  localStorage.removeItem("user");
};

export const clearSession = (): void => {
  removeToken();
  removeUser();
};
