import instance from "./instance";
import type { Cooler } from "../types/build";

export const fetchCoolers = (page = 1, pageSize = 100, odataFilter?: string) =>
  instance.getOData<Cooler>("Cooler", page, pageSize, odataFilter);
