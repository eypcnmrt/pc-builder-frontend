import { dummyService } from "../data/dummy";
import type { PagedData } from "../types/processor";
import type { RAM } from "../types/build";

export const fetchRams = (page = 1, pageSize = 100, odataFilter?: string): Promise<PagedData<RAM> | null> => {
  const result = dummyService.getRams(page, pageSize, odataFilter);
  return Promise.resolve(result);
};
