import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchProcessors } from "../service/processor";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { Processor } from "../types/processor";

interface ProcessorFilters {
  brands: string[];
  sockets: string[];
  series: string[];
  boostClocks: number[];
  priceMin: number;
  priceMax: number;
}

export type ProcessorSortField = "price" | "cores" | "boostClock" | "tdp";
export interface SortState<T extends string> { field: T; direction: "asc" | "desc"; }

const DEFAULT_FILTERS: ProcessorFilters = {
  brands: [],
  sockets: [],
  series: [],
  boostClocks: [],
  priceMin: 0,
  priceMax: 999999,
};

const DEFAULT_SORT: SortState<ProcessorSortField> = { field: "price", direction: "asc" };

// Model string'inden seri adını çıkar
const extractSeries = (model: string): string => {
  const m = model.replace(/[™®]/g, "").toLowerCase();
  if (/core\s+ultra\s+9/.test(m)) return "Core Ultra 9";
  if (/core\s+ultra\s+7/.test(m)) return "Core Ultra 7";
  if (/core\s+ultra\s+5/.test(m)) return "Core Ultra 5";
  if (/core\s+ultra\s+3/.test(m)) return "Core Ultra 3";
  if (/core\s+i9/.test(m)) return "Core i9";
  if (/core\s+i7/.test(m)) return "Core i7";
  if (/core\s+i5/.test(m)) return "Core i5";
  if (/core\s+i3/.test(m)) return "Core i3";
  if (/ryzen\s*9/.test(m)) return "Ryzen 9";
  if (/ryzen\s*7/.test(m)) return "Ryzen 7";
  if (/ryzen\s*5/.test(m)) return "Ryzen 5";
  if (/ryzen\s*3/.test(m)) return "Ryzen 3";
  if (/threadripper/.test(m)) return "Threadripper";
  return "";
};

// Her seri adı için OData filter ifadesi
const SERIES_ODATA: Record<string, string> = {
  "Core Ultra 9": "contains(tolower(Model),'core ultra 9')",
  "Core Ultra 7": "contains(tolower(Model),'core ultra 7')",
  "Core Ultra 5": "contains(tolower(Model),'core ultra 5')",
  "Core Ultra 3": "contains(tolower(Model),'core ultra 3')",
  "Core i9":      "contains(tolower(Model),'core i9')",
  "Core i7":      "contains(tolower(Model),'core i7')",
  "Core i5":      "contains(tolower(Model),'core i5')",
  "Core i3":      "contains(tolower(Model),'core i3')",
  "Ryzen 9":      "(contains(tolower(Model),'ryzen 9') or contains(tolower(Model),'ryzen™ 9'))",
  "Ryzen 7":      "(contains(tolower(Model),'ryzen 7') or contains(tolower(Model),'ryzen™ 7'))",
  "Ryzen 5":      "(contains(tolower(Model),'ryzen 5') or contains(tolower(Model),'ryzen™ 5'))",
  "Ryzen 3":      "(contains(tolower(Model),'ryzen 3') or contains(tolower(Model),'ryzen™ 3'))",
  "Threadripper": "contains(tolower(Model),'threadripper')",
};

const buildODataFilter = (filters: ProcessorFilters, search: string): string => {
  const parts: string[] = [];

  if (search) {
    const s = search.replace(/'/g, "''");
    parts.push(`(contains(tolower(Brand),'${s}') or contains(tolower(Model),'${s}'))`);
  }

  if (filters.brands.length) {
    const brandParts = filters.brands.map((b) => `Brand eq '${b.replace(/'/g, "''")}'`).join(" or ");
    parts.push(`(${brandParts})`);
  }

  if (filters.sockets.length) {
    const socketParts = filters.sockets.map((s) => `Socket eq '${s.replace(/'/g, "''")}'`).join(" or ");
    parts.push(`(${socketParts})`);
  }

  if (filters.series.length) {
    const seriesParts = filters.series
      .map((s) => SERIES_ODATA[s])
      .filter(Boolean)
      .join(" or ");
    if (seriesParts) parts.push(`(${seriesParts})`);
  }

  if (filters.boostClocks.length) {
    // ±0.049 toleranslı aralık — 1 ondalık yuvarlama değerlerini kapsar
    const clockParts = filters.boostClocks
      .map((v) => `(BoostClock ge ${(v - 0.049).toFixed(3)} and BoostClock le ${(v + 0.049).toFixed(3)})`)
      .join(" or ");
    parts.push(`(${clockParts})`);
  }

  if (filters.priceMin > DEFAULT_FILTERS.priceMin) parts.push(`Price ge ${filters.priceMin}`);
  if (filters.priceMax < DEFAULT_FILTERS.priceMax) parts.push(`Price le ${filters.priceMax}`);

  return parts.join(" and ");
};

export const useProcessorTab = () => {
  const { state, setComponent } = useBuildContext();

  const [asyncState, setAsyncState] = useState<AsyncState<Processor[]>>(asyncLoading());
  const [allData, setAllData]       = useState<Processor[]>([]);
  const [pendingFilters, setPendingFilters] = useState<ProcessorFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<ProcessorFilters>(DEFAULT_FILTERS);
  const [sort, setSort]         = useState<SortState<ProcessorSortField>>(DEFAULT_SORT);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchInput, setSearchInput]     = useState("");
  const [committedSearch, setCommittedSearch] = useState("");

  // Bir kez: seçenek listeleri ve başlangıç fiyat aralığı için filtresiz veri
  useEffect(() => {
    const loadOptions = async () => {
      const result = await fetchProcessors(1, 500);
      if (!result?.items.length) return;
      setAllData(result.items);
      const prices = result.items.map((p) => p.price ?? 0).filter((p) => p > 0);
      if (prices.length) {
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setPendingFilters((f) => ({ ...f, priceMin: min, priceMax: max }));
      }
    };
    loadOptions();
  }, []);

  // appliedFilters veya arama değişince API isteği at
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setAsyncState(asyncLoading());
      const odataFilter = buildODataFilter(appliedFilters, committedSearch) || undefined;
      const result = await fetchProcessors(1, 200, odataFilter);
      if (cancelled) return;
      if (!result) {
        setAsyncState(asyncError("İşlemciler yüklenemedi. Lütfen tekrar deneyin."));
        return;
      }
      setAsyncState(asyncSuccess(result.items));
    };
    load();
    return () => { cancelled = true; };
  }, [appliedFilters, committedSearch]);

  const onSearch = useCallback(() => {
    setCommittedSearch(searchInput.trim().toLowerCase());
  }, [searchInput]);

  // Tüm (filtresiz) veriden türetilen seçenek listeleri
  const options = useMemo(() => {
    const data = allData.length ? allData : (asyncState.data ?? []);
    const prices = data.map((p) => p.price ?? 0).filter(Boolean);

    const seriesSet = new Set<string>();
    data.forEach((p) => {
      const s = extractSeries(p.model);
      if (s) seriesSet.add(s);
    });

    const boostSet = new Set<number>();
    data.forEach((p) => {
      if (p.boostClock > 0) boostSet.add(Math.round(p.boostClock * 10) / 10);
    });

    // Seri sıralaması: Intel Ultra > Intel Core > AMD Ryzen (descending number)
    const seriesOrder = [
      "Core Ultra 9","Core Ultra 7","Core Ultra 5",
      "Core i9","Core i7","Core i5","Core i3",
      "Ryzen 9","Ryzen 7","Ryzen 5",
    ];

    return {
      brands:      [...new Set(data.map((p) => p.brand))].sort(),
      sockets:     [...new Set(data.map((p) => p.socket))].sort(),
      series:      seriesOrder.filter((s) => seriesSet.has(s)),
      boostClocks: [...boostSet].sort((a, b) => b - a),
      minPrice:    prices.length ? Math.min(...prices) : 0,
      maxPrice:    prices.length ? Math.max(...prices) : 999999,
    };
  }, [allData, asyncState.data]);

  // Sadece sırala — filtreleme sunucu tarafında yapıldı
  const filtered = useMemo(() => {
    const data = asyncState.data ?? [];
    return [...data].sort((a, b) => {
      const aVal = a[sort.field] ?? 0;
      const bVal = b[sort.field] ?? 0;
      return sort.direction === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [asyncState.data, sort]);

  // Her filtre türü için: pending'i güncelle
  const togglePendingBrand = (v: string) =>
    setPendingFilters((f) => ({ ...f, brands: f.brands.includes(v) ? f.brands.filter((x) => x !== v) : [...f.brands, v] }));

  const togglePendingSocket = (v: string) =>
    setPendingFilters((f) => ({ ...f, sockets: f.sockets.includes(v) ? f.sockets.filter((x) => x !== v) : [...f.sockets, v] }));

  const togglePendingSeries = (v: string) =>
    setPendingFilters((f) => ({ ...f, series: f.series.includes(v) ? f.series.filter((x) => x !== v) : [...f.series, v] }));

  const togglePendingBoostClock = (v: string) => {
    const num = parseFloat(v);
    setPendingFilters((f) => ({
      ...f,
      boostClocks: f.boostClocks.includes(num) ? f.boostClocks.filter((x) => x !== num) : [...f.boostClocks, num],
    }));
  };

  // Her filtre türü için: pending → applied (API tetikler)
  const applyPriceFilter = useCallback(() => {
    setAppliedFilters((f) => ({ ...f, priceMin: pendingFilters.priceMin, priceMax: pendingFilters.priceMax }));
  }, [pendingFilters.priceMin, pendingFilters.priceMax]);

  const applyBrandsFilter = useCallback(() => {
    setAppliedFilters((f) => ({ ...f, brands: pendingFilters.brands }));
  }, [pendingFilters.brands]);

  const applySocketsFilter = useCallback(() => {
    setAppliedFilters((f) => ({ ...f, sockets: pendingFilters.sockets }));
  }, [pendingFilters.sockets]);

  const applySeriesFilter = useCallback(() => {
    setAppliedFilters((f) => ({ ...f, series: pendingFilters.series }));
  }, [pendingFilters.series]);

  const applyBoostClocksFilter = useCallback(() => {
    setAppliedFilters((f) => ({ ...f, boostClocks: pendingFilters.boostClocks }));
  }, [pendingFilters.boostClocks]);

  const handleSelect = (processor: Processor) => {
    setComponent("processorId", processor.id);
    setComponent("processor", processor);
    setComponent("motherboardId", undefined);
    setComponent("motherboard", undefined);
    toast.success(`${processor.brand} ${processor.model} seçildi`);
  };

  const resetFilters = () => {
    const defaults = { ...DEFAULT_FILTERS, priceMin: options.minPrice, priceMax: options.maxPrice };
    setPendingFilters(defaults);
    setAppliedFilters(DEFAULT_FILTERS);
    setSearchInput("");
    setCommittedSearch("");
  };

  return {
    asyncState,
    filtered,
    pendingFilters,
    setPendingFilters,
    options,
    sort, setSort,
    viewMode, setViewMode,
    togglePendingBrand,
    togglePendingSocket,
    togglePendingSeries,
    togglePendingBoostClock,
    applyPriceFilter,
    applyBrandsFilter,
    applySocketsFilter,
    applySeriesFilter,
    applyBoostClocksFilter,
    resetFilters,
    handleSelect,
    selectedId: state.processorId,
    searchInput, setSearchInput, onSearch,
  };
};
