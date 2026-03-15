import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPsus } from "../service/psu";
import { getBuildState, saveBuildState } from "../utils/buildState";
import type { PSU } from "../types/build";

export interface PsuFilters {
  search: string;
  brands: string[];
  efficiencyRatings: string[];
  modularTypes: string[];
  wattageRange: [number, number];
}

const defaultFilters = (items: PSU[]): PsuFilters => ({
  search: "",
  brands: [],
  efficiencyRatings: [],
  modularTypes: [],
  wattageRange: [
    Math.min(...items.map((i) => i.wattage)),
    Math.max(...items.map((i) => i.wattage)),
  ],
});

const calcMinWattage = (processorTdp?: number, gpuTdp?: number): number => {
  const totalTdp = (processorTdp ?? 65) + (gpuTdp ?? 0);
  if (gpuTdp) {
    return Math.ceil((totalTdp * 1.5) / 50) * 50;
  }
  return Math.ceil((processorTdp ?? 65) * 2 / 50) * 50;
};

const usePsuSelect = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<PSU[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<PSU | null>(null);
  const [filters, setFilters] = useState<PsuFilters | null>(null);
  const [minWattage, setMinWattage] = useState(0);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const { processorTdp, gpuTdp } = getBuildState();
        const minW = calcMinWattage(processorTdp, gpuTdp);
        setMinWattage(minW);
        const odataFilter = minW > 0 ? `wattage ge ${minW}` : undefined;
        const data = await fetchPsus(1, 100, odataFilter);
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
      efficiencyRatings: [...new Set(items.map((i) => i.efficiencyRating))].sort(),
      modularTypes: [...new Set(items.map((i) => i.modular))].sort(),
      minWattage: items.length ? Math.min(...items.map((i) => i.wattage)) : 0,
      maxWattage: items.length ? Math.max(...items.map((i) => i.wattage)) : 2000,
    }),
    [items]
  );

  const filtered = useMemo(() => {
    if (!filters) return items;
    return items.filter((i) => {
      if (
        filters.search &&
        !`${i.brand} ${i.model} ${i.efficiencyRating} ${i.modular}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.brands.length && !filters.brands.includes(i.brand))
        return false;
      if (
        filters.efficiencyRatings.length &&
        !filters.efficiencyRatings.includes(i.efficiencyRating)
      )
        return false;
      if (
        filters.modularTypes.length &&
        !filters.modularTypes.includes(i.modular)
      )
        return false;
      if (
        i.wattage < filters.wattageRange[0] ||
        i.wattage > filters.wattageRange[1]
      )
        return false;
      return true;
    });
  }, [items, filters]);

  const updateFilter = <K extends keyof PsuFilters>(
    key: K,
    value: PsuFilters[K]
  ) => {
    setFilters((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const toggleArrayFilter = (
    key: "brands" | "efficiencyRatings" | "modularTypes",
    value: string
  ) => {
    setFilters((prev) => {
      if (!prev) return prev;
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
    if (items.length > 0) setFilters(defaultFilters(items));
  };

  const handleSelectById = (id: string) => {
    setSelected(items.find((i) => i.id === Number(id)) ?? null);
  };

  const handleConfirm = () => {
    if (!selected) return;
    saveBuildState({ psuId: selected.id });
    navigate("/build/cooler");
  };

  return {
    items,
    filtered,
    isLoading,
    selected,
    filters,
    options,
    minWattage,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    handleSelectById,
    handleConfirm,
  };
};

export default usePsuSelect;
