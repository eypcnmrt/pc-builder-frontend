import { useState, useEffect, useMemo } from "react";
import { fetchProcessors } from "../service/processor";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { Processor } from "../types/processor";

interface ProcessorFilters {
  search: string;
  brands: string[];
  sockets: string[];
  priceMin: number;
  priceMax: number;
}

const DEFAULT_FILTERS: ProcessorFilters = {
  search: "",
  brands: [],
  sockets: [],
  priceMin: 0,
  priceMax: 999999,
};

export const useProcessorTab = () => {
  const { state, setComponent } = useBuildContext();
  const [asyncState, setAsyncState] = useState<AsyncState<Processor[]>>(asyncLoading());
  const [filters, setFilters] = useState<ProcessorFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    const load = async () => {
      const result = await fetchProcessors(1, 200);
      if (!result) {
        setAsyncState(asyncError("İşlemciler yüklenemedi. Lütfen tekrar deneyin."));
        return;
      }
      setAsyncState(asyncSuccess(result.items));
      const prices = result.items.map((p) => p.price ?? 0).filter(Boolean);
      if (prices.length) {
        setFilters((f) => ({ ...f, priceMin: Math.min(...prices), priceMax: Math.max(...prices) }));
      }
    };
    load();
  }, []);

  const options = useMemo(() => {
    const data = asyncState.data ?? [];
    return {
      brands: [...new Set(data.map((p) => p.brand))].sort(),
      sockets: [...new Set(data.map((p) => p.socket))].sort(),
      minPrice: Math.min(...data.map((p) => p.price ?? 0).filter(Boolean), 0),
      maxPrice: Math.max(...data.map((p) => p.price ?? 0), 0),
    };
  }, [asyncState.data]);

  const filtered = useMemo(() => {
    const data = asyncState.data ?? [];
    return data.filter((p) => {
      if (filters.search && !`${p.brand} ${p.model}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.sockets.length && !filters.sockets.includes(p.socket)) return false;
      if (p.price != null && (p.price < filters.priceMin || p.price > filters.priceMax)) return false;
      return true;
    });
  }, [asyncState.data, filters]);

  const toggleArrayFilter = (key: "brands" | "sockets", value: string) => {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));
  };

  const handleSelect = (processor: Processor) => {
    setComponent("processorId", processor.id);
    setComponent("processor", processor);
    setComponent("motherboardId", undefined);
    setComponent("motherboard", undefined);
    toast.success(`${processor.brand} ${processor.model} seçildi`);
  };

  const resetFilters = () => setFilters({ ...DEFAULT_FILTERS, priceMin: options.minPrice, priceMax: options.maxPrice });

  return {
    asyncState,
    filtered,
    filters,
    options,
    viewMode,
    setViewMode,
    setFilters,
    toggleArrayFilter,
    resetFilters,
    handleSelect,
    selectedId: state.processorId,
  };
};
