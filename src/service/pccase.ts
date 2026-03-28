import instance from "./instance";
import type { PcCase } from "../types/build";

export const fetchPcCases = (page = 1, pageSize = 100, odataFilter?: string) =>
  instance.getOData<PcCase>("PcCase", page, pageSize, odataFilter);
