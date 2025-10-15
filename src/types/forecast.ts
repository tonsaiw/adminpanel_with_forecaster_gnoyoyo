export type DailyForecast = {
  date: string;
  avgTemp: number;
  electricityCost: number;
  profitOrLoss: number;
};

export type WeeklySummary = {
  totalRevenue: number;
  totalRent: number;
  totalElectricity: number;
  netProfitOrLoss: number;
  avgTemp?: number;
  profitMargin?: number;
};
