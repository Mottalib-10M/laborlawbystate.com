/** Paid sick leave accrual: 1 hour per N hours worked, capped (state rule). */
export function sickAccrual(hoursPerWeek: number, weeks: number, perHours: number | null, cap: number | null) {
  const worked = Math.max(0, hoursPerWeek) * Math.max(0, weeks);
  if (!perHours) return { worked, accrued: 0, capped: false };
  const raw = worked / perHours;
  return { worked, accrued: cap != null ? Math.min(raw, cap) : raw, capped: cap != null && raw > cap, raw };
}
/** Weeks of work needed to earn `target` hours. */
export const weeksToEarn = (target: number, hoursPerWeek: number, perHours: number) => (hoursPerWeek > 0 ? (target * perHours) / hoursPerWeek : Infinity);
