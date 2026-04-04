import { useState, useEffect, useMemo } from "react";
import { fetchCompatibleMotherboards } from "../service/motherboard";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { Motherboard } from "../types/motherboard";

interface MotherboardFilters {
  search: string;
  brands: string[];
  chipsets: string[];
  formFactors: string[];
}

const DEFAULT_FILTERS: MotherboardFilters = { search: "", brands: [], chipsets: [], formFactors: [] };

export const useMotherboardTab = () => {
  const { state, setComponent } = useBuildContext();
  const [asyncState, setAsyncState] = useState<AsyncState<Motherboard[]>>(asyncLoading());
  const [filters, setFilters] = useState<MotherboardFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    const load = async () => {
      const socket = state.processor?.socket ?? "";
      const result = await fetchCompatibleMotherboards(socket, 1, 200);
      if (!result) {
        setAsyncState(asyncError("Anakartlar yüklenemedi."));
        return;
      }
      setAsyncState(asyncSuccess(result.items));
    };
    load();
  }, [state.processor?.socket]);

  const options = useMemo(() => {
    const data = asyncState.data ?? [];
    return {
      brands: [...new Set(data.map((m) => m.brand))].sort(),
      chipsets: [...new Set(data.map((m) => m.chipset))].sort(),
      formFactors: [...new Set(data.map((m) => m.formFactor))].sort(),
    };
  }, [asyncState.data]);

  const filtered = useMemo(() => {
    const data = asyncState.data ?? [];
    return data.filter((m) => {
      if (filters.search && !`${m.brand} ${m.model}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.brands.length && !filters.brands.includes(m.brand)) return false;
      if (filters.chipsets.length && !filters.chipsets.includes(m.chipset)) return false;
      if (filters.formFactors.length && !filters.formFactors.includes(m.formFactor)) return false;
      return true;
    });
  }, [asyncState.data, filters]);

  const toggleArrayFilter = (key: keyof Omit<MotherboardFilters, "search">, value: string) => {
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
    }));
  };

  const handleSelect = (mb: Motherboard) => {
    setComponent("motherboardId", mb.id);
    setComponent("motherboard", mb);
    toast.success(`${mb.brand} ${mb.model} seçildi`);
  };

  return {
    asyncState,
    filtered,
    filters,
    options,
    viewMode,
    setViewMode,
    setFilters,
    toggleArrayFilter,
    resetFilters: () => setFilters(DEFAULT_FILTERS),
    handleSelect,
    selectedId: state.motherboardId,
    processorSocket: state.processor?.socket,
  };
};
