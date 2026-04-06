import { dummyService } from "../data/dummy";
import type { PagedData } from "../types/processor";
import type { PSU } from "../types/build";

export const fetchPsus = (page = 1, pageSize = 100, odataFilter?: string): Promise<PagedData<PSU> | null> => {
  const result = dummyService.getPsus(page, pageSize, odataFilter);
  return Promise.resolve(result);
};
