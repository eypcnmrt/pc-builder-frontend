import { dummyService } from "../data/dummy";
import type { PagedData } from "../types/processor";
import type { GPU } from "../types/build";

export const fetchGpus = (page = 1, pageSize = 100, odataFilter?: string): Promise<PagedData<GPU> | null> => {
  const result = dummyService.getGpus(page, pageSize, odataFilter);
  return Promise.resolve(result);
};
