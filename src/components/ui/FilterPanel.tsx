import React from "react";

interface CheckboxGroupProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}

const CheckboxGroup = ({ label, options, selected, onChange }: CheckboxGroupProps) => (
  <div className="mb-4">
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
    <div className="space-y-1.5 max-h-40 overflow-y-auto">
      {options.map((opt) => (
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
  </div>
);

interface RangeInputProps {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  unit?: string;
}

const RangeInput = ({ label, min, max, value, onChange, unit = "" }: RangeInputProps) => (
  <div className="mb-4">
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={value[0]}
        min={min}
        max={value[1]}
        onChange={(e) => onChange([Number(e.target.value), value[1]])}
        className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-slate-400 text-xs flex-shrink-0">—</span>
      <input
        type="number"
        value={value[1]}
        min={value[0]}
        max={max}
        onChange={(e) => onChange([value[0], Number(e.target.value)])}
        className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    {unit && <p className="text-xs text-slate-400 mt-1">{unit}</p>}
  </div>
);

export interface FilterPanelSection {
  type: "checkbox";
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}

export interface FilterPanelRange {
  type: "range";
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  unit?: string;
}

type FilterSection = FilterPanelSection | FilterPanelRange;

interface FilterPanelProps {
  sections: FilterSection[];
  onReset: () => void;
}

const FilterPanel = ({ sections, onReset }: FilterPanelProps) => (
  <aside className="w-56 flex-shrink-0">
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
