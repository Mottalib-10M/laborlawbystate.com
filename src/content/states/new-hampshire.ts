import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, day, F, FM, fullTimeAt, otCalc } from '../../lib/kit';
import { pflArg, stateArg } from '../../lib/mini-args';

const S = sd('new-hampshire');
const mw = mwNow('new-hampshire');
const fl = S.familyLeave;
const share = Number(fl.replacement!.match(/(\d+)%/)![1]);
const weekly = 1100;
const benefit = (weekly * share) / 100;
const year = fullTimeAt(mw).annual;
const ot = otCalc('new-hampshire', 21, 9, 5);
const br = S.breaks;

export default defineStatePage({
  slug: 'new-hampshire',
  title: `New Hampshire Labor Laws 2026: ${rate$(mw)} Wage, Voluntary PFML`,
  description: `New Hampshire in 2026: ${rate$(mw)} minimum wage tied to the federal rate, a voluntary paid leave plan of ${fl.maxWeeks} weeks at ${share}%, a lunch break after ${br.mealAfterHours} hours, pay in 72 hours.`,
  intro: 'No state rate above the federal floor, but a paid family and medical leave plan that employers and workers can choose to buy.',
  resume: `New Hampshire's minimum wage is ${rate$(mw)} an hour in 2026 because state law simply points to the federal figure, and no change is scheduled. A 40-hour job at that rate pays ${usd(year)} a year. Tipped restaurant and hotel staff who receive more than $30 a month in tips may be paid a base of 45 percent of the minimum, with tips covering the rest. Overtime is time and a half after ${S.overtime.weeklyHours} hours a week. The state's distinctive program is NH Paid Family and Medical Leave, a voluntary insurance plan: when an employer offers it, or a worker buys the individual policy, it replaces ${share}% of average weekly wages for up to ${fl.maxWeeks} weeks a year. There is no paid sick leave law. Adults get a ${br.mealMinutes}-minute eating period after ${br.mealAfterHours} consecutive hours, a fired worker is owed final wages within 72 hours, and a worker called in must be paid for at least 2 hours.`,
  body: (h) => `
<h2>Paid leave you opt into</h2>
<p>NH PFML, the nation's first voluntary paid family and medical leave plan, is insurance rather than a mandate: coverage exists only if your employer buys a group plan or you buy an individual plan yourself, and state law caps the individual premium at $5 a week. Benefits have been payable since ${day(fl.benefitsStart!)}. A covered worker receives ${share}% of average weekly wages, up to the Social Security wage cap, for up to ${fl.maxWeeks} weeks a year, and the same policy covers family care and the worker's own health condition. Some employer group plans offer 12 weeks.</p>
<p>The math is simple. Someone averaging ${usd(weekly)} a week would receive about ${usd(benefit)} a week, or ${usd(benefit * fl.maxWeeks!)} over the full ${fl.maxWeeks} weeks. Without coverage, the only leave guarantee is the unpaid federal FMLA, which requires ${FM.hours.toLocaleString('en-US')} hours of work in the past year at an employer with ${FM.employerEmployees} or more employees within ${FM.radiusMiles} miles. Ask HR whether a group plan exists before you need it, since a policy has to be in place first.</p>
${h.mini('pflState', pflArg('New Hampshire'))}
<h2>The federal floor and the tipped base</h2>
<p>New Hampshire has no number of its own in its wage statute: it requires the rate in the federal law, currently ${rate$(F.minWage)}. Only a federal increase would change it. For tipped employees of restaurants, hotels, motels, inns and cabins, the base is 45 percent of that minimum, paid to workers who receive more than $30 a month in tips. Household, domestic and farm workers, outside sales staff, summer camps for minors, newspaper carriers and golf caddies are among the groups outside the state wage law.</p>
<h2>Overtime and the meal period</h2>
<p>The state overtime rule mirrors the federal one, time and a half beyond ${S.overtime.weeklyHours} hours, and it applies when the FLSA does not, with an exception for seasonal businesses operating fewer than six months a year. A line cook earning $21 who works five 9-hour shifts has 5 overtime hours and a gross week of ${usd(ot.total)}.</p>
<p>An employer cannot require more than ${br.mealAfterHours} consecutive hours without a ${br.mealMinutes}-minute lunch or eating period. If the job makes a break impossible, the worker must be paid while eating on the job. Short rest breaks are not required by the state, so a coffee break on an 8-hour shift is a matter of policy.</p>
${h.mini('shiftBreaks', stateArg('New Hampshire'))}
<h2>Leaving or being let go</h2>
<p>A fired employee must be paid within 72 hours. Someone who resigns is paid by the next regular payday, or within 72 hours if they gave one pay period of notice. Employers must state in writing, at hire, the rate of pay and every policy on fringe benefits, so the vacation policy you received on day one is the document to reread before your last week. The Inspection Division of the Department of Labor takes wage claims. A worker who reports at the employer's request is owed at least 2 hours of pay, even if the work runs shorter. ${h.a('final-paycheck-laws', 'Final paycheck deadlines in other states')} range from the same day to the next payday.</p>`,
  faqs: [
    { q: 'Is New Hampshire paid family leave mandatory for employers?', a: `No. NH Paid Family and Medical Leave is voluntary. An employer may buy a group plan for its staff, and a worker whose employer does not may buy an individual plan, capped by law at $5 a week. A covered worker receives ${share}% of average weekly wages for up to ${fl.maxWeeks} weeks a year for family care or their own health condition.` },
    { q: 'What is the minimum wage in New Hampshire in 2026?', a: `${rate$(mw)} an hour. New Hampshire law requires the federal minimum wage rather than setting its own figure, so the rate changes only if Congress raises the federal one. Tipped workers in restaurants and lodging who earn more than $30 a month in tips can be paid a base of 45 percent of the minimum, with tips making up the rest.` },
    { q: 'How long can I work without a break in NH?', a: `Five consecutive hours. After that, an employer must give a ${br.mealMinutes}-minute lunch or eating period. If the work makes it impossible to stop, you must be paid while you eat and keep working. New Hampshire does not require shorter paid rest breaks for adults, so coffee breaks depend on the employer's policy.` },
    { q: 'When is the final paycheck due if fired in New Hampshire?', a: 'Within 72 hours of the termination. If you quit, wages are due by the next regular payday, but if you gave at least one pay period of notice, the employer must pay everything within 72 hours. Unpaid amounts can be claimed with the Inspection Division of the New Hampshire Department of Labor.' },
  ],
  related: ['state:vermont', 'state:maine', 'state:massachusetts', 'paid-family-leave-by-state', 'break-laws-by-state'],
});
