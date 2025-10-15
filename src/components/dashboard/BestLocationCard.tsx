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
      <h3 className="text-sm font-medium text-gray-500">🏆 BEST SELLING LOCATION</h3>
      <div className="mt-4 text-2xl font-semibold text-gray-800">
        {typeEmoji(summary.type)} {summary.type}
      </div>

      <div className="mt-4 text-gray-600">
        Total Sales: {" "}
        <span className="font-medium text-gray-900">
          {formatTHB(summary.totalSales)}/day
        </span>
      </div>

      <div className="mt-4 h-px w-full bg-gray-200" />

      <div className="mt-3 text-sm text-gray-500">
        {summary.count} machines • {summary.percent}% of total
      </div>
    </div>
  );
}
