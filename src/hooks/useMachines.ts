import { useState } from "react";
import { Machine } from "@/types/machine";

const seedMachines: Machine[] = [
  {
    id: "machine-001",
    name: "Siam Paragon Lobby",
    locationType: "SHOPPING MALL",
    expectedSalesPerDay: 180,
    averageProfitMarginPercentage: 0.42,
    rentCostPerDay: 1500,
    electricCostPerTempPerDay: 12,
  },
  {
    id: "machine-002",
    name: "Chulalongkorn University",
    locationType: "SCHOOL",
    expectedSalesPerDay: 140,
    averageProfitMarginPercentage: 0.38,
    rentCostPerDay: 900,
    electricCostPerTempPerDay: 10,
  },
  {
    id: "machine-003",
    name: "Bangkok Hospital Lobby",
    locationType: "HOSPITAL",
    expectedSalesPerDay: 160,
    averageProfitMarginPercentage: 0.4,
    rentCostPerDay: 1100,
    electricCostPerTempPerDay: 11,
  },
];

export const useMachines = () => {
  const [machines] = useState<Machine[]>(seedMachines);

  return {
    machines,
  };
};
