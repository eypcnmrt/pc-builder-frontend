import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStorages } from "../service/storage";
import { saveBuildState } from "../utils/buildState";
import type { Storage } from "../types/build";

export interface StorageFilters {
  search: string;
  brands: string[];
  types: string[];
  interfaces: string[];
  capacityRange: [number, number];
}

const defaultFilters = (items: Storage[]): StorageFilters => ({
  search: "",
  brands: [],
  types: [],
  interfaces: [],
  capacityRange: [
    Math.min(...items.map((i) => i.capacityGb)),
    Math.max(...items.map((i) => i.capacityGb)),
  ],
});

const useStorageSelect = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Storage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Storage | null>(null);
  const [filters, setFilters] = useState<StorageFilters | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchStorages(1, 100);
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
      interfaces: [...new Set(items.map((i) => i.interface))].sort(),
      minCapacity: items.length ? Math.min(...items.map((i) => i.capacityGb)) : 0,
      maxCapacity: items.length ? Math.max(...items.map((i) => i.capacityGb)) : 8000,
    }),
    [items]
  );

  const filtered = useMemo(() => {
    if (!filters) return items;
    return items.filter((i) => {
      if (
        filters.search &&
        !`${i.brand} ${i.model} ${i.type} ${i.interface}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.brands.length && !filters.brands.includes(i.brand))
        return false;
      if (filters.types.length && !filters.types.includes(i.type))
        return false;
      if (filters.interfaces.length && !filters.interfaces.includes(i.interface))
        return false;
      if (
        i.capacityGb < filters.capacityRange[0] ||
        i.capacityGb > filters.capacityRange[1]
      )
        return false;
      return true;
    });
  }, [items, filters]);

  const updateFilter = <K extends keyof StorageFilters>(
    key: K,
    value: StorageFilters[K]
  ) => {
    setFilters((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const toggleArrayFilter = (
    key: "brands" | "types" | "interfaces",
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
    saveBuildState({ storageId: selected.id });
    navigate("/build/gpu");
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

export default useStorageSelect;
