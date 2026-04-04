import { useState, useEffect, useMemo } from "react";
import { fetchStorages } from "../service/storage";
import { useBuildContext } from "../context/BuildContext";
import { toast } from "../components/Toast";
import { asyncLoading, asyncSuccess, asyncError } from "../types/common";
import type { AsyncState } from "../types/common";
import type { Storage } from "../types/build";

interface StorageFilters { search: string; brands: string[]; types: string[]; }
const DEFAULT_FILTERS: StorageFilters = { search: "", brands: [], types: [] };

export const useStorageTab = () => {
  const { state, setComponent } = useBuildContext();
  const [asyncState, setAsyncState] = useState<AsyncState<Storage[]>>(asyncLoading());
  const [filters, setFilters] = useState<StorageFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  useEffect(() => {
    const load = async () => {
      const result = await fetchStorages(1, 200);
      if (!result) { setAsyncState(asyncError("Depolama cihazları yüklenemedi.")); return; }
      setAsyncState(asyncSuccess(result.items));
    };
    load();
  }, []);

  const options = useMemo(() => {
    const data = asyncState.data ?? [];
    return { brands: [...new Set(data.map((s) => s.brand))].sort(), types: [...new Set(data.map((s) => s.type))].sort() };
  }, [asyncState.data]);

  const filtered = useMemo(() => {
    const data = asyncState.data ?? [];
    return data.filter((s) => {
      if (filters.search && !`${s.brand} ${s.model}`.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.brands.length && !filters.brands.includes(s.brand)) return false;
      if (filters.types.length && !filters.types.includes(s.type)) return false;
      return true;
    });
  }, [asyncState.data, filters]);

  const toggleArrayFilter = (key: "brands" | "types", value: string) =>
    setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }));

  const handleSelect = (s: Storage) => {
    setComponent("storageId", s.id);
    toast.success(`${s.brand} ${s.model} seçildi`);
  };

  return { asyncState, filtered, filters, options, viewMode, setViewMode, setFilters, toggleArrayFilter, resetFilters: () => setFilters(DEFAULT_FILTERS), handleSelect, selectedId: state.storageId };
};
