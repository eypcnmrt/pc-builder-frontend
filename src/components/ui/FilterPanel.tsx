import React, { useState } from "react";

interface CheckboxGroupProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  onApply: () => void;
}

const CheckboxGroup = ({ label, options, selected, onChange, onApply }: CheckboxGroupProps) => {
  const [expanded, setExpanded] = useState(false);
  const INITIAL_SHOW = 3;
  const visible = expanded ? options : options.slice(0, INITIAL_SHOW);
  const hasMore = options.length > INITIAL_SHOW;

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        <button
          onClick={onApply}
          className="text-xs font-medium px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          Uygula
        </button>
      </div>
      <div className="space-y-1.5">
        {visible.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => onChange(opt)}
              className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 cursor-pointer"
            />
            <span className="text-sm text-slate-700 group-hover:text-slate-900 truncate">{opt}</span>
          </label>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {expanded ? "− Daha Az" : `+ Daha Fazla (${options.length - INITIAL_SHOW})`}
        </button>
      )}
    </div>
  );
};

interface RangeInputProps {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  onApply: () => void;
  unit?: string;
}

const RangeInput = ({ label, min, max, value, onChange, onApply, unit = "" }: RangeInputProps) => (
  <div className="mb-5">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-bold text-slate-800">{label}{unit ? ` (${unit})` : ""}</p>
      <button
        onClick={onApply}
        className="text-xs font-medium px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors"
      >
        Uygula
      </button>
    </div>
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={value[0]}
        min={min}
        max={value[1]}
        placeholder="Min Fiyat"
        onChange={(e) => onChange([e.target.value === "" ? min : Number(e.target.value), value[1]])}
        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <input
        type="number"
        value={value[1]}
        min={value[0]}
        max={max}
        placeholder="Max Fiyat"
        onChange={(e) => onChange([value[0], e.target.value === "" ? max : Number(e.target.value)])}
        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  </div>
);

export interface FilterPanelSection {
  type: "checkbox";
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
  onApply: () => void;
}

export interface FilterPanelRange {
  type: "range";
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  onApply: () => void;
  unit?: string;
}

type FilterSection = FilterPanelSection | FilterPanelRange;

interface FilterPanelProps {
  sections: FilterSection[];
  onReset: () => void;
}

const FilterPanel = ({ sections, onReset }: FilterPanelProps) => (
  <aside className="w-[28rem] flex-shrink-0">
    <div className="bg-white rounded-xl border border-slate-200 p-4 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-900">Filtreler</h2>
        <button
          onClick={onReset}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Sıfırla
        </button>
      </div>
      {sections.map((section, i) =>
        section.type === "checkbox" ? (
          <CheckboxGroup key={i} {...section} />
        ) : (
          <RangeInput key={i} {...section} />
        )
      )}
    </div>
  </aside>
);

export default FilterPanel;
