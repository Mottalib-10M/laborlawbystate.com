/** Engines checked on worked cases from the regulations and agency examples (RECETTE §17.4). */
import { describe, it, expect } from 'vitest';
import P from '../src/data/params-2026.json';
import { rateOn, earnings, tipTopUp } from '../src/lib/engine/wage';
import { overtime, FEDERAL_RULE, timeAndHalf } from '../src/lib/engine/overtime';
import { salaryTest } from '../src/lib/engine/exempt';
import { fmla } from '../src/lib/engine/fmla';
import { schedule } from '../src/lib/engine/hours';
import { sickAccrual, weeksToEarn } from '../src/lib/engine/leave';
import { breaksForShift } from '../src/lib/engine/breaks';
import { garnishCap, severance } from '../src/lib/engine/money';
import { addDays } from '../src/lib/engine/dates';

const CA = { weekly: 40, daily: 8, dailyDouble: 12, seventhDay: true };
describe('minimum wage', () => {
  const rows = [{ from: '2026-01-01', rate: 15.05, area: 'Standard' }, { from: '2026-07-01', rate: 15.55, area: 'Standard' }, { from: '2026-01-01', rate: 16.3, area: 'Portland metro' }];
  it('picks the rate in force on a date and area', () => {
    expect(rateOn(rows, '2026-03-01', 'Standard')).toBe(15.05);
    expect(rateOn(rows, '2026-07-01', 'Standard')).toBe(15.55);
    expect(rateOn(rows, '2026-10-11', 'Portland metro')).toBe(16.3);
    expect(rateOn(rows, '2025-12-31', 'Standard')).toBeNull();
  });
  it('full-time year at the federal minimum is $15,080', () => expect(earnings(P.federal.minWage, 40).annual).toBeCloseTo(15080, 6));
  it('tip credit: $2.13 cash + $3 tips owes $2.12 top-up federally', () => expect(tipTopUp(P.federal.tippedCash, 3, P.federal.minWage).topUp).toBeCloseTo(2.12, 6));
  it('federal tip credit is $5.12', () => expect(P.federal.minWage - P.federal.tippedCash).toBeCloseTo(P.federal.tipCredit, 6));
});
describe('overtime', () => {
  it('FLSA: 50 hours at $20 = 40 x 20 + 10 x 30 = $1,100', () => { const r = overtime(FEDERAL_RULE, { rate: 20, hoursPerDay: 10, daysPerWeek: 5 }); expect(r.total).toBe(1100); expect(r.otHours).toBe(10); });
  it('California: 5 days of 10 hours gives 10 daily OT hours, no weekly extra', () => { const r = overtime(CA, { rate: 20, hoursPerDay: 10, daysPerWeek: 5 }); expect(r.otHours).toBe(10); expect(r.regularHours).toBe(40); expect(r.total).toBe(1100); });
  it('California: 13-hour day gives 4 h at 1.5x and 1 h at 2x', () => { const r = overtime(CA, { rate: 10, hoursPerDay: 13, daysPerWeek: 1 }); expect(r.otHours).toBe(4); expect(r.doubleHours).toBe(1); expect(r.total).toBe(80 + 60 + 20); });
  it('California: 7 days of 8 hours, 7th day at 1.5x, weekly OT on day 6 hours above 40', () => { const r = overtime(CA, { rate: 10, hoursPerDay: 8, daysPerWeek: 7 }); expect(r.regularHours).toBe(40); expect(r.otHours).toBe(16); expect(r.doubleHours).toBe(0); });
  it('daily rule never pays less than the federal rule', () => { const r = overtime({ weekly: 48, daily: null, dailyDouble: null, seventhDay: false }, { rate: 12, hoursPerDay: 9, daysPerWeek: 5 }); expect(r.basis).toBe('federal'); expect(r.otHours).toBe(5); });
  it('time and a half of $18 is $27', () => expect(timeAndHalf(18)).toBe(27));
});
describe('exemption salary test', () => {
  it('federal $684 a week = $35,568 a year', () => expect(salaryTest(700, P.federal.exemptWeekly, null)).toMatchObject({ passes: true, annualLevel: 35568 }));
  it('a higher state level wins', () => expect(salaryTest(1000, P.federal.exemptWeekly, 1352)).toMatchObject({ passes: false, level: 1352, stateHigher: true }));
});
describe('FMLA', () => {
  const R = P.fmla;
  it('eligible at 1,250 hours, 12 months, 50 employees', () => expect(fmla(R, { publicEmployer: false, employerSize: 50, employeesWithin75: 50, monthsEmployed: 12, hours12m: 1250, weeksUsed: 4 })).toMatchObject({ eligible: true, left: 8 }));
  it('fails on hours and says by how much', () => expect(fmla(R, { publicEmployer: false, employerSize: 200, employeesWithin75: 200, monthsEmployed: 24, hours12m: 1000, weeksUsed: 0 })).toMatchObject({ eligible: false, hoursShort: 250 }));
  it('public employer of any size is covered, but the 50-within-75-miles test still applies', () => { const r = fmla(R, { publicEmployer: true, employerSize: 10, employeesWithin75: 10, monthsEmployed: 24, hours12m: 2000, weeksUsed: 0 }); expect(r.coveredEmployer).toBe(true); expect(r.eligible).toBe(false); });
  it('military caregiver leave is 26 weeks', () => expect(fmla(R, { publicEmployer: false, employerSize: 60, employeesWithin75: 60, monthsEmployed: 12, hours12m: 1300, weeksUsed: 0, caregiver: true }).entitlement).toBe(26));
});
describe('hours', () => {
  const R = { acaWeekly: P.aca.fullTimeWeekly, acaMonthly: P.aca.fullTimeMonthly, fmlaHours: P.fmla.hours, otWeekly: P.federal.otWeeklyHours };
  it('30 hours is ACA full time; 29 is not', () => { expect(schedule(R, 30).acaFullTime).toBe(true); expect(schedule(R, 29).acaFullTime).toBe(false); });
  it('24 hours a week reaches the FMLA hours test (1,248 < 1,250: no)', () => expect(schedule(R, 24).fmlaHours).toBe(false));
  it('25 hours a week does', () => expect(schedule(R, 25).fmlaHours).toBe(true));
});
describe('leave, breaks, money, dates', () => {
  it('1 hour per 30: 40 h x 52 = 69.3 h, capped at 40', () => { const r = sickAccrual(40, 52, 30, 40); expect(r.accrued).toBe(40); expect(r.capped).toBe(true); });
  it('no law, no accrual', () => expect(sickAccrual(40, 52, null, null).accrued).toBe(0));
  it('8 hours at 30 h a week takes 8 weeks at 1 per 30', () => expect(weeksToEarn(8, 30, 30)).toBe(8));
  const CAB = { mealMinutes: 30, mealAfterHours: 5, restMinutes: 10, restPerHours: 4 };
  it('California 8-hour shift: 1 meal, 2 rest breaks', () => expect(breaksForShift(CAB, 8)).toMatchObject({ meals: 1, rests: 2 }));
  it('6-hour shift: 1 rest (2 h left is not a major fraction); 6.5 h: 2', () => { expect(breaksForShift(CAB, 6).rests).toBe(1); expect(breaksForShift(CAB, 6.5).rests).toBe(2); });
  it('5-hour shift: no meal (must exceed 5)', () => expect(breaksForShift(CAB, 5).meals).toBe(0));
  it('CCPA: $217.50 a week is fully protected (Fact Sheet #30)', () => { const g = garnishCap(217.5, P.federal.minWage, P.federal.garnishMultiple, P.federal.garnishPct); expect(g.floor).toBeCloseTo(217.5, 6); expect(g.max).toBe(0); });
  it('CCPA: $1,000 a week, 25% = $250 is the cap', () => expect(garnishCap(1000, P.federal.minWage, 30, 25).max).toBe(250));
  it('CCPA: $250 a week, only $32.50 above the floor', () => expect(garnishCap(250, P.federal.minWage, 30, 25).max).toBeCloseTo(32.5, 6));
  it('severance: 2 weeks per year for 6 years at $1,000 a week', () => expect(severance(1000, 6, 2).amount).toBe(12000));
  it('adds calendar days across months', () => expect(addDays('2026-01-30', 3)).toBe('2026-02-02'));
});
