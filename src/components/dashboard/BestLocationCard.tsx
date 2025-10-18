import { Trophy, Hospital, School, Store } from "lucide-react";

import { useMachines } from "@/hooks/useMachines";
import { getBestSellingSummary } from "@/lib/summary";
import { formatTHB } from "@/utils/number";

const typeEmoji = (type: string) => {
  switch (type) {
    case "SHOPPING MALL":
      return <Store size={30} className="drop-shadow-sm" color="#746254" />;
    case "SCHOOL":
      return <School size={30} className=" drop-shadow-sm" color="#f08c62" />;
    case "HOSPITAL":
      return (
        <Hospital
          size={30}
          className="text-red-500 drop-shadow-sm"
          color="#f0141f"
        />
      );
    default:
      return "📍";
  }
};

export function BestLocationCard() {
  const { machines } = useMachines();
  const summary = getBestSellingSummary(machines);

  if (!summary) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-md text-center">
      <div className="flex items-center justify-center gap-2">
        <span>
          <Trophy size={30} className="text-amber-400 drop-shadow-sm" />
        </span>
        <h3 className="text-xl font-semibold text-primary-500 tracking-wide">
          BEST SELLING LOCATION
        </h3>
        <span>
          <Trophy size={30} className="text-amber-400 drop-shadow-sm" />
        </span>
      </div>

      <div className="mt-5 flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-2 text-2xl font-semibold">
          <span>{typeEmoji(summary.type)}</span>
          <h3 className="text-primary-500">{summary.type}</h3>
        </div>

        <p className="text-slate-500">
          Total Sales:{" "}
          <span className="font-medium text-secondary-500">
            {formatTHB(summary.totalSales)}/day
          </span>
        </p>
      </div>

      <div className="my-4 h-px w-full bg-slate-200" />

      <div className="text-sm text-secondary-400">
        {summary.count} machines • {summary.percent}% of total
      </div>
    </div>
  );
}
