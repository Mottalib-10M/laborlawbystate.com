/**
 * Shape of a state fact file: src/data/states/<slug>.json (research brief: research/BRIEF-STATE-RESEARCH.md).
 * Every value carries the official page it was read on. `null` = the state has no such rule.
 */
export interface Source { url: string; quote: string; accessed: string }
export interface Rate { from: string; rate: number; area: string; note?: string }
export interface StateData {
  slug: string; name: string; abbr: string;
  agency: { name: string; url: string };
  minWage: {
    rates2026: Rate[];
    headline: number;
    headlineArea?: string;
    federalApplies: boolean;
    rates2027: Rate[];
    smallEmployer: string | null;
    tipped: { cashWage: number | null; tipCreditAllowed: boolean; note?: string };
    other: string | null;
    source: Source;
  };
  localMinWages: Array<{ name: string; rate: number; from: string; note?: string; source: Source }>;
  overtime: {
    weeklyHours: number | null; dailyHours: number | null; doubleTime: string | null; seventhDay: string | null;
    exemptSalaryWeekly: number | null; exemptSalaryNote?: string | null; note?: string | null; source: Source | null;
  };
  sickLeave: {
    mandatory: boolean; accrual: string | null; accrualPerHours: number | null; capHours: number | null; capNote?: string | null;
    employerThreshold?: string | null; effective?: string | null; note?: string | null; source: Source | null;
  };
  familyLeave: {
    paidProgram: boolean; name?: string | null; benefitsStart?: string | null; maxWeeks?: number | null; replacement?: string | null;
    maxWeeklyBenefit2026?: number | null; medicalLeave?: string | null; stateUnpaidLaw?: string | null; source: Source | null;
  };
  finalPay: {
    fired: string; firedDays: number | null; quit: string; quitNotice: string | null;
    ptoPayout: 'required' | 'policy' | 'no-law' | string; ptoNote?: string | null; source: Source | null; ptoSource?: Source | null;
  };
  breaks: {
    meal: string | null; mealMinutes: number | null; mealAfterHours: number | null;
    rest: string | null; restMinutes: number | null; restPerHours: number | null; minorsOnly: string | null; source: Source | null;
  };
  rightToWork: boolean; rightToWorkSource: Source | null;
  atWill: string;
  notes: Array<{ text: string; source: Source }>;
  uncertain: string[];
}
