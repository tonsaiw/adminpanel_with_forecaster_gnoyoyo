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
  if (isLoading) return <p>Loading forecast...</p>;
  if (isError) return <p>Error loading forecast data.</p>;
  if (!data?.length) return <p>No forecast data.</p>;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-medium text-gray-500">📈 7-DAY FORECAST</h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 24, bottom: 0, left: 0 }}>
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
