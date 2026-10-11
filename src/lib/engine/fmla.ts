/** FMLA eligibility (29 CFR 825.110) and the leave left in the 12-month period (29 CFR 825.200). */
export interface FmlaRules { employerEmployees: number; worksiteEmployees: number; hours: number; months: number; weeks: number; militaryCaregiverWeeks: number }
export interface FmlaInput { publicEmployer: boolean; employerSize: number; employeesWithin75: number; monthsEmployed: number; hours12m: number; weeksUsed: number; caregiver?: boolean }
export function fmla(R: FmlaRules, x: FmlaInput) {
  const coveredEmployer = x.publicEmployer || x.employerSize >= R.employerEmployees;
  const site = x.employeesWithin75 >= R.worksiteEmployees;
  const tenure = x.monthsEmployed >= R.months;
  const hours = x.hours12m >= R.hours;
  const eligible = coveredEmployer && site && tenure && hours;
  const entitlement = x.caregiver ? R.militaryCaregiverWeeks : R.weeks;
  const left = Math.max(0, entitlement - Math.max(0, x.weeksUsed));
  const failed = [!coveredEmployer && 'employer', !site && 'worksite', !tenure && 'months', !hours && 'hours'].filter(Boolean) as string[];
  return { coveredEmployer, site, tenure, hours, eligible, entitlement, left, failed, hoursShort: Math.max(0, R.hours - x.hours12m), monthsShort: Math.max(0, R.months - x.monthsEmployed) };
}
/** Weekly hours needed on average over 52 weeks to reach the FMLA hours test. */
export const weeklyHoursFor = (hours: number) => hours / 52;
