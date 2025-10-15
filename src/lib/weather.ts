import type { WeatherResponse } from "@/types/weather";

export type DailyWeather = {
  date: string;
  max: number;
  min: number;
};

const API_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=13.754&longitude=100.5014&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok";

export async function fetchWeather(): Promise<DailyWeather[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data: WeatherResponse = await res.json();

  return data.daily.time.map((date, index) => ({
    date,
    max: data.daily.temperature_2m_max[index],
    min: data.daily.temperature_2m_min[index],
  }));
}
