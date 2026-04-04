import React, { useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { BuildProvider, useBuildContext } from "../../context/BuildContext";
import WizardTabs, { type WizardTab, TAB_ORDER } from "../../components/ui/WizardTabs";

const ProcessorTab = lazy(() => import("./tabs/ProcessorTab"));
const MotherboardTab = lazy(() => import("./tabs/MotherboardTab"));
const RamTab = lazy(() => import("./tabs/RamTab"));
const StorageTab = lazy(() => import("./tabs/StorageTab"));
const GpuTab = lazy(() => import("./tabs/GpuTab"));
const PsuTab = lazy(() => import("./tabs/PsuTab"));
const CoolerTab = lazy(() => import("./tabs/CoolerTab"));
const CaseTab = lazy(() => import("./tabs/CaseTab"));

const TabLoader = () => (
  <div className="flex items-center justify-center h-64">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

const TAB_COMPONENTS: Record<WizardTab, React.ComponentType> = {
  processor: ProcessorTab,
  motherboard: MotherboardTab,
  ram: RamTab,
  storage: StorageTab,
  gpu: GpuTab,
  psu: PsuTab,
  cooler: CoolerTab,
  case: CaseTab,
};

const TAB_STATE_KEYS: Record<WizardTab, string> = {
  processor: "processorId",
  motherboard: "motherboardId",
  ram: "ramId",
  storage: "storageId",
  gpu: "gpuId",
  psu: "psuId",
  cooler: "coolerId",
  case: "pcCaseId",
};

const WizardContent = () => {
  const [activeTab, setActiveTab] = useState<WizardTab>("processor");
  const { state } = useBuildContext();

  const completed = TAB_ORDER.filter(
    (tab) => !!state[TAB_STATE_KEYS[tab] as keyof typeof state]
  );

  const ActiveComponent = TAB_COMPONENTS[activeTab];

  const goNext = () => {
    const idx = TAB_ORDER.indexOf(activeTab);
    if (idx < TAB_ORDER.length - 1) setActiveTab(TAB_ORDER[idx + 1]);
  };

  const goPrev = () => {
    const idx = TAB_ORDER.indexOf(activeTab);
    if (idx > 0) setActiveTab(TAB_ORDER[idx - 1]);
  };

  return (
    <>
      <Helmet>
        <title>Bileşen Seç | PC Builder</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Yapılandırma Sihirbazı</h1>
        <WizardTabs active={activeTab} completed={completed} onChange={setActiveTab} />

        <Suspense fallback={<TabLoader />}>
          <ActiveComponent />
        </Suspense>

        <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={goPrev}
            disabled={activeTab === TAB_ORDER[0]}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Önceki
          </button>
          <button
            onClick={goNext}
            disabled={activeTab === TAB_ORDER[TAB_ORDER.length - 1]}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Sonraki →
          </button>
        </div>
      </div>
    </>
  );
};

const BuildWizard = () => (
  <BuildProvider>
    <WizardContent />
  </BuildProvider>
);

export default BuildWizard;
