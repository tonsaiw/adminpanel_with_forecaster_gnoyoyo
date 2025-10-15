import type { Machine } from "@/types/machine";
import type { DailyWeather } from "@/lib/weather";
import type { DailyForecast, WeeklySummary } from "@/types/forecast";

export function buildDailyForecast(
  machines: Machine[],
  weather: DailyWeather[]
): DailyForecast[] {
  if (!machines.length || !weather.length) {
    return [];
  }

  const totalRevenuePerDay = machines.reduce(
    (sum, machine) =>
      sum + machine.expectedSalesPerDay * machine.averageProfitMarginPercentage,
    0
  );

  const totalRentPerDay = machines.reduce(
    (sum, machine) => sum + machine.rentCostPerDay,
    0
  );

  return weather.map((day) => {
    const avgTemp = (day.max + day.min) / 2;

    const totalElectricity = machines.reduce(
      (sum, machine) => sum + machine.electricCostPerTempPerDay * avgTemp,
      0
    );

    const profitOrLoss = totalRevenuePerDay - totalRentPerDay - totalElectricity;

    return {
      date: day.date,
      avgTemp,
      electricityCost: totalElectricity,
      profitOrLoss,
    };
  });
}

export function calculateWeeklySummary(
  machines: Machine[],
  daily: DailyForecast[]
): WeeklySummary {
  if (!machines.length || !daily.length) {
    return {
      totalRevenue: 0,
      totalRent: 0,
      totalElectricity: 0,
      netProfitOrLoss: 0,
      avgTemp: undefined,
      profitMargin: undefined,
    };
  }

  const days = daily.length;

  const totalRevenuePerDay = machines.reduce(
    (sum, machine) =>
      sum + machine.expectedSalesPerDay * machine.averageProfitMarginPercentage,
    0
  );

  const totalRentPerDay = machines.reduce(
    (sum, machine) => sum + machine.rentCostPerDay,
    0
  );

  const totalElectricity = daily.reduce(
    (sum, day) => sum + day.electricityCost,
    0
  );

  const totalRevenue = totalRevenuePerDay * days;
  const totalRent = totalRentPerDay * days;

  const netProfitOrLoss = totalRevenue - totalRent - totalElectricity;

  const avgTemp =
    daily.reduce((sum, day) => sum + day.avgTemp, 0) / daily.length;

  const profitMargin =
    totalRevenue > 0 ? (netProfitOrLoss / totalRevenue) * 100 : undefined;

  return {
    totalRevenue,
    totalRent,
    totalElectricity,
    netProfitOrLoss,
    avgTemp,
    profitMargin,
  };
}
