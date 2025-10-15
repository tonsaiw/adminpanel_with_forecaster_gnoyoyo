export function formatTHB(
  value: number,
  opts: { maximumFractionDigits?: number } = {}
) {
  const { maximumFractionDigits = 0 } = opts;
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits,
  }).format(value);
}
