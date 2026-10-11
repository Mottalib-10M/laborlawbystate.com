/** Minimum wage: the rate in force on a date, earnings at a rate, tipped top-up. Pure functions. */
export interface DatedRate { from: string; rate: number; area: string }

/** Rate in force on `date` (ISO) for `area` (exact label) or, without area, the highest-priority general rows. */
export function rateOn(rates: DatedRate[], date: string, area?: string): number | null {
  const rows = rates.filter((r) => (area ? r.area === area : true) && r.from <= date).sort((a, b) => b.from.localeCompare(a.from));
  return rows.length ? rows[0].rate : null;
}
/** Distinct areas of a schedule, in file order. */
export const areas = (rates: DatedRate[]) => [...new Set(rates.map((r) => r.area))];
/** The effective minimum: never below the federal floor for a covered worker. */
export const effectiveMin = (stateRate: number | null, federal: number) => Math.max(stateRate ?? 0, federal);

export interface Earnings { hourly: number; weekly: number; monthly: number; annual: number }
/** Straight-time earnings at `rate` for `hoursPerWeek` (52 weeks a year, month = year / 12). */
export function earnings(rate: number, hoursPerWeek: number): Earnings {
  const weekly = rate * Math.max(0, hoursPerWeek);
  return { hourly: rate, weekly, monthly: (weekly * 52) / 12, annual: weekly * 52 };
}
/** Tipped worker: the employer must top up when cash wage + tips per hour fall short of the minimum. */
export function tipTopUp(cashWage: number, tipsPerHour: number, minWage: number) {
  const total = cashWage + Math.max(0, tipsPerHour);
  return { total, topUp: Math.max(0, minWage - total), tipCredit: Math.max(0, minWage - cashWage) };
}
/** Increase between two rates, in dollars and percent (one decimal kept by the caller). */
export function raise(from: number, to: number) { return { dollars: to - from, pct: from > 0 ? ((to - from) / from) * 100 : 0 }; }
