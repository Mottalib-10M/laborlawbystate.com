/**
 * Overtime under a state rule and the FLSA (29 CFR 778.107): time and a half over the weekly threshold,
 * plus the daily rules some states add. The worker receives the more favorable of the state and federal results.
 * Daily hours already paid as overtime are not counted again toward the weekly threshold (no pyramiding).
 */
export interface OtRule {
  weekly: number | null;      // weekly threshold of the state (null = none of its own)
  daily: number | null;       // time and a half after this many hours in a day
  dailyDouble: number | null; // double time after this many hours in a day
  seventhDay: boolean;        // California-style 7th consecutive day rule
}
export interface OtInput { rate: number; hoursPerDay: number; daysPerWeek: number }
export interface OtResult { regularHours: number; otHours: number; doubleHours: number; regularPay: number; otPay: number; doublePay: number; total: number; basis: 'state' | 'federal' }

function run(rule: OtRule, { rate, hoursPerDay, daysPerWeek }: OtInput): Omit<OtResult, 'basis'> {
  const days = Math.max(0, Math.min(7, Math.round(daysPerWeek)));
  const h = Math.max(0, Math.min(24, hoursPerDay));
  let reg = 0, ot = 0, dbl = 0;
  for (let d = 1; d <= days; d++) {
    if (rule.seventhDay && d === 7) { ot += Math.min(h, 8); dbl += Math.max(0, h - 8); continue; }
    let r = h, o = 0, x = 0;
    if (rule.dailyDouble != null && h > rule.dailyDouble) { x = h - rule.dailyDouble; r = rule.dailyDouble; }
    if (rule.daily != null && r > rule.daily) { o = r - rule.daily; r = rule.daily; }
    reg += r; ot += o; dbl += x;
  }
  if (rule.weekly != null && reg > rule.weekly) { ot += reg - rule.weekly; reg = rule.weekly; }
  const regularPay = reg * rate, otPay = ot * rate * 1.5, doublePay = dbl * rate * 2;
  return { regularHours: reg, otHours: ot, doubleHours: dbl, regularPay, otPay, doublePay, total: regularPay + otPay + doublePay };
}
export const FEDERAL_RULE: OtRule = { weekly: 40, daily: null, dailyDouble: null, seventhDay: false };
/** State rule against the FLSA: the larger total wins (the FLSA applies to covered employers everywhere). */
export function overtime(rule: OtRule, input: OtInput): OtResult {
  const s = run(rule, input), f = run(FEDERAL_RULE, input);
  return s.total >= f.total ? { ...s, basis: 'state' } : { ...f, basis: 'federal' };
}
/** Time and a half and double time of an hourly rate. */
export const timeAndHalf = (rate: number) => rate * 1.5;
export const doubleTime = (rate: number) => rate * 2;
