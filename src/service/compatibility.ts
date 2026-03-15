import instance from "./instance";
import type { CompatibilityCheckRequest } from "../types/compatibility";

export const checkCompatibility = async (params: CompatibilityCheckRequest) =>
  instance.post<unknown>("Compatibility/check", params);
