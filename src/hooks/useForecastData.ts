import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "@/lib/weather";
import { buildDailyForecast, calculateWeeklySummary } from "@/lib/forecast";
import type { Machine } from "@/types/machine";
import type { DailyForecast, WeeklySummary } from "@/types/forecast";
import { toast } from "react-toastify";

export function useForecastData(machines: Machine[]) {
  const weatherQuery = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (!weatherQuery.isError) {
      return;
    }

    const baseMessage = "Failed to fetch weather data";
    const errorMessage =
      weatherQuery.error instanceof Error
        ? `${baseMessage}: ${weatherQuery.error.message}`
        : baseMessage;

    toast.error(errorMessage);
  }, [weatherQuery.error, weatherQuery.errorUpdatedAt, weatherQuery.isError]);

  const forecastDaily: DailyForecast[] = useMemo(() => {
    if (!weatherQuery.data || !machines.length) {
      return [];
    }
    return buildDailyForecast(machines, weatherQuery.data);
  }, [machines, weatherQuery.data]);

  const weeklySummary: WeeklySummary | undefined = useMemo(() => {
    if (!machines.length || !forecastDaily.length) {
      return undefined;
    }
    return calculateWeeklySummary(machines, forecastDaily);
  }, [forecastDaily, machines]);

  return {
    forecast: {
      daily: forecastDaily,
      weekly: weeklySummary,
    },
    isLoading: weatherQuery.isLoading,
    isError: weatherQuery.isError,
  } as const;
}
