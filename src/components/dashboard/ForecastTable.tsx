import { formatTHB } from "@/utils/number";
import type { DailyForecast } from "@/types/forecast";

type ForecastTableProps = {
  data: DailyForecast[];
};

export function ForecastTable({ data }: ForecastTableProps) {
  if (!data.length) {
    return null;
  }

  return (
    <div className="min-w-0 rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-primary-500">
        7-DAY FORECAST TABLE
      </h3>
      <div className="min-w-0 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-foreground text-left">
            <tr className="text-xs font-semibold tracking-wide text-primary-500">
              <th className="whitespace-nowrap px-4 py-3">Date</th>
              <th className="whitespace-nowrap px-4 py-3 text-right">
                Min Temp (°C)
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right">
                Max Temp (°C)
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right">
                Avg Temp (°C)
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right">
                Electricity Cost
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right">
                Profit / Loss
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((day) => (
              <tr key={day.date} className="text-slate-700">
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  {day.date}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-left">
                  {day.minTemp.toFixed(1)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-left">
                  {day.maxTemp.toFixed(1)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-left">
                  {day.avgTemp.toFixed(1)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-left text-slate-900">
                  <span className="text-xs font-medium text-slate-400">฿ </span>
                  <span className="font-semibold text-slate-800">
                    {day.electricityCost}
                  </span>
                </td>
                <td
                  className={`whitespace-nowrap px-4 py-3 text-left font-semibold ${
                    day.profitOrLoss >= 0 ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {formatTHB(day.profitOrLoss)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
