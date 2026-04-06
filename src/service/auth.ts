import { dummyService } from "../data/dummy";
import type { AuthResponseDTO, LoginDTO, RegisterDTO } from "../types/auth";

export const fetchLogin = async (data: LoginDTO): Promise<AuthResponseDTO | null> => {
  const result = dummyService.login(data.email, data.password);
  return Promise.resolve(result);
};

export const fetchRegister = async (data: RegisterDTO): Promise<AuthResponseDTO | null> => {
  const result = dummyService.register(data.username, data.email, data.password);
  return Promise.resolve(result);
};
