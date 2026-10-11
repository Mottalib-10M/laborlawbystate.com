/** Federal garnishment cap (CCPA, DOL Fact Sheet #30) and a severance formula entered by the user. */
export function garnishCap(disposableWeekly: number, federalMin: number, multiple: number, pct: number) {
  const floor = federalMin * multiple;
  const byPct = (disposableWeekly * pct) / 100;
  const byFloor = Math.max(0, disposableWeekly - floor);
  return { floor, byPct, byFloor, max: Math.max(0, Math.min(byPct, byFloor)), protected: disposableWeekly <= floor };
}
export function severance(weeklyPay: number, years: number, weeksPerYear: number, minWeeks = 0, maxWeeks = Infinity) {
  const weeks = Math.min(Math.max(years * weeksPerYear, minWeeks), maxWeeks);
  return { weeks, amount: weeks * Math.max(0, weeklyPay) };
}
