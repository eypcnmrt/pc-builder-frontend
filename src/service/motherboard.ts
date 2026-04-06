import { dummyService } from "../data/dummy";
import type { PagedData } from "../types/processor";
import type { Motherboard } from "../types/motherboard";

export const fetchCompatibleMotherboards = async (
  socket: string | undefined,
  page = 1,
  pageSize = 100
): Promise<PagedData<Motherboard> | null> => {
  const result = dummyService.getMotherboards(page, pageSize, socket);
  return Promise.resolve(result);
};
