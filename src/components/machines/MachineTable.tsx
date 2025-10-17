import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Machine } from "@/types/machine";
import { useMachines } from "@/hooks/useMachines";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

type ActionCellProps = {
  machine: Machine;
  onEdit: (machine: Machine) => void;
  onDelete: (machine: Machine) => void;
};

const MENU_WIDTH_PX = 144;
const MENU_OFFSET_Y = 8;

const ActionCell = ({ machine, onEdit, onDelete }: ActionCellProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const menuContentRef = useRef<HTMLDivElement | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const updateMenuPosition = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const minLeft = 16;
    const maxLeft = Math.max(minLeft, viewportWidth - MENU_WIDTH_PX - 16);
    const desiredLeft = rect.right - MENU_WIDTH_PX;

    setMenuPosition({
      top: rect.bottom + MENU_OFFSET_Y,
      left: Math.min(maxLeft, Math.max(minLeft, desiredLeft)),
    });
  }, []);

  useEffect(() => {
    if (!open) {
      setMenuPosition(null);
      return;
    }

    updateMenuPosition();

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (
        (anchorRef.current && anchorRef.current.contains(target)) ||
        (menuContentRef.current && menuContentRef.current.contains(target))
      ) {
        return;
      }
      setOpen(false);
    };

    const handleResize = () => {
      updateMenuPosition();
    };

    const handleScroll = () => {
      updateMenuPosition();
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open, updateMenuPosition]);

  useBodyScrollLock(open);

  const handleEdit = () => {
    setOpen(false);
    onEdit(machine);
  };

  const handleDelete = () => {
    setOpen(false);
    onDelete(machine);
  };

  return (
    <div ref={anchorRef} className="flex min-w-[64px] justify-end">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 cursor-pointer hover:cursor-pointer"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="sr-only">Open actions</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>
      {open && menuPosition
        ? createPortal(
            <div
              ref={menuContentRef}
              className="fixed z-[60] w-36 overflow-hidden rounded-xl border-2 border-slate-200 bg-white shadow-lg"
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
              }}
            >
              <button
                type="button"
                onClick={handleEdit}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 cursor-pointer hover:cursor-pointer"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-700 cursor-pointer hover:cursor-pointer"
              >
                Delete
              </button>
            </div>,
            document.body
          )
        : null}
    </div>
  );
};

type MachineTableProps = {
  onEdit: (machine: Machine) => void;
  onDelete: (machine: Machine) => void;
};

export const MachineTable = ({ onEdit, onDelete }: MachineTableProps) => {
  const { machines, isHydrated } = useMachines();
  const [highlightedRowId, setHighlightedRowId] = useState<string | null>(null);
  const highlightTimeoutRef = useRef<number | null>(null);
  const previousMachineIdsRef = useRef<Set<string>>(new Set());
  const isInitializedRef = useRef(false);

  const columns = useMemo<ColumnDef<Machine>[]>(() => {
    return [
      {
        header: "ID",
        accessorKey: "id",
        size: 120,
        cell: (info) => info.getValue<string>(),
      },
      {
        header: "Name",
        accessorKey: "name",
        size: 200,
        cell: (info) => info.getValue<string>(),
      },
      {
        header: "Location Type",
        accessorKey: "locationType",
        size: 160,
        cell: (info) => info.getValue<string>(),
      },
      {
        header: "Expected Sales",
        accessorKey: "expectedSalesPerDay",
        size: 170,
        cell: (info) => {
          const value = info.getValue<number>();
          return (
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-medium text-slate-400">฿</span>
              <span className="font-semibold text-slate-800">
                {value.toLocaleString()}
              </span>
            </div>
          );
        },
      },
      {
        header: "Avg Profit Margin",
        accessorKey: "averageProfitMarginPercentage",
        size: 170,
        cell: (info) => {
          const percent = (info.getValue<number>() * 100).toFixed(0);
          return (
            <span className="font-semibold text-emerald-600">{percent}%</span>
          );
        },
      },
      {
        header: "rentCostPerDay (Baht)",
        accessorKey: "rentCostPerDay",
        size: 180,
        cell: (info) => {
          const value = info.getValue<number>();
          return (
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-medium text-slate-400">฿</span>
              <span className="font-semibold text-slate-800">
                {value.toLocaleString()}
              </span>
            </div>
          );
        },
      },
      {
        header: "electric Cost (Baht per °C)",
        accessorKey: "electricCostPerTempPerDay",
        size: 220,
        cell: (info) => info.getValue<number>(),
      },
      {
        id: "actions",
        header: "Actions",
        size: 120,
        cell: ({ row }) => (
          <ActionCell
            machine={row.original}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ];
  }, [onDelete, onEdit]);

  const table = useReactTable({
    data: machines,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const currentIds = new Set(machines.map((machine) => machine.id));

    if (!isInitializedRef.current) {
      previousMachineIdsRef.current = currentIds;
      isInitializedRef.current = true;
      return;
    }

    const newIds: string[] = [];

    machines.forEach((machine) => {
      if (!previousMachineIdsRef.current.has(machine.id)) {
        newIds.push(machine.id);
      }
    });

    if (newIds.length > 0) {
      const latestId = newIds[0];
      setHighlightedRowId(latestId);

      if (typeof window !== "undefined") {
        if (highlightTimeoutRef.current) {
          window.clearTimeout(highlightTimeoutRef.current);
        }

        highlightTimeoutRef.current = window.setTimeout(() => {
          setHighlightedRowId((current) =>
            current === latestId ? null : current
          );
          highlightTimeoutRef.current = null;
        }, 3000);
      }
    }

    previousMachineIdsRef.current = currentIds;
  }, [machines, isHydrated]);

  useEffect(() => {
    return () => {
      if (typeof window === "undefined") {
        return;
      }

      if (highlightTimeoutRef.current) {
        window.clearTimeout(highlightTimeoutRef.current);
        highlightTimeoutRef.current = null;
      }
    };
  }, []);

  if (machines.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-500">
        There is no information about the machine yet. Please add a new machine.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className=" w-full overflow-x-auto">
        <table className=" w-full min-w-[720px] divide-y divide-slate-200 lg:min-w-full">
          <thead className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 ${
                      header.column.id === "actions"
                        ? "sticky right-0 z-10 bg-slate-50 pl-6 pr-4 shadow-[inset_-8px_0_8px_-8px_rgba(15,23,42,0.12)]"
                        : "bg-slate-50"
                    }`}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50">
                {row.getVisibleCells().map((cell) => {
                  const isHighlighted = row.original.id === highlightedRowId;
                  const backgroundClass = isHighlighted
                    ? "new-row-highlight"
                    : "bg-white";
                  const baseClasses = `whitespace-nowrap px-4 py-3 text-sm text-slate-700 ${backgroundClass}`;
                  const cellSpecificClasses =
                    cell.column.id === "actions"
                      ? "sticky right-0 z-20 pl-6 pr-4 text-right shadow-[inset_-8px_0_8px_-8px_rgba(15,23,42,0.08)] whitespace-nowrap"
                      : "align-top";

                  return (
                    <td
                      key={cell.id}
                      className={`${baseClasses} ${cellSpecificClasses}`}
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
