import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGpus } from "../service/gpu";
import { saveBuildState } from "../utils/buildState";
import type { GPU } from "../types/build";

export interface GpuFilters {
  search: string;
  brands: string[];
  memoryRange: [number, number];
  tdpRange: [number, number];
}

const defaultFilters = (items: GPU[]): GpuFilters => ({
  search: "",
  brands: [],
  memoryRange: [
    Math.min(...items.map((i) => i.memoryGb)),
    Math.max(...items.map((i) => i.memoryGb)),
  ],
  tdpRange: [
    Math.min(...items.map((i) => i.tdp)),
    Math.max(...items.map((i) => i.tdp)),
  ],
});

const useGpuSelect = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<GPU[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<GPU | null>(null);
  const [filters, setFilters] = useState<GpuFilters>({ search: "", brands: [], memoryRange: [0, Infinity] as [number, number], tdpRange: [0, Infinity] as [number, number] });

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchGpus(1, 100);
        const list = data?.items ?? [];
        if (list.length > 0) {
          setItems(list);
          setFilters(defaultFilters(list));
        }
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const options = useMemo(
    () => ({
      brands: [...new Set(items.map((i) => i.brand))].sort(),
      minMemory: items.length ? Math.min(...items.map((i) => i.memoryGb)) : 0,
      maxMemory: items.length ? Math.max(...items.map((i) => i.memoryGb)) : 32,
      minTdp: items.length ? Math.min(...items.map((i) => i.tdp)) : 0,
      maxTdp: items.length ? Math.max(...items.map((i) => i.tdp)) : 500,
    }),
    [items]
  );

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (
        filters.search &&
        !`${i.brand} ${i.model}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.brands.length && !filters.brands.includes(i.brand))
        return false;
      if (
        i.memoryGb < filters.memoryRange[0] ||
        i.memoryGb > filters.memoryRange[1]
      )
        return false;
      if (i.tdp < filters.tdpRange[0] || i.tdp > filters.tdpRange[1])
        return false;
      return true;
    });
  }, [items, filters]);

  const updateFilter = <K extends keyof GpuFilters>(
    key: K,
    value: GpuFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: "brands", value: string) => {
    setFilters((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilters(items));
  };

  const handleSelectById = (id: string) => {
    setSelected(items.find((i) => i.id === Number(id)) ?? null);
  };

  const handleConfirm = () => {
    if (!selected) return;
    saveBuildState({
      gpuId: selected.id,
      gpuTdp: selected.tdp,
      gpuLengthMm: selected.lengthMm,
    });
    navigate("/build/psu");
  };

  return {
    items,
    filtered,
    isLoading,
    selected,
    filters,
    options,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    handleSelectById,
    handleConfirm,
  };
};

export default useGpuSelect;
