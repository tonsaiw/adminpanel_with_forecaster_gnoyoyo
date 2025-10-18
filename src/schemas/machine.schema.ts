import { z } from "zod";

export const machineInputSchema = z.object({
  name: z.string().min(1, "Name is required."),
  locationType: z.enum(["SCHOOL", "SHOPPING MALL", "HOSPITAL"]),
  expectedSalesPerDay: z
    .number({
      invalid_type_error: "Expected sales is required.",
    })
    .nonnegative("Expected Sales must be ≥ 0"),
  averageProfitMarginPercentage: z
    .number({
      required_error: "Profit margin is required.",
      invalid_type_error: "Profit margin is required.",
    })
    .min(0, "Minimum is 0%")
    .max(100, "Maximum is 100%"),
  rentCostPerDay: z
    .number({
      invalid_type_error: "Rent cost is required.",
    })
    .nonnegative("Rent cost must be ≥ 0"),
  electricCostPerTempPerDay: z
    .number({
      invalid_type_error: "Electric cost is required.",
    })
    .nonnegative("Electric cost must be ≥ 0"),
});

export const machineSchema = machineInputSchema.extend({
  id: z.string().min(1),
});

export type MachineInput = z.infer<typeof machineInputSchema>;
export type Machine = z.infer<typeof machineSchema>;
