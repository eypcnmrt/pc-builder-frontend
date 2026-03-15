import type { Processor } from "./processor";
import type { Motherboard } from "./motherboard";

export interface GPU {
  id: number;
  brand: string;
  model: string;
  memoryGb: number;
  boostClock: number;
  tdp: number;
  lengthMm: number;
  imageUrl?: string;
}

export interface RAM {
  id: number;
  brand: string;
  model: string;
  capacityGb: number;
  type: string;
  speedMhz: number;
  modules: number;
  latencyCl: number;
  imageUrl?: string;
}

export interface Storage {
  id: number;
  brand: string;
  model: string;
  type: string;
  capacityGb: number;
  interface: string;
  readSpeedMbs: number;
  writeSpeedMbs: number;
  imageUrl?: string;
}

export interface PSU {
  id: number;
  brand: string;
  model: string;
  wattage: number;
  efficiencyRating: string;
  modular: string;
  imageUrl?: string;
}

export interface PcCase {
  id: number;
  brand: string;
  model: string;
  formFactor: string;
  maxGpuLengthMm: number;
  maxCoolerHeightMm: number;
  imageUrl?: string;
}

export interface Cooler {
  id: number;
  brand: string;
  model: string;
  type: string;
  tdpW: number;
  compatibleSockets: string;
  heightMm?: number;
  radiatorSizeMm?: number;
  imageUrl?: string;
}

export interface BuildActivity {
  id: number;
  timestamp: string;
  action: string;
  detail: string;
  componentType: string;
}

export interface PerformanceEstimate {
  gaming4K: number;
  rendering: number;
  general: number;
}

export interface UpdateBuildRequest {
  name?: string | null;
  processorId?: number | null;
  motherboardId?: number | null;
  gpuId?: number | null;
  ramId?: number | null;
  storageId?: number | null;
  psuId?: number | null;
  pcCaseId?: number | null;
  coolerId?: number | null;
}

export interface Build {
  id: number;
  name?: string;
  processor?: Processor;
  motherboard?: Motherboard;
  gpu?: GPU;
  ram?: RAM;
  storage?: Storage;
  psu?: PSU;
  pcCase?: PcCase;
  cooler?: Cooler;
  totalPrice: number;
  estimatedWatts: number;
  budget?: number;
  warnings?: string[];
  performanceEstimate?: PerformanceEstimate;
}
