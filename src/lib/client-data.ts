/** Server side: the compact state data given to the calculator islands (no quotes, no sources). */
import { STATES, TODAY, F, otRule, mwNow, mw2027, mwJan } from './kit';
import { rateOn, areas } from './engine/wage';
import type { ClientState } from '../components/calc/client-types';
export function clientStates(): ClientState[] {
  return STATES.map((s) => {
    const own = areas(s.minWage.rates2026).map((a) => ({ label: a, rate: Math.max(rateOn(s.minWage.rates2026, TODAY, a) ?? s.minWage.headline, F.minWage), local: false }));
    const loc = s.localMinWages.filter((l) => l.from <= TODAY).map((l) => ({ label: l.name, rate: l.rate, local: true }));
    const r27 = mw2027(s.slug);
    return {
      slug: s.slug, name: s.name, abbr: s.abbr, mw: mwNow(s.slug), stateMw: s.minWage.headline, federal: s.minWage.federalApplies,
      areas: [...own, ...loc], r2027: r27?.rate ?? null, r2027From: r27?.from ?? null, jan: mwJan(s.slug),
      tipped: s.minWage.tipped.cashWage, tipCredit: s.minWage.tipped.tipCreditAllowed,
      ot: otRule(s.slug), otDailyBelow: s.slug === 'nevada' ? 1.5 * mwNow(s.slug) : null, exempt: s.overtime.exemptSalaryWeekly,
      sick: { mandatory: s.sickLeave.mandatory, perHours: s.sickLeave.accrualPerHours, cap: s.sickLeave.capHours, accrual: s.sickLeave.accrual },
      pfl: s.familyLeave.paidProgram ? { name: s.familyLeave.name ?? 'Paid family leave', weeks: s.familyLeave.maxWeeks ?? null, maxWeekly: s.familyLeave.maxWeeklyBenefit2026 ?? null } : null,
      final: { fired: s.finalPay.fired, firedDays: s.finalPay.firedDays, quit: s.finalPay.quit, quitNotice: s.finalPay.quitNotice, pto: s.finalPay.ptoPayout },
      breaks: { meal: s.breaks.meal, mealMinutes: s.breaks.mealMinutes, mealAfterHours: s.breaks.mealAfterHours, rest: s.breaks.rest, restMinutes: s.breaks.restMinutes, restPerHours: s.breaks.restPerHours, minorsOnly: s.breaks.minorsOnly },
      agency: s.agency,
    };
  });
}
