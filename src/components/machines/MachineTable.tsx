import { useEffect, useMemo, useRef, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Machine } from "@/types/machine";
import { useMachines } from "@/hooks/useMachines";

type ActionCellProps = {
  machine: Machine;
};

const ActionCell = ({ machine }: ActionCellProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleEdit = () => {
    setOpen(false);
    console.log("Edit machine", machine);
  };

  const handleDelete = () => {
    setOpen(false);
    console.log("Delete machine", machine);
  };

  return (
    <div ref={menuRef} className="relative flex min-w-[64px] justify-end">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
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
      {open ? (
        <div className="absolute right-0 top-9 z-10 w-36 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
          <button
            type="button"
            onClick={handleEdit}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50 hover:text-rose-700"
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

export const MachineTable = () => {
  const { machines } = useMachines();

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
        header: "Expected Sales / Day",
        accessorKey: "expectedSalesPerDay",
        size: 170,
        cell: (info) => info.getValue<number>(),
      },
      {
        header: "Avg Profit Margin",
        accessorKey: "averageProfitMarginPercentage",
        size: 170,
        cell: (info) => `${(info.getValue<number>() * 100).toFixed(0)}%`,
      },
      {
        header: "rentCostPerDay (Baht)",
        accessorKey: "rentCostPerDay",
        size: 180,
        cell: (info) => info.getValue<number>(),
      },
      {
        header: "electricCostPerTempPerDay (Baht per °C per day)",
        accessorKey: "electricCostPerTempPerDay",
        size: 220,
        cell: (info) => info.getValue<number>(),
      },
      {
        id: "actions",
        header: "Actions",
        size: 120,
        cell: ({ row }) => <ActionCell machine={row.original} />,
      },
    ];
  }, []);

  const table = useReactTable({
    data: machines,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (machines.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-500">
        ยังไม่มีข้อมูลเครื่องขายสินค้า โปรดเพิ่มรายการใหม่
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[720px] divide-y divide-slate-200 lg:min-w-full">
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
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`whitespace-nowrap px-4 py-3 text-sm text-slate-700 ${
                      cell.column.id === "actions"
                        ? "sticky right-0 bg-white pl-6 pr-4 text-right shadow-[inset_-8px_0_8px_-8px_rgba(15,23,42,0.08)] whitespace-nowrap"
                        : "align-top bg-white"
                    }`}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
