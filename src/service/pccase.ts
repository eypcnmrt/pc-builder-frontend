import instance from "./instance";
import type { PcCase } from "../types/build";

export const fetchPcCases = (page = 1, pageSize = 100, odataFilter?: string) =>
  instance.getOData<PcCase>("PcCase", page, pageSize, odataFilter);

export const fetchPcCaseById = (id: number) =>
  instance.get<PcCase>(`PcCase/${id}`);
