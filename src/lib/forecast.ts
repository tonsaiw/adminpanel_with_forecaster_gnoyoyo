import type { Machine } from "@/types/machine";
import type { DailyWeather } from "@/lib/weather";

export type DailyForecast = {
  date: string;
  avgTemp: number;
  electricityCost: number;
  profitOrLoss: number;
};

export function buildDailyForecast(
  machines: Machine[],
  weather: DailyWeather[]
): DailyForecast[] {
  if (!machines.length || !weather.length) {
    return [];
  }

  return weather.map((day) => {
    const avgTemp = (day.max + day.min) / 2;

    const totalRevenue = machines.reduce(
      (sum, machine) =>
        sum + machine.expectedSalesPerDay * machine.averageProfitMarginPercentage,
      0
    );

    const totalRent = machines.reduce(
      (sum, machine) => sum + machine.rentCostPerDay,
      0
    );

    const totalElectricity = machines.reduce(
      (sum, machine) => sum + machine.electricCostPerTempPerDay * avgTemp,
      0
    );

    const profitOrLoss = totalRevenue - totalRent - totalElectricity;

    return {
      date: day.date,
      avgTemp,
      electricityCost: totalElectricity,
      profitOrLoss,
    };
  });
}
