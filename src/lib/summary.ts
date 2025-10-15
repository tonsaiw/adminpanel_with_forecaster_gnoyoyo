import type { Machine } from "@/schemas/machine.schema";

export type BestSellingSummary = {
  type: string;
  totalSales: number;
  count: number;
  percent: number;
};

export function getBestSellingSummary(machines: Machine[]): BestSellingSummary | null {
  if (!machines?.length) return null;

  const totals = machines.reduce<Record<string, { total: number; count: number }>>(
    (acc, m) => {
      const key = m.locationType;
      if (!acc[key]) acc[key] = { total: 0, count: 0 };
      acc[key].total += m.expectedSalesPerDay;
      acc[key].count += 1;
      return acc;
    },
    {}
  );

  let best: { type: string; total: number; count: number } | null = null;
  let grandTotal = 0;
  for (const [type, { total, count }] of Object.entries(totals)) {
    grandTotal += total;
    if (!best || total > best.total) {
      best = { type, total, count };
    }
  }

  if (!best) return null;

  return {
    type: best.type,
    totalSales: best.total,
    count: best.count,
    percent: grandTotal ? Math.round((best.total / grandTotal) * 100) : 0,
  };
}

