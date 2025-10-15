import { useState } from "react";
import { MachineTable } from "@/components/machines/MachineTable";
import { MachineModal } from "@/components/machines/MachineModal";
import { MachinesProvider, useMachines } from "@/hooks/useMachines";
import type { MachineInput } from "@/schemas/machine.schema";

export default function Home() {
  return (
    <MachinesProvider>
      <HomeContent />
    </MachinesProvider>
  );
}

const HomeContent = () => {
  const { addMachine } = useMachines();
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (machine: MachineInput) => {
    addMachine(machine);
    setModalOpen(false);
  };

  return (
    <>
      <main className="bg-slate-100">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
          <header className="text-center lg:text-left">
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              TAO BIN Forecaster Dashboard
            </h1>
            <p className="mt-2 text-slate-600">TAO BIN Forecaster Dashboard</p>
          </header>
          <div className="grid flex-1 gap-6 lg:grid-cols-2">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                  Admin Panel
                </h2>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  + Add
                </button>
              </div>
              <div className="mt-6">
                <MachineTable />
              </div>
            </section>
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Forecast Dashboard
              </h2>
            </section>
          </div>
        </div>
      </main>
      <MachineModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};
