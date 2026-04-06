import { dummyService } from "../data/dummy";
import type { PagedData } from "../types/processor";
import type { Processor } from "../types/processor";

export const fetchProcessors = (page = 1, pageSize = 100, odataFilter?: string): Promise<PagedData<Processor> | null> => {
  const result = dummyService.getProcessors(page, pageSize, odataFilter);
  return Promise.resolve(result);
};
