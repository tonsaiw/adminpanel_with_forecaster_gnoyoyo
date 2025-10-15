import { z } from "zod";

export const machineInputSchema = z.object({
  name: z.string().min(1, "Name is required."),
  locationType: z.enum(["SCHOOL", "SHOPPING MALL", "HOSPITAL"]),
  expectedSalesPerDay: z.number().nonnegative(),
  averageProfitMarginPercentage: z
    .number()
    .min(0, "Margin cannot be negative.")
    .max(1, "Margin cannot exceed 100%."),
  rentCostPerDay: z.number().nonnegative(),
  electricCostPerTempPerDay: z.number().nonnegative(),
});

export const machineSchema = machineInputSchema.extend({
  id: z.string().min(1),
});

export type MachineInput = z.infer<typeof machineInputSchema>;
export type Machine = z.infer<typeof machineSchema>;
