import instance from "./instance";
import type { PSU } from "../types/build";

export const fetchPsus = (page = 1, pageSize = 100, odataFilter?: string) =>
  instance.getOData<PSU>("Psu", page, pageSize, odataFilter);
