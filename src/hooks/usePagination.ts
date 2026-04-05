import { useState, useMemo, useEffect } from "react";

const PAGE_SIZE = 10;

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  total: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  from: number;
  to: number;
}

export function usePagination<T>(items: T[], resetDeps?: unknown[]): { paginated: T[]; pagination: PaginationState } {
  const [currentPage, setCurrentPage] = useState(1);

  // Filter/arama değiştiğinde sayfa 1'e sıfırla
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setCurrentPage(1); }, resetDeps ?? [items.length]);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const safePage = Math.min(currentPage, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, safePage]);

  const from = total === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const to = Math.min(safePage * PAGE_SIZE, total);

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(clamped);
  };

  return {
    paginated,
    pagination: {
      currentPage: safePage,
      pageSize: PAGE_SIZE,
      total,
      totalPages,
      goToPage,
      nextPage: () => goToPage(safePage + 1),
      prevPage: () => goToPage(safePage - 1),
      from,
      to,
    },
  };
}
