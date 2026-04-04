import React from "react";

interface Spec {
  label: string;
  value: string | number;
}

interface ComponentCardProps {
  id: number;
  brand: string;
  model: string;
  imageUrl?: string;
  price?: number;
  specs: Spec[];
  isSelected: boolean;
  mode: "list" | "grid";
  onSelect: () => void;
}

const ComponentCard = ({
  brand,
  model,
  imageUrl,
  price,
  specs,
  isSelected,
  mode,
  onSelect,
}: ComponentCardProps) => {
  const formattedPrice = price
    ? `₺${price.toLocaleString("tr-TR")}`
    : "Fiyat yok";

  if (mode === "grid") {
    return (
      <article
        onClick={onSelect}
        className={`cursor-pointer rounded-xl border p-4 flex flex-col gap-3 transition-all hover:shadow-md ${
          isSelected
            ? "border-blue-500 bg-blue-50 shadow-md"
            : "border-slate-200 bg-white hover:border-slate-300"
        }`}
      >
        <figure className="w-full aspect-square flex items-center justify-center bg-slate-100 rounded-lg overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${brand} ${model}`}
              className="w-full h-full object-contain p-2"
              loading="lazy"
              width={200}
              height={200}
            />
          ) : (
            <span className="text-slate-300 text-4xl">📦</span>
          )}
        </figure>
        <div>
          <p className="text-xs text-slate-500 font-medium">{brand}</p>
          <p className="text-sm font-semibold text-slate-900 leading-tight">{model}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {specs.slice(0, 3).map((s) => (
            <span key={s.label} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              {s.value}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-bold text-slate-900">{formattedPrice}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(); }}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              isSelected
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white"
            }`}
          >
            {isSelected ? "Seçildi ✓" : "Seç"}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={onSelect}
      className={`cursor-pointer rounded-xl border p-4 flex items-center gap-4 transition-all hover:shadow-sm ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <figure className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-slate-100 rounded-lg overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${brand} ${model}`}
            className="w-full h-full object-contain p-1"
            loading="lazy"
            width={64}
            height={64}
          />
        ) : (
          <span className="text-slate-300 text-2xl">📦</span>
        )}
      </figure>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 font-medium">{brand}</p>
        <p className="text-sm font-semibold text-slate-900 truncate">{model}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
          {specs.map((s) => (
            <span key={s.label} className="text-xs text-slate-500">
              {s.label}: <span className="text-slate-700">{s.value}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-sm font-bold text-slate-900 hidden sm:block">{formattedPrice}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
            isSelected
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white"
          }`}
        >
          {isSelected ? "Seçildi ✓" : "Seç"}
        </button>
      </div>
    </article>
  );
};

export default ComponentCard;
