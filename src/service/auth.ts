import instance from "./instance";
import type { AuthResponseDTO, LoginDTO, RegisterDTO } from "../types/auth";

export const fetchLogin = async (data: LoginDTO) => {
  return await instance.post<AuthResponseDTO>("auth/login", {
    Email: data.email,
    Password: data.password,
  });
};

export const fetchRegister = async (data: RegisterDTO) => {
  return await instance.post<AuthResponseDTO>("auth/register", {
    Username: data.username,
    Email: data.email,
    Password: data.password,
  });
};
