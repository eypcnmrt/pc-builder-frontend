import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDashboard } from "../../hooks/useDashboard";
import BuildSlot from "../../components/ui/BuildSlot";
import SummaryPanel from "../../components/ui/SummaryPanel";
import type { Build } from "../../types/build";

const SLOTS: Array<{
  key: keyof Pick<Build, "processor" | "motherboard" | "ram" | "storage" | "gpu" | "psu" | "cooler" | "pcCase">;
  label: string;
  icon: string;
}> = [
  { key: "processor",   label: "İşlemci",     icon: "🔲" },
  { key: "motherboard", label: "Anakart",      icon: "🖥️" },
  { key: "ram",         label: "RAM",          icon: "📊" },
  { key: "storage",     label: "Depolama",     icon: "💾" },
  { key: "gpu",         label: "Ekran Kartı",  icon: "🎮" },
  { key: "psu",         label: "Güç Kaynağı",  icon: "⚡" },
  { key: "cooler",      label: "Soğutucu",     icon: "❄️" },
  { key: "pcCase",      label: "Kasa",         icon: "🗂️" },
];

const Dashboard = () => {
  const { buildState, activities } = useDashboard();

  if (buildState.loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (buildState.error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-slate-600">{buildState.error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          Yenile
        </button>
      </div>
    );
  }

  const build = buildState.data!;
  const filledCount = SLOTS.filter((s) => !!build[s.key]).length;

  return (
    <>
      <Helmet>
        <title>Build'im | PC Builder</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Build'im</h1>
          <p className="text-sm text-slate-500 mt-1">
            {filledCount}/8 bileşen seçildi
          </p>
        </div>
        <Link
          to="/build"
          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Yapılandır
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Tamamlanma</span>
          <span>%{Math.round((filledCount / 8) * 100)}</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all"
            style={{ width: `${(filledCount / 8) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <section className="flex-1">
          <div className="grid sm:grid-cols-2 gap-3">
            {SLOTS.map((slot) => {
              const component = build[slot.key] as { brand?: string; model?: string; imageUrl?: string; price?: number } | undefined;
              return (
                <BuildSlot
                  key={slot.key}
                  label={slot.label}
                  icon={slot.icon}
                  brand={component?.brand}
                  model={component?.model}
                  imageUrl={component?.imageUrl}
                  price={component?.price}
                  warning={false}
                />
              );
            })}
          </div>
        </section>

        <SummaryPanel
          totalPrice={build.totalPrice ?? 0}
          estimatedWatts={build.estimatedWatts ?? 0}
          budget={build.budget}
          warnings={build.warnings}
          activities={activities}
        />
      </div>
    </>
  );
};

export default Dashboard;
