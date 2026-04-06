import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchCompatibleMotherboards } from "../service/motherboard";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { Motherboard } from "../types/motherboard";

interface MotherboardFilters {
  brands: string[];
  chipsets: string[];
  formFactors: string[];
  priceMin: number;
  priceMax: number;
}

type MotherboardSortField = "price" | "maxRamGb" | "ramSlots";
interface SortState<T extends string> { field: T; direction: "asc" | "desc"; }

const DEFAULT_FILTERS: MotherboardFilters = { brands: [], chipsets: [], formFactors: [], priceMin: 0, priceMax: 999999 };
const DEFAULT_SORT: SortState<MotherboardSortField> = { field: "price", direction: "asc" };

export const useMotherboardTab = () => {
  const { state, setComponent } = useBuildContext();
  const [asyncState, setAsyncState] = useState<AsyncState<Motherboard[]>>(asyncLoading());
  const [filters, setFilters] = useState<MotherboardFilters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortState<MotherboardSortField>>(DEFAULT_SORT);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchInput, setSearchInput] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setAsyncState(asyncLoading());
      const socket = state.processor?.socket || undefined;
      const result = await fetchCompatibleMotherboards(socket, 1, 200);
      if (cancelled) return;
      if (!result) { setAsyncState(asyncError("Anakartlar yüklenemedi.")); return; }
      setAsyncState(asyncSuccess(result.items));
    };
    load();
    return () => { cancelled = true; };
  }, [state.processor?.socket]);

  const onSearch = useCallback(() => setCommittedSearch(searchInput.trim().toLowerCase()), [searchInput]);

  const options = useMemo(() => {
    const data = asyncState.data ?? [];
    const prices = data.map((m) => m.price ?? 0).filter((p) => p > 0);
    return {
      brands: [...new Set(data.map((m) => m.brand))].sort(),
      chipsets: [...new Set(data.map((m) => m.chipset))].sort(),
      formFactors: [...new Set(data.map((m) => m.formFactor))].sort(),
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 999999,
    };
  }, [asyncState.data]);

  // Options değişince filters'ı güncelle (fiyat aralığı merdiven mantığı)
  useEffect(() => {
    setFilters((f) => ({
      ...f,
      priceMin: options.minPrice,
      priceMax: options.maxPrice,
    }));
  }, [options.minPrice, options.maxPrice]);

  const filtered = useMemo(() => {
    const data = asyncState.data ?? [];
    const result = data.filter((m) => {
      if (committedSearch && !`${m.brand} ${m.model}`.toLowerCase().includes(committedSearch)) return false;
      if (filters.brands.length && !filters.brands.includes(m.brand)) return false;
      if (filters.chipsets.length && !filters.chipsets.includes(m.chipset)) return false;
      if (filters.formFactors.length && !filters.formFactors.includes(m.formFactor)) return false;
      if (m.price && (m.price < filters.priceMin || m.price > filters.priceMax)) return false;
      return true;
    });
    return [...result].sort((a, b) => {
      const aVal = (a[sort.field] ?? 0) as number;
      const bVal = (b[sort.field] ?? 0) as number;
      return sort.direction === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [asyncState.data, filters, sort, committedSearch]);

  const toggleArrayFilter = (key: "brands" | "chipsets" | "formFactors", value: string) => {
    setFilters((f) => ({
      ...f,
      [key]: (f[key] as string[]).includes(value) ? (f[key] as string[]).filter((v) => v !== value) : [...(f[key] as string[]), value],
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
    sort,
    setSort,
    viewMode,
    setViewMode,
    setFilters,
    toggleArrayFilter,
    resetFilters: () => { setFilters(DEFAULT_FILTERS); setSearchInput(""); setCommittedSearch(""); },
    handleSelect,
    selectedId: state.motherboardId,
    processorSocket: state.processor?.socket,
    searchInput,
    setSearchInput,
    onSearch,
  };
};
