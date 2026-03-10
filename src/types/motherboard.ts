import type { PagedData } from "./processor";

export interface Motherboard {
  id: number;
  brand: string;
  model: string;
  socket: string;
  chipset: string;
  formFactor: string;
  maxRamGb: number;
  ramSlots: number;
  supportedRamType: string;
}

export type { PagedData };
