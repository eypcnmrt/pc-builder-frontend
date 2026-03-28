import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRams } from "../service/ram";
import { getBuildState, saveBuildState } from "../utils/buildState";
import type { RAM } from "../types/build";

export interface RamFilters {
  search: string;
  brands: string[];
  types: string[];
  capacityRange: [number, number];
  speedRange: [number, number];
}

const defaultFilters = (items: RAM[]): RamFilters => ({
  search: "",
  brands: [],
  types: [],
  capacityRange: [
    Math.min(...items.map((i) => i.capacityGb)),
    Math.max(...items.map((i) => i.capacityGb)),
  ],
  speedRange: [
    Math.min(...items.map((i) => i.speedMhz)),
    Math.max(...items.map((i) => i.speedMhz)),
  ],
});

const useRamSelect = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<RAM[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<RAM | null>(null);
  const [filters, setFilters] = useState<RamFilters>({ search: "", brands: [], types: [], capacityRange: [0, Infinity] as [number, number], speedRange: [0, Infinity] as [number, number] });

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const { motherboardRamType } = getBuildState();
        const odataFilter = motherboardRamType
          ? `type eq '${motherboardRamType}'`
          : undefined;
        const data = await fetchRams(1, 100, odataFilter);
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
      minCapacity: items.length ? Math.min(...items.map((i) => i.capacityGb)) : 0,
      maxCapacity: items.length ? Math.max(...items.map((i) => i.capacityGb)) : 128,
      minSpeed: items.length ? Math.min(...items.map((i) => i.speedMhz)) : 0,
      maxSpeed: items.length ? Math.max(...items.map((i) => i.speedMhz)) : 8000,
    }),
    [items]
  );

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (
        filters.search &&
        !`${i.brand} ${i.model} ${i.type}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.brands.length && !filters.brands.includes(i.brand))
        return false;
      if (filters.types.length && !filters.types.includes(i.type))
        return false;
      if (
        i.capacityGb < filters.capacityRange[0] ||
        i.capacityGb > filters.capacityRange[1]
      )
        return false;
      if (
        i.speedMhz < filters.speedRange[0] ||
        i.speedMhz > filters.speedRange[1]
      )
        return false;
      return true;
    });
  }, [items, filters]);

  const updateFilter = <K extends keyof RamFilters>(
    key: K,
    value: RamFilters[K]
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
    saveBuildState({ ramId: selected.id });
    navigate("/build/storage");
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

export default useRamSelect;
