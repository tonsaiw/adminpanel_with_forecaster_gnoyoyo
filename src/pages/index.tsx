import { useEffect, useState } from "react";
import { MachineTable } from "@/components/machines/MachineTable";
import { MachineModal } from "@/components/machines/MachineModal";
import { MachineDeleteConfirmModal } from "@/components/machines/MachineDeleteConfirmModal";
import { BestLocationCard } from "@/components/dashboard/BestLocationCard";
import { useMachines } from "@/hooks/useMachines";
import type { Machine, MachineInput } from "@/schemas/machine.schema";
import { useForecastData } from "@/hooks/useForecastData";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { ForecastTable } from "@/components/dashboard/ForecastTable";
import { WeeklySummaryCard } from "@/components/dashboard/WeeklySummaryCard";
import { ToastContainer, toast } from "react-toastify";

const ForecastPanel = ({ machines }: { machines: Machine[] }) => {
  const { forecast, isLoading, isError } = useForecastData(machines);
  const daily = forecast?.daily ?? [];
  const weekly = forecast?.weekly ?? null;
  const loading = isLoading && !isError;

  return (
    <div className="space-y-4">
      <WeeklySummaryCard summary={weekly} isLoading={loading} />
      <ForecastChart data={daily} isLoading={isLoading} isError={isError} />
      <ForecastTable data={daily} />
    </div>
  );
};

export default function Home() {
  const { machines, addMachine, updateMachine, removeMachine } = useMachines();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Machine | null>(null);

  const closeActionMenus = () => {
    if (typeof window === "undefined") {
      return;
    }
    window.dispatchEvent(new Event("machine-table:close-menus"));
  };

  const handleSubmit = (machine: MachineInput) => {
    if (editingMachine) {
      updateMachine(editingMachine.id, machine);
      setEditingMachine(null);
      toast.success(`${editingMachine.id} updated successfully!`);
    } else {
      addMachine(machine);
      toast.success("Machine added successfully!");
    }
    setModalOpen(false);
  };

  const handleAddClick = () => {
    closeActionMenus();
    setEditingMachine(null);
    setModalOpen(true);
  };

  const handleEdit = (machine: Machine) => {
    closeActionMenus();
    setEditingMachine(machine);
    setModalOpen(true);
  };

  const handleDeleteRequest = (machine: Machine) => {
    closeActionMenus();
    setDeleteTarget(machine);
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      removeMachine(deleteTarget.id);
      setDeleteTarget(null);
      toast.success(`${deleteTarget.id} deleted successfully!`);
    }
  };

  return (
    <>
      <main className="font-sans bg-foreground min-h-screen">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
          <header className="text-center lg:text-left">
            <h1 className="text-3xl font-semibold text-primary-500 md:text-4xl">
              TAO BIN Forecaster Dashboard
            </h1>
            <p className="mt-2 text-secondary-500">
              TAO BIN Forecaster Dashboard
            </p>
          </header>
          <div className="relative grid flex-1 gap-6 lg:grid-cols-2">
            <section className="relative min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl font-semibold text-primary-500">
                  Admin Panel
                </h2>
                <button
                  type="button"
                  onClick={handleAddClick}
                  className="inline-flex items-center justify-center rounded-xl bg-secondary-400 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-secondary-500 active:scale-95 cursor-pointer hover:cursor-pointer"
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
            <section className="min-w-0 space-y-4">
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
