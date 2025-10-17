import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

type MachineDeleteConfirmModalProps = {
  open: boolean;
  machineId: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const MachineDeleteConfirmModal = ({
  open,
  machineId,
  onCancel,
  onConfirm,
}: MachineDeleteConfirmModalProps) => {
  useBodyScrollLock(open);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Confirm Delete
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer hover:cursor-pointer"
          >
            ✕
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Are you sure you want to delete match {machineId}?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-xl border-2 border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100 active:scale-95 cursor-pointer hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95 cursor-pointer hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
