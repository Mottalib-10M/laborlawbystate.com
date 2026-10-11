/** Full time and part time: what a weekly schedule triggers under federal rules (ACA 30 h / 130 h, FMLA 1,250 h, FLSA 40 h). */
export interface HourRules { acaWeekly: number; acaMonthly: number; fmlaHours: number; otWeekly: number }
export function schedule(R: HourRules, hoursPerWeek: number, weeksPerYear = 52) {
  const h = Math.max(0, hoursPerWeek);
  const monthly = (h * 52) / 12;
  const yearly = h * Math.max(0, Math.min(52, weeksPerYear));
  return {
    monthly, yearly,
    acaFullTime: h >= R.acaWeekly || monthly >= R.acaMonthly,
    fmlaHours: yearly >= R.fmlaHours,
    overtimeHours: Math.max(0, h - R.otWeekly),
    fte: h / 40,
  };
}
