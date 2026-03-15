import instance from "./instance";
import type { PagedData } from "../types/processor";
import type { Motherboard } from "../types/motherboard";

export const fetchCompatibleMotherboards = async (
  socket: string,
  page = 1,
  pageSize = 100
) =>
  instance.get<PagedData<Motherboard>>("Motherboard/compatible", {
    params: { socket, page, pageSize },
  });
