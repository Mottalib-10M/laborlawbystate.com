import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mwOn, mw2027, mwMidYear, otCalc, sickYear, fullTimeAt, rate$, usd, usdx, day, F } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('alaska');
const now = mwNow('alaska');
const jan = mwOn('alaska', '2026-01-01')!;
const next = mw2027('alaska')!;
const step = mwMidYear('alaska')[0];
const ex = S.overtime.exemptSalaryWeekly!;
const daily = S.overtime.dailyHours!;
const ak = otCalc('alaska', 20, 10, 4);
const fed = otCalc('texas', 20, 10, 4);
const sick = sickYear('alaska', 30);
const big = S.sickLeave.capHours!;

export default defineStatePage({
  slug: 'alaska',
  title: `Alaska Minimum Wage 2026: ${rate$(now)} Since July, Daily Overtime`,
  description: `Alaska pay rules for 2026: ${rate$(now)} an hour since July 1, ${rate$(next.rate)} in July 2027, overtime after ${daily} hours a day, and an exempt salary floor of ${usd(ex)} a week.`,
  intro: 'Alaska counts overtime by the day, gives tipped staff the full wage and raises its rate every summer instead of every January.',
  resume: `Alaska's minimum wage moved from ${rate$(jan)} to ${rate$(now)} an hour on ${day(step.from)} and is set to reach ${rate$(next.rate)} on ${day(next.from)}, steps written into law by Ballot Measure 1 of 2024. Tips can never count toward that rate, so servers and bartenders receive the full ${rate$(now)} before gratuities. Overtime is owed after ${daily} hours in a single day as well as after ${S.overtime.weeklyHours} in a week, at employers with four or more workers, which makes Alaska one of very few states with a daily clock. A salaried employee is exempt only when paid at least twice the state minimum wage for 40 hours, ${usdx(ex)} a week since July. The same ballot measure created paid sick leave: one hour for every 30 worked, with up to ${big} hours a year at employers with 15 or more staff. Fired workers must be paid within three working days.`,
  body: (h) => `
<h2>The ${daily}-hour day and what it adds to a paycheck</h2>
<p>In most of the country a 10-hour shift is paid at straight time as long as the week stays under 40 hours. Not in Alaska. Picture a cannery hand paid $20 an hour who works four 10-hour days. The week totals 40 hours, so federal law alone would pay ${usd(fed.total)}. Alaska treats the last two hours of each day as overtime, ${ak.otHours} hours in all, and the week comes to ${usd(ak.total)}, a difference of ${usd(ak.total - fed.total)}. The exception is narrow: an employer with three or fewer employees in total may pay straight time, and a voluntary flexible work plan approved by the Department of Labor and Workforce Development can allow 10-hour days without the daily premium. Comp time in place of overtime pay is not lawful for private employers.</p>
<h2>Raises that arrive on July 1</h2>
<p>Alaska is out of step with the January calendar used by most states. The ${rate$(now)} rate took effect in midsummer, and the next statutory step, ${rate$(next.rate)}, follows on ${day(next.from)}, after which the rate is adjusted for inflation each year. For a full-time worker the July 2026 raise is worth ${usd(fullTimeAt(now).annual - fullTimeAt(jan).annual)} over a year, and the 2027 step adds another ${usd(fullTimeAt(next.rate).annual - fullTimeAt(now).annual)}. Two groups sit outside the general rate: public school bus drivers, who must earn at least twice the minimum wage, and minors under 18 who work part time, 30 hours a week or less. Check your own hours here.</p>
${h.mini('raiseTimeline', stateArg('Alaska'))}
<h2>A salary floor tied to the hourly wage</h2>
<p>Because the exempt threshold is defined as two times the state minimum wage for the first 40 hours, it climbs with every raise. It stood at ${usdx(2 * jan * 40)} a week in the first half of 2026 and became ${usdx(ex)} in July, far above the federal ${usd(F.exemptWeekly)}. An assistant manager in Anchorage on ${usd(52000)} a year earns ${usd(52000 / 52)} a week, which is under the Alaska line, so that worker is owed time and a half for daily and weekly overtime whatever the job title says. ${h.a('salary-exempt-threshold', 'Salary thresholds in other states')} rarely move this often.</p>
<h2>Sick leave from the 2024 ballot</h2>
<p>Since ${day(S.sickLeave.effective!)}, every employer accrues paid sick leave for its staff at one hour per 30 hours worked. Someone on 30 hours a week builds about ${Math.floor(sick.accrued)} hours in a year. Businesses with 15 or more full-time equivalents must let workers accrue and use up to ${big} hours a year, smaller ones 40. Unused hours carry over unless the employer front-loads the full amount, and nothing has to be paid out when the job ends. Teenagers under 18 working fewer than 30 hours a week are outside the law.</p>
<h2>Ending a job, and the ticket home</h2>
<p>A dismissed employee must receive all money owed within three working days, weekends and holidays excluded. Someone who quits is paid by the next regular payday that falls at least three days after the notice. Vacation is owed only if a policy or contract promised it. One rule exists mainly in Alaska: when an employer paid or advanced your travel to a remote job, it must also pay the trip back when the work ends, apart from listed cases such as a firing for fighting or intoxication. Adults have no right to breaks under state law, while minors aged 14 to 17 must get 30 minutes after 5 consecutive hours. A wage complaint goes to the Wage and Hour Section, which decides the claim, and ${h.a('final-paycheck-laws', 'final paycheck rules elsewhere')} give useful comparisons.</p>`,
  faqs: [
    { q: 'What is the minimum wage in Alaska in 2027?', a: `It is scheduled to reach ${rate$(next.rate)} an hour on ${day(next.from)}, the last fixed step of Ballot Measure 1. Until then the rate is ${rate$(now)}, in force since ${day(step.from)}. After the 2027 step, the law adjusts the wage each year for inflation. Tipped employees receive the same rate, because Alaska allows no tip credit.` },
    { q: 'Do I get overtime in Alaska if I work 10 hours in one day?', a: `Yes, at most employers. Alaska requires time and a half for hours beyond ${daily} in a day and beyond ${S.overtime.weeklyHours} in a week, so a 10-hour shift includes 2 overtime hours even if the weekly total stays at 40. Employers with three or fewer employees may pay straight time, and an approved voluntary flexible work plan can allow 10-hour days.` },
    { q: 'How many sick days do Alaska workers get?', a: `Workers earn one hour of paid sick leave for every 30 hours worked. At employers with 15 or more employees, the cap on accrual and use is ${big} hours a year; at smaller businesses it is 40 hours. Leave carries over unless the employer front-loads it. Minors under 18 working less than 30 hours a week are exempt, and unused leave is not paid out at separation.` },
    { q: 'Does an AK employer have to pay my way home after a job ends?', a: 'Often yes. If the employer paid or advanced your transportation to the job, Alaska law requires it to pay the return trip, or provide transportation, to the place of hire or another agreed place when employment ends. Listed exceptions apply, such as being fired for fighting or intoxication. The Wage and Hour Section can tell you whether your situation fits one of them.' },
  ],
  related: ['state:washington', 'state:hawaii', 'state:oregon', 'overtime-laws-by-state', 'paid-sick-leave-by-state', 'minimum-wage-increases'],
});
