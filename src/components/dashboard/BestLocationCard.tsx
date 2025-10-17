import { useMachines } from "@/hooks/useMachines";
import { getBestSellingSummary } from "@/lib/summary";
import { formatTHB } from "@/utils/number";

const typeEmoji = (type: string) => {
  switch (type) {
    case "SHOPPING MALL":
      return "🏢";
    case "SCHOOL":
      return "🏫";
    case "HOSPITAL":
      return "🏥";
    default:
      return "📍";
  }
};

export function BestLocationCard() {
  const { machines } = useMachines();
  const summary = getBestSellingSummary(machines);

  if (!summary) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm text-center">
      <h3 className="text-xl font-semibold text-primary-500">
        🏆 BEST SELLING LOCATION
      </h3>
      <div className="mt-4 text-2xl font-semibold text-secondary-500">
        {typeEmoji(summary.type)} {summary.type}
      </div>

      <div className="mt-4 text-primary-400">
        Total Sales:{" "}
        <span className="font-medium text-secondary-500">
          {formatTHB(summary.totalSales)}/day
        </span>
      </div>

      <div className="mt-4 h-px w-full bg-foreground" />

      <div className="mt-3 text-sm text-primary-400">
        {summary.count} machines • {summary.percent}% of total
      </div>
    </div>
  );
}
