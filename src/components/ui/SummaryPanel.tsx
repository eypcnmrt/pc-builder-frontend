import React from "react";
import type { BuildActivity } from "../../types/build";

interface SummaryPanelProps {
  totalPrice: number;
  estimatedWatts: number;
  budget?: number;
  warnings?: string[];
  activities: BuildActivity[];
}

const SummaryPanel = ({ totalPrice, estimatedWatts, budget, warnings, activities }: SummaryPanelProps) => {
  const budgetPercent = budget && budget > 0 ? Math.min(Math.round((totalPrice / budget) * 100), 100) : null;

  return (
    <aside className="w-72 flex-shrink-0">
      <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-24 space-y-5">
        <section>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Bütçe</h2>
          <p className="text-2xl font-bold text-slate-900">
            ₺{totalPrice.toLocaleString("tr-TR")}
          </p>
          {budgetPercent !== null && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Bütçe kullanımı</span>
                <span>%{budgetPercent}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${budgetPercent > 90 ? "bg-red-500" : budgetPercent > 70 ? "bg-amber-500" : "bg-green-500"}`}
                  style={{ width: `${budgetPercent}%` }}
                />
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Güç Tüketimi</h2>
          <p className="text-lg font-semibold text-slate-900">
            {estimatedWatts} <span className="text-sm font-normal text-slate-500">W</span>
          </p>
        </section>

        {warnings && warnings.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">
              ⚠ Uyarılar ({warnings.length})
            </h2>
            <ul className="space-y-1.5">
              {warnings.map((w, i) => (
                <li key={i} className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                  {w}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Son İşlemler</h2>
          {activities.length === 0 ? (
            <p className="text-xs text-slate-400">Henüz işlem yok.</p>
          ) : (
            <ul className="space-y-1.5 max-h-48 overflow-y-auto">
              {activities.slice(0, 10).map((a) => (
                <li key={a.id} className="text-xs text-slate-600 flex gap-2">
                  <span className="text-slate-400 flex-shrink-0">
                    {new Date(a.timestamp).toLocaleDateString("tr-TR")}
                  </span>
                  <span className="truncate">{a.detail}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </aside>
  );
};

export default SummaryPanel;
