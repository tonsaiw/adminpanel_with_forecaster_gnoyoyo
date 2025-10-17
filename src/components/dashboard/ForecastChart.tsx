import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Skeleton from "react-loading-skeleton";
import { formatTHB } from "@/utils/number";

export function ForecastChart({
  data,
  isLoading,
  isError,
}: {
  data: { date: string; electricityCost: number; profitOrLoss: number }[];
  isLoading: boolean;
  isError: boolean;
}) {
  if (isError) {
    return (
      <div className="rounded-xl border bg-white p-6 text-center text-sm text-red-600 shadow-sm">
        ❌ Error loading forecast data
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold text-primary-500">
          7-DAY FORECAST
        </h3>
        <Skeleton height={280} borderRadius="0.75rem" />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold text-primary-500">
          7-DAY FORECAST
        </h3>
        <div className="rounded-xl border bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
          No forecast data available.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold text-primary-500">
        7-DAY FORECAST
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 24, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => formatTHB(v as number)} width={80} />
            <Tooltip formatter={(v) => formatTHB(v as number)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="electricityCost"
              name="Avg Electricity Cost"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="profitOrLoss"
              name="Profit / Loss"
              stroke="#34D399"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
