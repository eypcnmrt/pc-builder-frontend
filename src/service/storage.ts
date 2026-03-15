import instance from "./instance";
import type { Storage } from "../types/build";

export const fetchStorages = (page = 1, pageSize = 100, odataFilter?: string) =>
  instance.getOData<Storage>("Storage", page, pageSize, odataFilter);

export const fetchStorageById = (id: number) =>
  instance.get<Storage>(`Storage/${id}`);
