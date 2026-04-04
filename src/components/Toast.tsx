import React, { createContext, useContext, useState, useCallback } from "react";

type ToastType = "success" | "error" | "warning";

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  addToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ addToast: () => {} });

const ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
};

const COLORS: Record<ToastType, string> = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
};

const ICON_COLORS: Record<ToastType, string> = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-amber-600",
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-md text-sm font-medium pointer-events-auto ${COLORS[t.type]}`}
          >
            <span className={`font-bold ${ICON_COLORS[t.type]}`}>{ICONS[t.type]}</span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);

// Singleton helper — hook dışında kullanım için
let _addToast: ((type: ToastType, message: string) => void) | null = null;

// eslint-disable-next-line react-refresh/only-export-components
export const registerToast = (fn: (type: ToastType, message: string) => void) => {
  _addToast = fn;
};

// eslint-disable-next-line react-refresh/only-export-components
export const toast = {
  success: (msg: string) => _addToast?.("success", msg),
  error: (msg: string) => _addToast?.("error", msg),
  warning: (msg: string) => _addToast?.("warning", msg),
};
