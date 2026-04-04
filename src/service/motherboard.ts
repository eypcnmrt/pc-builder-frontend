import instance from "./instance";
import type { PagedData } from "../types/processor";
import type { Motherboard } from "../types/motherboard";

export const fetchCompatibleMotherboards = async (
  socket: string | undefined,
  page = 1,
  pageSize = 100
): Promise<PagedData<Motherboard> | null> => {
  if (!socket) {
    return instance.getOData<Motherboard>("Motherboard", page, pageSize);
  }
  return instance.get<PagedData<Motherboard>>("Motherboard/compatible", {
    params: { socket, page, pageSize },
  });
};
