import type { Processor, PagedData } from "../types/processor";
import type { GPU, RAM, Storage, PSU, PcCase, Cooler, Build, BuildActivity, UpdateBuildRequest } from "../types/build";
import type { Motherboard } from "../types/motherboard";
import type { AuthResponseDTO } from "../types/auth";

// ===== PROCESSORS =====
export const DUMMY_PROCESSORS: Processor[] = [
  { id: 1, brand: "Intel", model: "Core i3-12100F", series: "Core i3", socket: "LGA1700", cores: 4, threads: 8, baseClock: 3.3, boostClock: 4.3, tdp: 58, l3Cache: 12, memoryType: "DDR4/DDR5", integratedGraphics: false, price: 850 },
  { id: 2, brand: "Intel", model: "Core i5-13600K", series: "Core i5", socket: "LGA1700", cores: 14, threads: 20, baseClock: 3.0, boostClock: 5.1, tdp: 125, l3Cache: 20, memoryType: "DDR4/DDR5", integratedGraphics: true, price: 2500 },
  { id: 3, brand: "Intel", model: "Core i7-13700K", series: "Core i7", socket: "LGA1700", cores: 16, threads: 24, baseClock: 3.4, boostClock: 5.4, tdp: 125, l3Cache: 30, memoryType: "DDR4/DDR5", integratedGraphics: true, price: 3800 },
  { id: 4, brand: "Intel", model: "Core i9-13900K", series: "Core i9", socket: "LGA1700", cores: 24, threads: 32, baseClock: 3.0, boostClock: 5.8, tdp: 150, l3Cache: 36, memoryType: "DDR4/DDR5", integratedGraphics: true, price: 5200 },
  { id: 5, brand: "Intel", model: "Core Ultra 5 245K", series: "Core Ultra 5", socket: "LGA1851", cores: 14, threads: 18, baseClock: 3.2, boostClock: 5.2, tdp: 114, l3Cache: 24, memoryType: "DDR5", integratedGraphics: true, price: 2200 },
  { id: 6, brand: "Intel", model: "Core Ultra 7 265K", series: "Core Ultra 7", socket: "LGA1851", cores: 16, threads: 22, baseClock: 3.1, boostClock: 5.6, tdp: 125, l3Cache: 36, memoryType: "DDR5", integratedGraphics: true, price: 3600 },
  { id: 7, brand: "Intel", model: "Core Ultra 9 285K", series: "Core Ultra 9", socket: "LGA1851", cores: 24, threads: 32, baseClock: 3.7, boostClock: 6.0, tdp: 162, l3Cache: 36, memoryType: "DDR5", integratedGraphics: true, price: 5400 },
  { id: 8, brand: "AMD", model: "Ryzen 5 7600X", series: "Ryzen 5", socket: "AM5", cores: 6, threads: 12, baseClock: 4.7, boostClock: 5.3, tdp: 105, l3Cache: 32, memoryType: "DDR5", integratedGraphics: false, price: 1800 },
  { id: 9, brand: "AMD", model: "Ryzen 7 7700X", series: "Ryzen 7", socket: "AM5", cores: 8, threads: 16, baseClock: 4.5, boostClock: 5.4, tdp: 105, l3Cache: 32, memoryType: "DDR5", integratedGraphics: false, price: 2800 },
  { id: 10, brand: "AMD", model: "Ryzen 9 7950X", series: "Ryzen 9", socket: "AM5", cores: 16, threads: 32, baseClock: 4.5, boostClock: 5.7, tdp: 162, l3Cache: 64, memoryType: "DDR5", integratedGraphics: false, price: 4600 },
];

// ===== GPUs =====
export const DUMMY_GPUS: GPU[] = [
  { id: 1, brand: "NVIDIA", model: "RTX 3060 Ti 8GB", memoryGb: 8, boostClock: 1.665, tdp: 250, lengthMm: 267, imageUrl: undefined },
  { id: 2, brand: "NVIDIA", model: "RTX 4060 8GB", memoryGb: 8, boostClock: 2.505, tdp: 70, lengthMm: 190, imageUrl: undefined },
  { id: 3, brand: "NVIDIA", model: "RTX 4070 Ti 12GB", memoryGb: 12, boostClock: 2.61, tdp: 285, lengthMm: 290, imageUrl: undefined },
  { id: 4, brand: "NVIDIA", model: "RTX 4090 24GB", memoryGb: 24, boostClock: 2.52, tdp: 450, lengthMm: 300, imageUrl: undefined },
  { id: 5, brand: "AMD", model: "RX 6700 XT 12GB", memoryGb: 12, boostClock: 2.5, tdp: 250, lengthMm: 267, imageUrl: undefined },
  { id: 6, brand: "AMD", model: "RX 7900 XTX 24GB", memoryGb: 24, boostClock: 2.5, tdp: 420, lengthMm: 330, imageUrl: undefined },
];

// ===== MOTHERBOARDS =====
export const DUMMY_MOTHERBOARDS: Motherboard[] = [
  { id: 1, brand: "ASUS", model: "ROG STRIX Z790-E", socket: "LGA1700", chipset: "Z790", formFactor: "ATX", maxRamGb: 192, ramSlots: 4, supportedRamType: "DDR5", price: 3200, imageUrl: undefined },
  { id: 2, brand: "MSI", model: "PRO B760M-A", socket: "LGA1700", chipset: "B760", formFactor: "mATX", maxRamGb: 192, ramSlots: 4, supportedRamType: "DDR5", price: 1600, imageUrl: undefined },
  { id: 3, brand: "Gigabyte", model: "H610M-K", socket: "LGA1700", chipset: "H610", formFactor: "Mini-ITX", maxRamGb: 96, ramSlots: 2, supportedRamType: "DDR5", price: 900, imageUrl: undefined },
  { id: 4, brand: "ASUS", model: "ROG CROSSHAIR X870E-E", socket: "AM5", chipset: "X870E", formFactor: "ATX", maxRamGb: 192, ramSlots: 4, supportedRamType: "DDR5", price: 3500, imageUrl: undefined },
  { id: 5, brand: "MSI", model: "MPG B650 EDGE", socket: "AM5", chipset: "B650", formFactor: "mATX", maxRamGb: 192, ramSlots: 4, supportedRamType: "DDR5", price: 1800, imageUrl: undefined },
  { id: 6, brand: "Gigabyte", model: "A620M", socket: "AM5", chipset: "A620", formFactor: "Mini-ITX", maxRamGb: 192, ramSlots: 2, supportedRamType: "DDR5", price: 800, imageUrl: undefined },
];

// ===== RAM =====
export const DUMMY_RAMS: RAM[] = [
  { id: 1, brand: "Corsair", model: "Vengeance LPX 16GB DDR4", capacityGb: 16, type: "DDR4", speedMhz: 3200, modules: 2, latencyCl: 16, imageUrl: undefined },
  { id: 2, brand: "Kingston", model: "Fury Beast 32GB DDR4", capacityGb: 32, type: "DDR4", speedMhz: 3600, modules: 2, latencyCl: 18, imageUrl: undefined },
  { id: 3, brand: "G.Skill", model: "Trident Z5 16GB DDR5", capacityGb: 16, type: "DDR5", speedMhz: 4800, modules: 2, latencyCl: 40, imageUrl: undefined },
  { id: 4, brand: "Corsair", model: "Dominator Titanium 32GB DDR5", capacityGb: 32, type: "DDR5", speedMhz: 6000, modules: 2, latencyCl: 30, imageUrl: undefined },
  { id: 5, brand: "Kingston", model: "Fury Renegade 64GB DDR5", capacityGb: 64, type: "DDR5", speedMhz: 5600, modules: 2, latencyCl: 36, imageUrl: undefined },
];

// ===== STORAGE =====
export const DUMMY_STORAGES: Storage[] = [
  { id: 1, brand: "Seagate", model: "Barracuda 2TB", type: "HDD", capacityGb: 2048, interface: "SATA", readSpeedMbs: 180, writeSpeedMbs: 180, imageUrl: undefined },
  { id: 2, brand: "Samsung", model: "870 EVO 1TB", type: "SSD", capacityGb: 1024, interface: "SATA", readSpeedMbs: 560, writeSpeedMbs: 530, imageUrl: undefined },
  { id: 3, brand: "WD", model: "Blue SN570 1TB", type: "SSD", capacityGb: 1024, interface: "NVMe Gen3", readSpeedMbs: 3500, writeSpeedMbs: 3000, imageUrl: undefined },
  { id: 4, brand: "Samsung", model: "980 Pro 2TB", type: "SSD", capacityGb: 2048, interface: "NVMe Gen4", readSpeedMbs: 7100, writeSpeedMbs: 6000, imageUrl: undefined },
  { id: 5, brand: "Crucial", model: "T700 4TB", type: "SSD", capacityGb: 4096, interface: "NVMe Gen5", readSpeedMbs: 12400, writeSpeedMbs: 11800, imageUrl: undefined },
];

// ===== PSU =====
export const DUMMY_PSUS: PSU[] = [
  { id: 1, brand: "Corsair", model: "CX 550W", wattage: 550, efficiencyRating: "Bronze", modular: "Full", imageUrl: undefined },
  { id: 2, brand: "EVGA", model: "SuperNOVA 650W G5", wattage: 650, efficiencyRating: "Gold", modular: "Fully", imageUrl: undefined },
  { id: 3, brand: "Be Quiet", model: "Straight Power 11 750W", wattage: 750, efficiencyRating: "Gold", modular: "Fully", imageUrl: undefined },
  { id: 4, brand: "Seasonic", model: "PRIME PX-850W", wattage: 850, efficiencyRating: "Platinum", modular: "Fully", imageUrl: undefined },
  { id: 5, brand: "EVGA", model: "SuperNOVA T2 1000W", wattage: 1000, efficiencyRating: "Titanium", modular: "Fully", imageUrl: undefined },
];

// ===== COOLERS =====
export const DUMMY_COOLERS: Cooler[] = [
  { id: 1, brand: "Cooler Master", model: "Hyper 212 Black", type: "Air", tdpW: 150, compatibleSockets: "LGA1700,AM5", heightMm: 158, imageUrl: undefined },
  { id: 2, brand: "Noctua", model: "NH-D15", type: "Air", tdpW: 250, compatibleSockets: "LGA1700,AM5", heightMm: 165, imageUrl: undefined },
  { id: 3, brand: "NZXT", model: "Kraken X53 120mm", type: "Liquid AIO", tdpW: 250, compatibleSockets: "LGA1700,AM5", radiatorSizeMm: 120, imageUrl: undefined },
  { id: 4, brand: "Corsair", model: "iCUE H100i Elite Capellix 240mm", type: "Liquid AIO", tdpW: 300, compatibleSockets: "LGA1700,AM5", radiatorSizeMm: 240, imageUrl: undefined },
  { id: 5, brand: "NZXT", model: "Kraken Z63 280mm", type: "Liquid AIO", tdpW: 350, compatibleSockets: "LGA1700,AM5", radiatorSizeMm: 280, imageUrl: undefined },
  { id: 6, brand: "Corsair", model: "iCUE H150i Pro XT 360mm", type: "Liquid AIO", tdpW: 400, compatibleSockets: "LGA1700,AM5", radiatorSizeMm: 360, imageUrl: undefined },
];

// ===== PC CASES =====
export const DUMMY_PCCASES: PcCase[] = [
  { id: 1, brand: "Fractal Design", model: "North XL", formFactor: "Full Tower", maxGpuLengthMm: 410, maxCoolerHeightMm: 172, imageUrl: undefined },
  { id: 2, brand: "Corsair", model: "4000D Airflow", formFactor: "Mid Tower", maxGpuLengthMm: 380, maxCoolerHeightMm: 170, imageUrl: undefined },
  { id: 3, brand: "NZXT", model: "H510 Flow mATX", formFactor: "mATX", maxGpuLengthMm: 320, maxCoolerHeightMm: 160, imageUrl: undefined },
  { id: 4, brand: "Lian Li", model: "Lancool 205 mATX", formFactor: "mATX", maxGpuLengthMm: 290, maxCoolerHeightMm: 140, imageUrl: undefined },
  { id: 5, brand: "Jonsbo", model: "D41", formFactor: "Mini-ITX", maxGpuLengthMm: 250, maxCoolerHeightMm: 120, imageUrl: undefined },
];

// ===== HELPER: Create PagedData =====
function createPagedData<T>(items: T[], page: number, pageSize: number): PagedData<T> {
  const filtered = items.slice((page - 1) * pageSize, page * pageSize);
  return {
    items: filtered,
    totalCount: items.length,
    pageCount: Math.ceil(items.length / pageSize),
    page,
    pageSize,
  };
}

// ===== FILTERS =====
function evaluateOData(item: any, odataFilter: string): boolean {
  let expr = odataFilter;

  // Handle Brand eq 'value'
  expr = expr.replace(/Brand\s+eq\s+'([^']+)'/gi, (_, val) => {
    return item.brand === val ? "true" : "false";
  });

  // Handle Socket eq 'value'
  expr = expr.replace(/Socket\s+eq\s+'([^']+)'/gi, (_, val) => {
    return item.socket === val ? "true" : "false";
  });

  // Handle contains(tolower(Brand),'value')
  expr = expr.replace(/contains\(tolower\(Brand\),'([^']+)'\)/gi, (_, val) => {
    return (item.brand || "").toLowerCase().includes(val) ? "true" : "false";
  });

  // Handle contains(tolower(Model),'value')
  expr = expr.replace(/contains\(tolower\(Model\),'([^']+)'\)/gi, (_, val) => {
    return (item.model || "").toLowerCase().includes(val) ? "true" : "false";
  });

  // Handle Price/BoostClock comparisons
  expr = expr.replace(/Price\s+ge\s+(\d+)/gi, (_, val) => {
    return item.price >= Number(val) ? "true" : "false";
  });
  expr = expr.replace(/Price\s+le\s+(\d+)/gi, (_, val) => {
    return item.price <= Number(val) ? "true" : "false";
  });
  expr = expr.replace(/BoostClock\s+ge\s+([\d.]+)/gi, (_, val) => {
    return item.boostClock >= Number(val) ? "true" : "false";
  });
  expr = expr.replace(/BoostClock\s+le\s+([\d.]+)/gi, (_, val) => {
    return item.boostClock <= Number(val) ? "true" : "false";
  });

  // Handle 'or' and 'and'
  expr = expr.replace(/\s+or\s+/gi, " || ");
  expr = expr.replace(/\s+and\s+/gi, " && ");

  // Clean up parentheses
  expr = expr.replace(/\(\s*true\s*\)/g, "true");
  expr = expr.replace(/\(\s*false\s*\)/g, "false");

  try {
    return Function(`'use strict'; return (${expr})`)();
  } catch {
    return true; // default: include
  }
}

function filterByOData<T extends { brand?: string; model?: string }>(
  items: T[],
  odataFilter?: string
): T[] {
  if (!odataFilter) return items;
  return items.filter(item => evaluateOData(item, odataFilter));
}

// ===== PUBLIC API =====
export const dummyService = {
  getProcessors: (page: number, pageSize: number, odataFilter?: string): PagedData<Processor> => {
    const filtered = filterByOData(DUMMY_PROCESSORS, odataFilter);
    return createPagedData(filtered, page, pageSize);
  },

  getGpus: (page: number, pageSize: number, odataFilter?: string): PagedData<GPU> => {
    const filtered = filterByOData(DUMMY_GPUS, odataFilter);
    return createPagedData(filtered, page, pageSize);
  },

  getMotherboards: (page: number, pageSize: number, socket?: string): PagedData<Motherboard> => {
    const filtered = socket
      ? DUMMY_MOTHERBOARDS.filter(m => m.socket === socket)
      : DUMMY_MOTHERBOARDS;
    return createPagedData(filtered, page, pageSize);
  },

  getRams: (page: number, pageSize: number, odataFilter?: string): PagedData<RAM> => {
    const filtered = filterByOData(DUMMY_RAMS, odataFilter);
    return createPagedData(filtered, page, pageSize);
  },

  getStorages: (page: number, pageSize: number, odataFilter?: string): PagedData<Storage> => {
    const filtered = filterByOData(DUMMY_STORAGES, odataFilter);
    return createPagedData(filtered, page, pageSize);
  },

  getPsus: (page: number, pageSize: number, odataFilter?: string): PagedData<PSU> => {
    const filtered = filterByOData(DUMMY_PSUS, odataFilter);
    return createPagedData(filtered, page, pageSize);
  },

  getCoolers: (page: number, pageSize: number, odataFilter?: string): PagedData<Cooler> => {
    const filtered = filterByOData(DUMMY_COOLERS, odataFilter);
    return createPagedData(filtered, page, pageSize);
  },

  getPcCases: (page: number, pageSize: number, odataFilter?: string): PagedData<PcCase> => {
    const filtered = filterByOData(DUMMY_PCCASES, odataFilter);
    return createPagedData(filtered, page, pageSize);
  },

  login: (email: string, _password: string): AuthResponseDTO => ({
    token: `dummy-jwt-token-for-${email}`,
    username: email.split("@")[0] || "TestUser",
    email,
  }),

  register: (username: string, email: string, _password: string): AuthResponseDTO => ({
    token: `dummy-jwt-token-for-${email}`,
    username,
    email,
  }),

  getCurrentBuild: (): Build => ({
    id: 1,
    name: "My PC Build",
    totalPrice: 0,
    estimatedWatts: 0,
    warnings: [],
  }),

  getBuildActivities: (_buildId: number): PagedData<BuildActivity> => ({
    items: [
      { id: 1, timestamp: new Date().toISOString(), action: "created", detail: "Build created", componentType: "Build" },
      { id: 2, timestamp: new Date().toISOString(), action: "added", detail: "Processor selected", componentType: "Processor" },
    ],
    totalCount: 2,
    pageCount: 1,
    page: 1,
    pageSize: 100,
  }),

  updateBuild: (id: number, req: UpdateBuildRequest): Build => ({
    id,
    name: req.name || "My PC Build",
    totalPrice: 0,
    estimatedWatts: 0,
    warnings: [],
  }),

  createBuild: (): Build => ({
    id: 1,
    name: "New Build",
    totalPrice: 0,
    estimatedWatts: 0,
  }),

  deleteBuild: (_id: number): void => {
    // no-op
  },
};
