import React from "react";
import { useNavigate } from "react-router-dom";

interface BuildSlotProps {
  label: string;
  icon: string;
  brand?: string;
  model?: string;
  imageUrl?: string;
  price?: number;
  warning?: boolean;
}

const BuildSlot = ({ label, icon, brand, model, imageUrl, price, warning }: BuildSlotProps) => {
  const navigate = useNavigate();
  const isFilled = !!model;

  return (
    <div
      onClick={() => navigate("/build")}
      className={`group cursor-pointer rounded-xl border p-4 flex items-center gap-3 transition-all hover:shadow-sm ${
        isFilled
          ? warning
            ? "border-amber-300 bg-amber-50"
            : "border-slate-200 bg-white hover:border-blue-300"
          : "border-dashed border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50"
      }`}
    >
      {isFilled && imageUrl ? (
        <img
          src={imageUrl}
          alt={`${brand} ${model}`}
          className="w-10 h-10 object-contain flex-shrink-0"
          loading="lazy"
          width={40}
          height={40}
        />
      ) : (
        <span className="text-2xl flex-shrink-0">{icon}</span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        {isFilled ? (
          <p className="text-sm font-semibold text-slate-900 truncate">
            {brand} {model}
          </p>
        ) : (
          <p className="text-sm text-slate-400 group-hover:text-blue-600 transition-colors">
            + Ekle
          </p>
        )}
      </div>
      {isFilled && price && (
        <span className="text-xs font-semibold text-slate-700 flex-shrink-0">
          ₺{price.toLocaleString("tr-TR")}
        </span>
      )}
      {warning && (
        <span className="text-amber-500 text-xs flex-shrink-0" title="Uyumluluk uyarısı">⚠</span>
      )}
    </div>
  );
};

export default BuildSlot;
