import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, rate$, usd, usdx } from '../../lib/kit';
import { pflArg, stateArg } from '../../lib/mini-args';

const S = sd('new-jersey');
const mw = mwNow('new-jersey');
const next = mw2027('new-jersey')!;
const row = (rows: typeof S.minWage.rates2026, k: string) => rows.find((r) => r.area.startsWith(k))!.rate;
const small = row(S.minWage.rates2026, 'Seasonal'), small27 = row(S.minWage.rates2027, 'Seasonal');
const farm = row(S.minWage.rates2026, 'Agricultural'), farm27 = row(S.minWage.rates2027, 'Agricultural');
const care = row(S.minWage.rates2026, 'Long-term'), care27 = row(S.minWage.rates2027, 'Long-term');
const tip = S.minWage.tipped.cashWage!, tip27 = row(S.minWage.rates2027, 'Cash wage');
const fl = S.familyLeave;
const max = fl.maxWeeklyBenefit2026!;
const share = Number(fl.replacement!.match(/(\d+)%/)![1]);
const mid = 1000, high = 1600;
const midBen = Math.min(max, (mid * share) / 100), highBen = Math.min(max, (high * share) / 100);
const sick = S.sickLeave;

export default defineStatePage({
  slug: 'new-jersey',
  title: `New Jersey Minimum Wage 2026: ${rate$(mw)}, Four Rates, FLI`,
  description: `New Jersey in 2026: ${rate$(mw)} for most jobs, ${rate$(next.rate)} in 2027, separate small, farm and care rates, Family Leave Insurance up to ${usdx(max)} a week, 40 sick hours.`,
  intro: 'One state, four minimum wage tracks that move every January, plus wage-replacement insurance for family care and 40 hours of sick time at every employer.',
  resume: `New Jersey's minimum wage for most employers is ${rate$(mw)} an hour in 2026, and an official notice filed in September sets it at ${rate$(next.rate)} on January 1, 2027. The state runs separate tracks: ${rate$(small)} for seasonal employers and those with fewer than 6 workers, ${rate$(farm)} on farms, and ${rate$(care)} for direct care staff in long-term care facilities. Tipped workers receive a cash wage of ${rate$(tip)}, rising to ${rate$(tip27)}, with tips lifting them to the full rate. Overtime is time and a half after ${S.overtime.weeklyHours} hours a week. Every employer, whatever its size, must let workers earn one hour of sick leave per ${sick.accrualPerHours} worked, up to ${sick.capHours} hours a year. Family Leave Insurance pays ${share}% of average weekly wages for up to ${fl.maxWeeks} weeks, capped at ${usdx(max)} a week in 2026. Final wages are due on the next regular payday, and adults have no state break rule.`,
  body: (h) => `
<h2>Four wage floors, one closing gap</h2>
<p>New Jersey sets four minimum wages, and each one changes on January 1. The general rate follows the CPI-W, which produced the ${rate$(next.rate)} figure for 2027. Small and seasonal employers were given a slower schedule and are now catching up: they pay ${rate$(mw - small)} less than the general rate in 2026, and only ${rate$(next.rate - small27)} less once ${rate$(small27)} takes effect in 2027. Farm employers move from ${rate$(farm)} to ${rate$(farm27)}. Direct care staff in long-term care facilities have the highest floor, ${rate$(care)} now and ${rate$(care27)} next year.</p>
<p>For a cashier at a five-person shop working 35 hours a week, the 2027 step from ${rate$(small)} to ${rate$(small27)} adds ${usd((small27 - small) * 35 * 52)} a year, more than a worker at a large employer gains from the general increase, ${usd((next.rate - mw) * 35 * 52)}. Which track applies is a question of who employs you, so check headcount and industry before comparing offers.</p>
${h.mini('raiseTimeline', stateArg('New Jersey'))}
<h2>Family Leave Insurance and its weekly cap</h2>
<p>Family Leave Insurance is the state's paid program for bonding with a new child or caring for a seriously ill relative; Temporary Disability Insurance covers your own illness or injury with the same ${usdx(max)} weekly maximum in 2026. Benefits run for ${fl.maxWeeks} consecutive weeks, or up to 56 days of intermittent leave, in a 12-month period. The benefit is ${share}% of your average weekly wage until the cap bites.</p>
<p>Two examples show where that happens. A worker averaging ${usd(mid)} a week receives ${usdx(midBen)} a week, or ${usd(midBen * fl.maxWeeks!)} over ${fl.maxWeeks} weeks. A colleague averaging ${usd(high)} a week also hits the ceiling and receives ${usdx(highBen)}, about ${Math.round((highBen / high) * 100)}% of pay. The program replaces income; job protection depends on separate leave laws, so ask your employer which ones cover you.</p>
${h.mini('pflState', pflArg('New Jersey'))}
<h2>Earned sick leave from the first employee</h2>
<p>New Jersey's earned sick leave law has no small-business exemption. Full-time, part-time and temporary employees accrue one hour per ${sick.accrualPerHours} worked, and an employer may instead front-load ${sick.capHours} hours at the start of the benefit year. Up to ${sick.capHours} unused hours carry over, but the employer may cap use at ${sick.capHours} a year. A part-timer on 25 hours a week accrues about ${Math.floor((25 * 52) / sick.accrualPerHours)} hours over a year, more than the ${sick.capHours}-hour yearly limit, so the cap is what counts.</p>
<h2>When the job ends</h2>
<p>Whether you quit, are laid off or are suspended, all wages are due by the regular payday for the pay period in which the job ended. No statute requires payout of unused vacation; it is owed when your contract or the employer's policy makes it a benefit of the job. Adults have no state meal or rest break requirement, while workers under 18 need a half-hour break after 5 consecutive hours. The Division of Wage and Hour Compliance handles wage complaints, and the ${h.a('pto-payout-laws', 'vacation payout comparison')} shows which states are stricter.</p>`,
  faqs: [
    { q: 'What will the New Jersey minimum wage be in 2027?', a: `${rate$(next.rate)} an hour for most employers from January 1, 2027, under the public notice filed on September 23, 2026. Seasonal employers and those with fewer than 6 employees move to ${rate$(small27)}, farm employers to ${rate$(farm27)}, and long-term care direct care staff to ${rate$(care27)}. The tipped cash wage rises to ${rate$(tip27)}.` },
    { q: 'How much does NJ Family Leave Insurance pay per week in 2026?', a: `${share}% of your average weekly wage, up to a maximum of ${usdx(max)} a week in 2026. You can collect for up to ${fl.maxWeeks} consecutive weeks or 56 intermittent days in a 12-month period to bond with a child or care for a family member. Your own illness falls under Temporary Disability Insurance, with the same weekly maximum.` },
    { q: 'Do part-time workers get sick leave in New Jersey?', a: `Yes. Employers of every size must give full-time, part-time and temporary employees one hour of earned sick leave for every ${sick.accrualPerHours} hours worked, up to ${sick.capHours} hours a year. Employers can front-load the ${sick.capHours} hours instead. Unused hours up to ${sick.capHours} carry into the next year, although use can be limited to ${sick.capHours} hours per benefit year.` },
    { q: 'Do New Jersey employers have to pay out unused vacation?', a: 'Only if the employment contract or the employer policy makes vacation pay a benefit you earn. No New Jersey statute requires payout on its own, but the wage law counts benefits arising from an employment contract as wages. Read the written policy; if it promises payout, the money is due with your final wages on the next regular payday.' },
  ],
  related: ['state:new-york', 'state:pennsylvania', 'state:delaware', 'paid-family-leave-by-state', 'paid-sick-leave-by-state', 'minimum-wage-increases'],
});
