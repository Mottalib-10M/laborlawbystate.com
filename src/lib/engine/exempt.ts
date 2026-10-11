/** Salary-level test of the white-collar exemptions: federal $684 a week (29 CFR 541.600) or a higher state level. Duties are not tested. */
export function salaryTest(weeklySalary: number, federalWeekly: number, stateWeekly: number | null) {
  const level = Math.max(federalWeekly, stateWeekly ?? 0);
  return { level, annualLevel: level * 52, passes: weeklySalary >= level, gap: Math.max(0, level - weeklySalary), stateHigher: (stateWeekly ?? 0) > federalWeekly };
}
