import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Machine } from "@/types/machine";
import { MachineFormInput, machineSchema } from "@/schemas/machine.schema";

type MachineModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (machine: Machine) => void;
};

export const MachineModal = ({
  open,
  onClose,
  onSubmit,
}: MachineModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MachineFormInput>({
    resolver: zodResolver(machineSchema),
    defaultValues: {
      id: "",
      name: "",
      locationType: "SCHOOL",
      expectedSalesPerDay: 0,
      averageProfitMarginPercentage: 0,
      rentCostPerDay: 0,
      electricCostPerTempPerDay: 0,
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  if (!open) {
    return null;
  }

  const handleFormSubmit = (data: MachineFormInput) => {
    onSubmit({
      id: data.id,
      name: data.name,
      locationType: data.locationType,
      expectedSalesPerDay: data.expectedSalesPerDay,
      averageProfitMarginPercentage: data.averageProfitMarginPercentage,
      rentCostPerDay: data.rentCostPerDay,
      electricCostPerTempPerDay: data.electricCostPerTempPerDay,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div
        className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              เพิ่มข้อมูลเครื่องขายสินค้า
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              ✕
            </button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* <div>
              <label className="block text-sm font-medium text-slate-700">
                ID
              </label>
              <input
                type="text"
                {...register("id")}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
              {errors.id ? (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.id.message}
                </p>
              ) : null}
            </div> */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
              {errors.name ? (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.name.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Location Type
              </label>
              <select
                {...register("locationType")}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              >
                <option value="SCHOOL">SCHOOL</option>
                <option value="SHOPPING MALL">SHOPPING MALL</option>
                <option value="HOSPITAL">HOSPITAL</option>
              </select>
              {errors.locationType ? (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.locationType.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                expected Sales Per Day (THB)
              </label>
              <input
                type="number"
                {...register("expectedSalesPerDay", { valueAsNumber: true })}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
              {errors.expectedSalesPerDay ? (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.expectedSalesPerDay.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                average Profit Margin Percentage (%)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("averageProfitMarginPercentage", {
                  valueAsNumber: true,
                })}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
              {errors.averageProfitMarginPercentage ? (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.averageProfitMarginPercentage.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Rent Cost Per Day (THB)
              </label>
              <input
                type="number"
                {...register("rentCostPerDay", { valueAsNumber: true })}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
              {errors.rentCostPerDay ? (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.rentCostPerDay.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Electric Cost Per Temp Per Day (THB)
              </label>
              <input
                type="number"
                {...register("electricCostPerTempPerDay", {
                  valueAsNumber: true,
                })}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
              {errors.electricCostPerTempPerDay ? (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.electricCostPerTempPerDay.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
