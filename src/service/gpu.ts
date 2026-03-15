import instance from "./instance";
import type { GPU } from "../types/build";

export const fetchGpus = (page = 1, pageSize = 100, odataFilter?: string) =>
  instance.getOData<GPU>("Gpu", page, pageSize, odataFilter);

export const fetchGpuById = (id: number) =>
  instance.get<GPU>(`Gpu/${id}`);
