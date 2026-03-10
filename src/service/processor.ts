import instance from "./instance";
import type { PagedData, Processor } from "../types/processor";

export const fetchProcessors = async (page = 1, pageSize = 20) => {
  return await instance.get<PagedData<Processor>>(
    `Processor/OData?page=${page}&pageSize=${pageSize}`
  );
};
