import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MachineInput, machineInputSchema } from "@/schemas/machine.schema";
import { ChevronDown } from "lucide-react";

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

const locationOptions = [
  { value: "SCHOOL" as const, label: "School" },
  { value: "SHOPPING MALL" as const, label: "Shopping Mall" },
  { value: "HOSPITAL" as const, label: "Hospital" },
];

type LocationTypeDropdownProps = {
  value: MachineInput["locationType"];
  onChange: (value: MachineInput["locationType"]) => void;
  error?: string;
};

const LocationTypeDropdown = ({
  value,
  onChange,
  error,
}: LocationTypeDropdownProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selected = locationOptions.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-800">
        Location Type
      </label>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border-2 border-slate-200 bg-white px-4 py-2.5 text-left text-sm text-slate-900 shadow-sm transition-all duration-200 hover:border-slate-300 focus:border-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
        >
          <span>{selected?.label ?? "Select a location"}</span>
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`absolute left-0 right-0 z-20 mt-2 origin-top rounded-xl border border-slate-200 bg-white shadow-lg transition-all duration-200 ${
            open
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <ul className="py-1">
            {locationOptions.map((option) => {
              const isActive = option.value === value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-colors duration-150 ${
                      isActive
                        ? "bg-indigo-50 text-slate-600"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{option.label}</span>
                    {isActive ? (
                      <span className="h-2 w-2 rounded-full bg-slate-500" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-transparent" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {error ? (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600">
          <span className="inline-block h-1 w-1 rounded-full bg-rose-600" />
          {error}
        </p>
      ) : null}
    </div>
  );
};

export const MachineModal = ({
  open,
  onClose,
  onSubmit,
  initialValues,
}: MachineModalProps) => {
  const {
    register,
    control,
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
            <Controller
              name="locationType"
              control={control}
              render={({ field }) => (
                <LocationTypeDropdown
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.locationType?.message}
                />
              )}
            />
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
