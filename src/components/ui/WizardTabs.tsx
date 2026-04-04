import React from "react";

export type WizardTab =
  | "processor"
  | "motherboard"
  | "ram"
  | "storage"
  | "gpu"
  | "psu"
  | "cooler"
  | "case";

const TAB_LABELS: Record<WizardTab, string> = {
  processor: "İşlemci",
  motherboard: "Anakart",
  ram: "RAM",
  storage: "Depolama",
  gpu: "Ekran Kartı",
  psu: "Güç Kaynağı",
  cooler: "Soğutucu",
  case: "Kasa",
};

// eslint-disable-next-line react-refresh/only-export-components
export const TAB_ORDER: WizardTab[] = [
  "processor",
  "motherboard",
  "ram",
  "storage",
  "gpu",
  "psu",
  "cooler",
  "case",
];

interface WizardTabsProps {
  active: WizardTab;
  completed: WizardTab[];
  onChange: (tab: WizardTab) => void;
}

const WizardTabs = ({ active, completed, onChange }: WizardTabsProps) => (
  <div className="flex overflow-x-auto gap-1 pb-1 border-b border-slate-200 mb-6">
    {TAB_ORDER.map((tab, i) => {
      const isDone = completed.includes(tab);
      const isActive = active === tab;
      return (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
            isActive
              ? "border-blue-600 text-blue-700 bg-blue-50"
              : isDone
              ? "border-green-500 text-green-700 bg-green-50 hover:bg-green-100"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
          }`}
        >
          <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
            isActive ? "bg-blue-600 text-white" : isDone ? "bg-green-500 text-white" : "bg-slate-200 text-slate-600"
          }`}>
            {isDone ? "✓" : i + 1}
          </span>
          {TAB_LABELS[tab]}
        </button>
      );
    })}
  </div>
);

export default WizardTabs;
