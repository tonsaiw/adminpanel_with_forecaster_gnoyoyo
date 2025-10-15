export type DailyWeather = {
  date: string;
  min: number;
  max: number;
  avg: number;
};

export type DailyForecast = {
  date: string;
  electricityCost: number;
  revenue: number;
  rent: number;
  profitOrLoss: number;
};

export type WeeklySummary = {
  totalRevenue: number;
  totalRent: number;
  totalElectricity: number;
  netProfitOrLoss: number;
};
