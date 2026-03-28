import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCoolers } from "../service/cooler";
import { getBuildState, saveBuildState } from "../utils/buildState";
import type { Cooler } from "../types/build";

export interface CoolerFilters {
  search: string;
  brands: string[];
  types: string[];
  tdpRange: [number, number];
}

const defaultFilters = (items: Cooler[]): CoolerFilters => ({
  search: "",
  brands: [],
  types: [],
  tdpRange: [
    Math.min(...items.map((i) => i.tdpW)),
    Math.max(...items.map((i) => i.tdpW)),
  ],
});

const useCoolerSelect = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Cooler[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Cooler | null>(null);
  const [filters, setFilters] = useState<CoolerFilters>({ search: "", brands: [], types: [], tdpRange: [0, Infinity] as [number, number] });
  const [processorSocket, setProcessorSocket] = useState<string | undefined>();

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const state = getBuildState();
        setProcessorSocket(state.processorSocket);
        const data = await fetchCoolers(1, 100);
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
      types: [...new Set(items.map((i) => i.type))].sort(),
      minTdp: items.length ? Math.min(...items.map((i) => i.tdpW)) : 0,
      maxTdp: items.length ? Math.max(...items.map((i) => i.tdpW)) : 500,
    }),
    [items]
  );

  // Sort: compatible socket first, then rest
  const filtered = useMemo(() => {
    const base = items.filter((i) => {
      if (
        filters.search &&
        !`${i.brand} ${i.model} ${i.type} ${i.compatibleSockets}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.brands.length && !filters.brands.includes(i.brand))
        return false;
      if (filters.types.length && !filters.types.includes(i.type))
        return false;
      if (i.tdpW < filters.tdpRange[0] || i.tdpW > filters.tdpRange[1])
        return false;
      return true;
    });

    if (!processorSocket) return base;

    return [...base].sort((a, b) => {
      const aCompat = a.compatibleSockets
        .toLowerCase()
        .includes(processorSocket.toLowerCase());
      const bCompat = b.compatibleSockets
        .toLowerCase()
        .includes(processorSocket.toLowerCase());
      if (aCompat && !bCompat) return -1;
      if (!aCompat && bCompat) return 1;
      return 0;
    });
  }, [items, filters, processorSocket]);

  const isCompatible = (cooler: Cooler): boolean => {
    if (!processorSocket) return false;
    return cooler.compatibleSockets
      .toLowerCase()
      .includes(processorSocket.toLowerCase());
  };

  const updateFilter = <K extends keyof CoolerFilters>(
    key: K,
    value: CoolerFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: "brands" | "types", value: string) => {
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
      coolerId: selected.id,
      coolerHeightMm: selected.heightMm,
    });
    navigate("/build/case");
  };

  return {
    items,
    filtered,
    isLoading,
    selected,
    filters,
    options,
    processorSocket,
    isCompatible,
    updateFilter,
    toggleArrayFilter,
    resetFilters,
    handleSelectById,
    handleConfirm,
  };
};

export default useCoolerSelect;
