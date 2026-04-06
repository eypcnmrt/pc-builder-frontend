import { dummyService } from "../data/dummy";
import type { PagedData } from "../types/processor";
import type { Cooler } from "../types/build";

export const fetchCoolers = (page = 1, pageSize = 100, odataFilter?: string): Promise<PagedData<Cooler> | null> => {
  const result = dummyService.getCoolers(page, pageSize, odataFilter);
  return Promise.resolve(result);
};
