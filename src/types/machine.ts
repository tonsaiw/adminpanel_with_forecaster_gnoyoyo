export type Machine = {
  id: string;
  name: string;
  locationType: "SCHOOL" | "SHOPPING MALL" | "HOSPITAL";
  expectedSalesPerDay: number;
  averageProfitMarginPercentage: number;
  rentCostPerDay: number;
  electricCostPerTempPerDay: number;
};
