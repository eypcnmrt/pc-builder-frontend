import instance from "./instance";
import type { Processor } from "../types/processor";

export const fetchProcessors = (page = 1, pageSize = 100, odataFilter?: string) =>
  instance.getOData<Processor>("Processor", page, pageSize, odataFilter);
