import { dummyService } from "../data/dummy";
import type { PagedData } from "../types/processor";
import type { PcCase } from "../types/build";

export const fetchPcCases = (page = 1, pageSize = 100, odataFilter?: string): Promise<PagedData<PcCase> | null> => {
  const result = dummyService.getPcCases(page, pageSize, odataFilter);
  return Promise.resolve(result);
};
