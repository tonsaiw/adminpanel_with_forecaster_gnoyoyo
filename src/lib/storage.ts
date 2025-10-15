export function generateMachineId(existingCount: number): string {
  const nextIndex = existingCount + 1;
  return `machine-${String(nextIndex).padStart(3, "0")}`;
}
