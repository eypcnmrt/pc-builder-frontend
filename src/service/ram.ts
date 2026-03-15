import instance from "./instance";
import type { RAM } from "../types/build";

export const fetchRams = (page = 1, pageSize = 100, odataFilter?: string) =>
  instance.getOData<RAM>("Ram", page, pageSize, odataFilter);

export const fetchRamById = (id: number) =>
  instance.get<RAM>(`Ram/${id}`);
