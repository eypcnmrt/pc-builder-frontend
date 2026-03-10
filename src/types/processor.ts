export interface Processor {
  id: number;
  brand: string;
  model: string;
  series: string;
  architecture: string;
  socket: string;
  cores: number;
  threads: number;
  baseClock: number;
  boostClock: number;
  tdp: number;
  l3Cache: number;
  memoryType: string;
  integratedGraphics: boolean;
  price: number;
}

export interface PagedData<T> {
  items: T[];
  totalCount: number;
  pageCount: number;
  page: number;
  pageSize: number;
}
