/**
 * What a page file needs to write figures without typing a single official number (RECETTE §17.4, point 7):
 * the state fact files, the federal parameters, the engines and the formatters.
 *   import { sd, mwNow, usdx } from '../../lib/kit';
 *   title: `Texas Minimum Wage 2026: ${usdx(mwNow('texas'))} and the Federal Rules`
 * Server side only (eager loader of the 51 state files): never import it from a component shipped to the browser.
 */
import P from '../data/params-2026.json';
import { STATE_LIST, stateRef, type StateRef } from '../data/states';
import type { StateData, Rate } from './state-types';
import { rateOn, earnings, raise } from './engine/wage';
import { overtime, type OtRule } from './engine/overtime';
import { fmla } from './engine/fmla';
import { schedule } from './engine/hours';
import { sickAccrual } from './engine/leave';
import { breaksForShift } from './engine/breaks';
import { garnishCap, severance } from './engine/money';
import { salaryTest } from './engine/exempt';
import { addDays } from './engine/dates';
import { usd, usdx, pct, num, day, listOf } from './fmt';

const mods = import.meta.glob<{ default: StateData }>('../data/states/*.json', { eager: true });
export const STATES: StateData[] = Object.values(mods).map((m) => m.default).sort((a, b) => a.name.localeCompare(b.name));
const need = <T>(x: T | undefined, what: string): T => { if (x === undefined) throw new Error(`No data: ${what}`); return x; };
export const sd = (slug: string): StateData => need(STATES.find((s) => s.slug === slug), `state ${slug}`);
export const st = (slug: string): StateRef => stateRef(slug);
export const states = STATE_LIST;
export { P };
export const F = P.federal;
export const FM = P.fmla;
export const ACA = P.aca;
export const TODAY = P.retrieved_at;

/* Minimum wage */
/** General rate in force on the check date (headline of the state file, never below the federal floor). */
export const mwNow = (slug: string) => Math.max(sd(slug).minWage.headline, F.minWage);
/** The state's own rate (can be below $7.25 in Georgia and Wyoming). */
export const mwState = (slug: string) => sd(slug).minWage.headline;
export const mwOn = (slug: string, date: string, area?: string) => rateOn(sd(slug).minWage.rates2026, date, area ?? sd(slug).minWage.headlineArea);
/** Rows of 2026 in date order. */
export const mw2026 = (slug: string): Rate[] => [...sd(slug).minWage.rates2026].sort((a, b) => a.from.localeCompare(b.from) || b.rate - a.rate);
/** Dated changes during 2026 after January 1 (July 1, September 30…). */
export const mwMidYear = (slug: string): Rate[] => mw2026(slug).filter((r) => r.from > '2026-01-01' && r.from <= '2026-12-31');
/** Rate on January 1, 2026 for the headline area (or the first row). */
export const mwJan = (slug: string) => { const s = sd(slug); return rateOn(s.minWage.rates2026, '2026-01-01', s.minWage.headlineArea) ?? rateOn(s.minWage.rates2026, '2026-01-01') ?? s.minWage.headline; };
/** Announced 2027 rate for the headline area, or null. */
export const mw2027 = (slug: string): Rate | null => { const s = sd(slug); const r = s.minWage.rates2027; return r.find((x) => x.area === s.minWage.headlineArea) ?? r[0] ?? null; };
export const mwRaise = (slug: string) => { const r = mw2027(slug); return r ? raise(mwNow(slug), r.rate) : null; };
export const fullTimeAt = (rate: number, hours = 40) => earnings(rate, hours);
export const tippedCash = (slug: string) => sd(slug).minWage.tipped.cashWage;
export const locals = (slug: string) => sd(slug).localMinWages;
/** States at the federal floor ($7.25 applies). */
export const atFederal = () => STATES.filter((s) => s.minWage.federalApplies || s.minWage.headline <= F.minWage);
export const highest = (n = 5) => [...STATES].sort((a, b) => b.minWage.headline - a.minWage.headline).slice(0, n);

/* Overtime */
/** Structured overtime rule of a state, read from its file. Nevada's daily rule only binds below 1.5 x the minimum wage. */
export function otRule(slug: string, rate?: number): OtRule {
  const o = sd(slug).overtime;
  const mm = o.doubleTime?.match(/(?:over|after|exceeding)\s+(\d+)|(\d+)\s+hours/);
  const dbl = mm ? Number(mm[1] ?? mm[2]) || null : null;
  let daily = o.dailyHours;
  if (slug === 'nevada' && rate != null && rate >= 1.5 * mwNow(slug)) daily = null;
  return { weekly: o.weeklyHours, daily, dailyDouble: dbl, seventhDay: slug === 'california' && !!o.seventhDay };
}
export const otCalc = (slug: string, rate: number, hoursPerDay: number, daysPerWeek: number) => overtime(otRule(slug, rate), { rate, hoursPerDay, daysPerWeek });
export const exemptLevel = (slug: string) => Math.max(F.exemptWeekly, sd(slug).overtime.exemptSalaryWeekly ?? 0);
export const exemptTest = (slug: string, weekly: number) => salaryTest(weekly, F.exemptWeekly, sd(slug).overtime.exemptSalaryWeekly);

/* Leave and hours */
export const fmlaCheck = (x: Parameters<typeof fmla>[1]) => fmla(FM, x);
export const hoursCheck = (h: number, weeks = 52) => schedule({ acaWeekly: ACA.fullTimeWeekly, acaMonthly: ACA.fullTimeMonthly, fmlaHours: FM.hours, otWeekly: F.otWeeklyHours }, h, weeks);
export const sickYear = (slug: string, hoursPerWeek: number, weeks = 52) => { const s = sd(slug).sickLeave; return sickAccrual(hoursPerWeek, weeks, s.mandatory ? s.accrualPerHours : null, s.capHours); };
export const pflStates = () => STATES.filter((s) => s.familyLeave.paidProgram);
export const sickStates = () => STATES.filter((s) => s.sickLeave.mandatory);
export const breakShift = (slug: string, h: number) => breaksForShift(sd(slug).breaks, h);
export const finalPayDate = (slug: string, lastDay: string) => { const d = sd(slug).finalPay.firedDays; return d == null ? null : addDays(lastDay, d); };
export const rtwStates = () => STATES.filter((s) => s.rightToWork);
export const garnish = (weekly: number) => garnishCap(weekly, F.minWage, F.garnishMultiple, F.garnishPct);
export const sev = severance;

export { usd, usdx, pct, num, day, listOf };
/** Rate with cents as the law writes it: $16.90, $7.25. */
export const rate$ = (n: number) => usd(n, 2);
/** "Alabama, Alaska and Arizona" from slugs. */
export const names = (xs: StateData[]) => listOf(xs.map((s) => s.name));

export const KIT = { STATES, sd, st, states, P, F, FM, ACA, TODAY, mwNow, mwState, mwOn, mw2026, mwMidYear, mwJan, mw2027, mwRaise, fullTimeAt, tippedCash, locals, atFederal, highest, otRule, otCalc, exemptLevel, exemptTest, fmlaCheck, hoursCheck, sickYear, pflStates, sickStates, breakShift, finalPayDate, rtwStates, garnish, sev, usd, usdx, pct, num, day, listOf, rate$, names };
export type Kit = typeof KIT;
