import { useState } from "react";
import { MachineTable } from "@/components/machines/MachineTable";
import { MachineModal } from "@/components/machines/MachineModal";
import { MachineDeleteConfirmModal } from "@/components/machines/MachineDeleteConfirmModal";
import { BestLocationCard } from "@/components/dashboard/BestLocationCard";
import { useMachines } from "@/hooks/useMachines";
import type { Machine, MachineInput } from "@/schemas/machine.schema";
import { useForecastData } from "@/hooks/useForecastData";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { WeeklySummaryCard } from "@/components/dashboard/WeeklySummaryCard";

const ForecastPanel = ({ machines }: { machines: Machine[] }) => {
  const { forecast, isLoading, isError } = useForecastData(machines);
  const daily = forecast?.daily ?? [];
  const weekly = forecast?.weekly ?? null;
  const loading = isLoading && !isError;

  return (
    <div className="space-y-4">
      <ForecastChart data={daily} isLoading={isLoading} isError={isError} />
      <WeeklySummaryCard summary={weekly} isLoading={loading} />
    </div>
  );
};

export default function Home() {
  const { machines, addMachine, updateMachine, removeMachine } = useMachines();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Machine | null>(null);

  const handleSubmit = (machine: MachineInput) => {
    if (editingMachine) {
      updateMachine(editingMachine.id, machine);
      setEditingMachine(null);
    } else {
      addMachine(machine);
    }
    setModalOpen(false);
  };

  const handleAddClick = () => {
    setEditingMachine(null);
    setModalOpen(true);
  };

  const handleEdit = (machine: Machine) => {
    setEditingMachine(machine);
    setModalOpen(true);
  };

  const handleDeleteRequest = (machine: Machine) => {
    setDeleteTarget(machine);
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      removeMachine(deleteTarget.id);
      setDeleteTarget(null);
    }
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
          <div className="relative grid flex-1 gap-6 lg:grid-cols-2">
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                  Admin Panel
                </h2>
                <button
                  type="button"
                  onClick={handleAddClick}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-700 active:scale-95 cursor-pointer hover:cursor-pointer"
                >
                  + Add
                </button>
              </div>
              <div className="mt-6">
                <MachineTable
                  onEdit={handleEdit}
                  onDelete={handleDeleteRequest}
                />
              </div>
            </section>
            <section className="space-y-4">
              <BestLocationCard />
              <ForecastPanel machines={machines} />
            </section>
          </div>
        </div>
      </main>
      <MachineModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editingMachine ?? undefined}
      />
      <MachineDeleteConfirmModal
        open={Boolean(deleteTarget)}
        machineId={deleteTarget?.id ?? ""}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
