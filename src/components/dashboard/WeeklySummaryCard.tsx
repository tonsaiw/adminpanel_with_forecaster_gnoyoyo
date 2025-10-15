import { formatTHB } from "@/utils/number";

type WeeklySummaryProps = {
  summary: {
    totalRevenue: number;
    totalRent: number;
    totalElectricity: number;
    netProfitOrLoss: number;
    avgTemp?: number;
    profitMargin?: number;
  } | null;
  isLoading?: boolean;
};

export function WeeklySummaryCard({ summary, isLoading }: WeeklySummaryProps) {
  if (isLoading) {
    return (
      <section className="rounded-xl border bg-white p-6 shadow-sm animate-pulse">
        <div className="mb-4 h-4 w-48 rounded bg-gray-200" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg border bg-gray-100 p-4 text-center shadow-sm"
            >
              <div className="mx-auto h-3 w-24 rounded bg-gray-300" />
              <div className="mx-auto mt-3 h-6 w-32 rounded bg-gray-200" />
              <div className="mx-auto mt-2 h-3 w-20 rounded bg-gray-300" />
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-lg border bg-gray-100 p-5 shadow-md">
          <div className="mb-3 h-3 w-32 rounded bg-gray-300" />
          <div className="mb-2 h-6 w-28 rounded bg-gray-200" />
          <div className="mb-2 h-3 w-24 rounded bg-gray-300" />
          <div className="h-3 w-32 rounded bg-gray-300" />
        </div>
      </section>
    );
  }

  if (!summary) {
    return null;
  }

  const {
    totalRevenue,
    totalRent,
    totalElectricity,
    netProfitOrLoss,
    avgTemp,
    profitMargin,
  } = summary;

  const isProfit = netProfitOrLoss >= 0;

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-medium text-gray-500">
        WEEKLY FORECAST SUMMARY
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-green-50 p-4 text-center shadow-sm transition-transform duration-200 hover:-translate-y-1">
          <div className="text-sm font-medium text-green-700">💰 REVENUE</div>
          <div className="mt-2 text-2xl font-semibold text-green-800">
            {formatTHB(totalRevenue)}
          </div>
          <div className="text-xs text-gray-600">Total 7 days</div>
        </div>

        <div className="rounded-lg border bg-orange-50 p-4 text-center shadow-sm transition-transform duration-200 hover:-translate-y-1">
          <div className="text-sm font-medium text-orange-700">🏢 RENT</div>
          <div className="mt-2 text-2xl font-semibold text-orange-800">
            {formatTHB(totalRent)}
          </div>
          <div className="text-xs text-gray-600">Total cost</div>
        </div>

        <div className="rounded-lg border bg-blue-50 p-4 text-center shadow-sm transition-transform duration-200 hover:-translate-y-1">
          <div className="text-sm font-medium text-blue-700">⚡ ELECTRIC</div>
          <div className="mt-2 text-2xl font-semibold text-blue-800">
            {formatTHB(totalElectricity)}
          </div>
          <div className="text-xs text-gray-600">
            Avg temp {avgTemp !== undefined ? avgTemp.toFixed(1) : "--"}°C
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border bg-gradient-to-r from-gray-50 via-white to-gray-50 p-5 shadow-md transition-transform duration-200 hover:-translate-y-1">
        <div className="mb-2 text-sm font-medium text-gray-700">
          📊 NET PROFIT/LOSS
        </div>
        <div
          className={`text-3xl font-bold ${
            isProfit ? "text-green-700" : "text-red-600"
          }`}
        >
          {formatTHB(netProfitOrLoss)}
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {isProfit ? "↑ Profitable" : "↓ Loss recorded"}
        </p>
      </div>
    </section>
  );
}
