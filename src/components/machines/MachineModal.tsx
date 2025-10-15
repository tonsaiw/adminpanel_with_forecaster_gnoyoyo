import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MachineInput, machineInputSchema } from "@/schemas/machine.schema";

const emptyMachineForm: MachineInput = {
  name: "",
  locationType: "SCHOOL",
  expectedSalesPerDay: 0,
  averageProfitMarginPercentage: 0,
  rentCostPerDay: 0,
  electricCostPerTempPerDay: 0,
};

type MachineModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (machine: MachineInput) => void;
  initialValues?: MachineInput;
};

export const MachineModal = ({
  open,
  onClose,
  onSubmit,
  initialValues,
}: MachineModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MachineInput>({
    resolver: zodResolver(machineInputSchema),
    defaultValues: emptyMachineForm,
  });

  useEffect(() => {
    if (!open) {
      reset(emptyMachineForm);
      return;
    }

    if (initialValues) {
      reset(initialValues);
    } else {
      reset(emptyMachineForm);
    }
  }, [initialValues, open, reset]);

  if (!open) {
    return null;
  }

  const handleFormSubmit = (data: MachineInput) => {
    onSubmit(data);
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
              {initialValues ? "Edit Machine" : "Add Machine"}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer hover:cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
              {errors.name ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                  <span className="inline-block h-1 w-1 rounded-full bg-rose-600"></span>
                  {errors.name.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                Location Type
              </label>
              <select
                {...register("locationType")}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-200 hover:border-slate-300 focus:border-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEgMS41TDYgNi41TDExIDEuNSIgc3Ryb2tlPSIjNjQ3NDhCIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-12"
              >
                <option value="SCHOOL">School</option>
                <option value="SHOPPING MALL">Shopping Mall</option>
                <option value="HOSPITAL">Hospital</option>
              </select>
              {errors.locationType ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                  <span className="inline-block h-1 w-1 rounded-full bg-rose-600" />
                  {errors.locationType.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                expected Sales Per Day (THB)
              </label>
              <input
                type="number"
                {...register("expectedSalesPerDay", { valueAsNumber: true })}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
              {errors.expectedSalesPerDay ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                  <span className="inline-block h-1 w-1 rounded-full bg-rose-600" />
                  {errors.expectedSalesPerDay.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                average Profit Margin Percentage (%)
              </label>
              <input
                type="number"
                step="0.01"
                {...register("averageProfitMarginPercentage", {
                  valueAsNumber: true,
                })}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
              {errors.averageProfitMarginPercentage ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                  <span className="inline-block h-1 w-1 rounded-full bg-rose-600" />
                  {errors.averageProfitMarginPercentage.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                Rent Cost Per Day (THB)
              </label>
              <input
                type="number"
                {...register("rentCostPerDay", { valueAsNumber: true })}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
              {errors.rentCostPerDay ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                  <span className="inline-block h-1 w-1 rounded-full bg-rose-600" />
                  {errors.rentCostPerDay.message}
                </p>
              ) : null}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                Electric Cost Per Temp Per Day
              </label>
              <input
                type="number"
                {...register("electricCostPerTempPerDay", {
                  valueAsNumber: true,
                })}
                className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
              {errors.electricCostPerTempPerDay ? (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                  <span className="inline-block h-1 w-1 rounded-full bg-rose-600" />
                  {errors.electricCostPerTempPerDay.message}
                </p>
              ) : null}
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 active:scale-95 cursor-pointer hover:cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
