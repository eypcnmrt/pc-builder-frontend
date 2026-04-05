import React from "react";
import type { PaginationState } from "../../hooks/usePagination";

interface PaginationProps {
  pagination: PaginationState;
  label: string;
}

const Pagination = ({ pagination, label }: PaginationProps) => {
  const { currentPage, totalPages, total, from, to, goToPage, nextPage, prevPage } = pagination;

  if (total === 0) return null;

  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-slate-200">
      <span className="text-sm text-slate-500 order-2 sm:order-1">
        <strong className="text-slate-900">{from}-{to}</strong> / <strong className="text-slate-900">{total}</strong> {label}
      </span>

      <div className="flex items-center gap-1 order-1 sm:order-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Önceki sayfa"
        >
          Geri
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 py-1.5 text-xs text-slate-400 select-none">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`min-w-[32px] px-2 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  page === currentPage
                    ? "bg-blue-600 text-white border border-blue-600"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
                aria-label={`Sayfa ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Sonraki sayfa"
        >
          İleri
        </button>
      </div>
    </div>
  );
};

export default Pagination;
