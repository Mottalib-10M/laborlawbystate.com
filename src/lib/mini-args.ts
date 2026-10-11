/** Server side: the compact rows that state-aware mini-simulators receive through `arg` (see minis/_kit.ts Row). */
import { STATES, TODAY, mwNow, mw2027, mwJan } from './kit';
import type { Row } from './minis/_kit';
export function stateRows(): Row[] {
  return STATES.map((s) => [s.name, mwNow(s.slug), s.minWage.tipped.cashWage, s.minWage.tipped.tipCreditAllowed ? 1 : 0, s.sickLeave.mandatory ? s.sickLeave.accrualPerHours : null, s.sickLeave.mandatory ? s.sickLeave.capHours : null, s.familyLeave.paidProgram && !((s.familyLeave.benefitsStart ?? '') > TODAY) ? (s.familyLeave.maxWeeks ?? null) : null, s.finalPay.fired, s.finalPay.ptoPayout, s.breaks.mealMinutes, s.breaks.mealAfterHours, s.breaks.restMinutes, s.breaks.restPerHours, s.rightToWorkUnknown ? -1 : s.rightToWork ? 1 : 0, s.overtime.exemptSalaryWeekly, s.finalPay.firedDays, mw2027(s.slug)?.rate ?? null, mwJan(s.slug)]);
}
/** arg for a state-aware mini, optionally preselecting a state by name. */
export const stateArg = (first?: string) => ({ rows: stateRows(), first });
/** arg for minis/pflState: [name, weeks, max weekly 2026, program name or null]. */
export const pflArg = (first?: string) => ({ rows: STATES.map((s) => [s.name, s.familyLeave.paidProgram ? (s.familyLeave.maxWeeks ?? null) : null, s.familyLeave.paidProgram ? (s.familyLeave.maxWeeklyBenefit2026 ?? null) : null, s.familyLeave.paidProgram ? `${s.familyLeave.name ?? 'Paid family leave'}${(s.familyLeave.benefitsStart ?? '') > TODAY ? ` (benefits from ${s.familyLeave.benefitsStart})` : ''}` : null]), first });
/** arg for minis/cityCompare: every local rate in force, with its state rate. */
export const cityArg = () => ({ cities: STATES.flatMap((s) => s.localMinWages.filter((l) => l.from <= TODAY).map((l) => [`${l.name} (${s.abbr})`, l.rate, s.name, mwNow(s.slug)])) });
