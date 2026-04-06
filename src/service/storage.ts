import { dummyService } from "../data/dummy";
import type { PagedData } from "../types/processor";
import type { Storage } from "../types/build";

export const fetchStorages = (page = 1, pageSize = 100, odataFilter?: string): Promise<PagedData<Storage> | null> => {
  const result = dummyService.getStorages(page, pageSize, odataFilter);
  return Promise.resolve(result);
};
