import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/weather";
import { buildDailyForecast, type DailyForecast } from "@/lib/forecast";
import type { Machine } from "@/types/machine";

export function useForecastData(machines: Machine[]) {
  const weatherQuery = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: 1000 * 60 * 10,
  });

  const forecast: DailyForecast[] = useMemo(() => {
    if (!weatherQuery.data || !machines.length) {
      return [];
    }
    return buildDailyForecast(machines, weatherQuery.data);
  }, [machines, weatherQuery.data]);

  return {
    forecast,
    isLoading: weatherQuery.isLoading,
    isError: weatherQuery.isError,
  } as const;
}
