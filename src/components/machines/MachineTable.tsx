import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Machine } from "@/types/machine";
import { useMachines } from "@/hooks/useMachines";

export const MachineTable = () => {
  const { machines } = useMachines();

  const columns = useMemo<ColumnDef<Machine>[]>(() => {
    return [
      {
        header: "ID",
        accessorKey: "id",
        cell: (info) => info.getValue<string>(),
      },
      {
        header: "Name",
        accessorKey: "name",
        cell: (info) => info.getValue<string>(),
      },
      {
        header: "Location Type",
        accessorKey: "locationType",
        cell: (info) => info.getValue<string>(),
      },
      {
        header: "Expected Sales / Day",
        accessorKey: "expectedSalesPerDay",
        cell: (info) => info.getValue<number>(),
      },
      {
        header: "Avg Profit Margin",
        accessorKey: "averageProfitMarginPercentage",
        cell: (info) => `${(info.getValue<number>() * 100).toFixed(0)}%`,
      },
      {
        header: "rentCostPerDay (Baht)",
        accessorKey: "rentCostPerDay",
        cell: (info) => info.getValue<number>(),
      },
      {
        header: "electricCostPerTempPerDay (Baht per °C per day)",
        accessorKey: "electricCostPerTempPerDay",
        cell: (info) => info.getValue<number>(),
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
      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
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
                    className="px-4 py-3 text-sm text-slate-700"
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
