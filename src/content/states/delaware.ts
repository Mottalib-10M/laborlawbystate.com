import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, tippedCash, fullTimeAt, rate$, usd, day, F, FM } from '../../lib/kit';
import { pflArg, stateArg } from '../../lib/mini-args';

const S = sd('delaware');
const now = mwNow('delaware');
const since = S.minWage.rates2026[0].from;
const cash = tippedCash('delaware')!;
const fl = S.familyLeave;
const max = fl.maxWeeklyBenefit2026!;
const share = Number(fl.replacement!.match(/^(\d+)%/)![1]) / 100;
const floor = Number(fl.replacement!.match(/minimum \$(\d+)/)![1]);
const elig = S.notes.find((n) => n.text.includes('claims opened'))!.text;
const hours = Number(elig.match(/12 months and ([\d,]+) hours/)![1].replace(/,/g, ''));
const lowPay = 700, highPay = 1400;
const lowB = Math.min(max, Math.max(floor, share * lowPay));
const highB = Math.min(max, Math.max(floor, share * highPay));
const capAt = max / share;
const br = S.breaks;

export default defineStatePage({
  slug: 'delaware',
  title: `Delaware Labor Laws 2026: New Paid Leave, ${rate$(now)} Wage`,
  description: `Delaware in 2026: Paid Leave benefits began January 1 at 80% of wages up to ${usd(max)} a week, a ${rate$(now)} minimum wage (${usd(fullTimeAt(now).annual)} a year), ${rate$(cash)} for tipped staff.`,
  intro: 'Delaware switched on a paid family and medical leave insurance program in January 2026, which makes this the first year its workers can draw benefits.',
  resume: `The biggest change for Delaware workers in 2026 is Delaware Paid Leave, whose benefits became payable on ${day(fl.benefitsStart!)}. An eligible employee, meaning one with at least 12 months and ${hours.toLocaleString('en-US')} hours at the same employer, can receive 80 percent of average weekly wages, between ${usd(floor)} and ${usd(max)} a week, for up to ${fl.maxWeeks} weeks a year across all reasons. Parental leave can use all ${fl.maxWeeks} weeks, while your own serious health condition and care for a relative are each limited to 6 weeks every 24 months. The minimum wage is ${rate$(now)} an hour, the rate in force since ${day(since)}, and tipped staff can be paid a cash wage of ${rate$(cash)} if tips bring them to that level. Employees who work seven and a half consecutive hours get an unpaid 30-minute meal break. Final wages, whether you quit or are let go, are due on the later of the next payday or three business days after your last day.`,
  body: (h) => `
<h2>The first year of Delaware Paid Leave</h2>
<p>The Healthy Delaware Families Act created a state insurance program, and January 2026 was the moment claims opened. It covers four situations: bonding with a new child, care for a family member with a serious health condition, your own serious health condition, and certain military needs of a family member. The weekly benefit is 80 percent of what you earned on average over the prior 12 months, with a floor of ${usd(floor)} and a ceiling of ${usd(max)}. The ceiling stays at ${usd(max)} in 2026 and 2027; after that the law indexes it to consumer prices in the Philadelphia area.</p>
<p>Two examples show where the ceiling bites. A cashier averaging ${usd(lowPay)} a week would receive ${usd(lowB)} a week. A project engineer averaging ${usd(highPay)} reaches 80 percent at ${usd(share * highPay)}, which the cap cuts to ${usd(highB)}. Anyone earning more than ${usd(capAt)} a week therefore gets the flat maximum. Over a full ${fl.maxWeeks}-week parental leave, the maximum adds up to ${usd(max * fl.maxWeeks)}.</p>
${h.mini('pflState', pflArg('Delaware'))}
<h2>Who qualifies, and how the weeks are split</h2>
<p>Eligibility is tied to one employer: a year of employment and ${hours.toLocaleString('en-US')} hours worked there. The test resembles the federal FMLA, which uses ${FM.hours.toLocaleString('en-US')} hours too, but Delaware Paid Leave pays benefits, which the FMLA never does. The annual total is ${fl.maxWeeks} weeks combined. Parental leave can use the whole amount in a year, while medical leave for yourself and family caregiving are each capped at 6 weeks in any 24-month period. A worker who needs surgery and later cares for a parent may find that the two caps, not the ${fl.maxWeeks}-week total, set the limit. ${h.a('paid-family-leave-by-state', 'Paid family leave in other states')} compares the programs.</p>
<h2>Wage, tips and hours</h2>
<p>Section 902 of Title 19 sets Delaware's minimum wage at ${rate$(now)} an hour effective ${day(since)}. A full-time year at that rate is ${usd(fullTimeAt(now).annual)}. For tipped jobs, the employer may pay ${rate$(cash)} an hour to staff who regularly receive more than $30 a month in tips, but the cash wage plus tips must reach ${rate$(now)} for each hour. Weekly overtime for covered employees is set by the federal rule of time and a half after ${F.otWeeklyHours} hours, with the federal exempt salary of ${usd(F.exemptWeekly)} a week.</p>
${h.mini('tipTopUp', stateArg('Delaware'))}
<h2>Meals and the last paycheck</h2>
<p>The meal break is ${br.mealMinutes} consecutive unpaid minutes for anyone working ${br.mealAfterHours} or more consecutive hours, taken after the first 2 hours of work and before the last 2. Delaware is unusual in using one rule for every kind of departure: whether an employee quits, resigns, is discharged, suspended or laid off, wages are due on the later of the next regular payday or three business days after the last day worked. Vacation and other wage supplements are owed only as an agreement or policy provides. The Office of Wage and Hour in the Division of Industrial Affairs takes complaints and rules on each one.</p>`,
  faqs: [
    { q: 'When did Delaware Paid Leave start paying benefits?', a: `Benefits became available on ${day(fl.benefitsStart!)}. Eligible employees receive 80% of their average weekly wages, with a minimum of ${usd(floor)} and a maximum of ${usd(max)} a week, for up to ${fl.maxWeeks} weeks a year in total. To qualify you need at least 12 months of employment and ${hours.toLocaleString('en-US')} hours worked with the same employer. The ${usd(max)} cap holds through 2027.` },
    { q: 'How many weeks of medical leave can I take under Delaware Paid Leave?', a: `For your own serious health condition, up to 6 weeks every 24 months. Family caregiving has the same 6-week limit, and parental leave allows up to ${fl.maxWeeks} weeks a year. All reasons together cannot exceed ${fl.maxWeeks} weeks in a year. The benefit replaces 80% of average weekly wages up to ${usd(max)}, and the Delaware Department of Labor processes the claims.` },
    { q: 'How soon do I get my final paycheck if I quit in Delaware?', a: 'Delaware uses the same deadline for quitting and for being fired, suspended or laid off: your wages are due on the later of the next date they would normally be paid or three business days after your last day worked. Vacation is included only if your employer agreed to pay it under a policy or contract, so the written policy decides that part.' },
    { q: 'What is the tipped minimum wage in DE?', a: `Employers may pay a cash wage of ${rate$(cash)} an hour to employees who customarily receive more than $30 a month in tips. Tips must bring total earnings to at least ${rate$(now)} an hour, and the employer must cover any shortfall. A worker whose tips are low in a given week is still owed the full minimum for each hour.` },
  ],
  related: ['state:maryland', 'state:new-jersey', 'state:pennsylvania', 'paid-family-leave-by-state', 'final-paycheck-laws', 'fmla-eligibility'],
});
