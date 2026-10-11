import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, usdx, F, FM, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('north-dakota');
const mw = mwNow('north-dakota');
const tip = S.minWage.tipped.cashWage!;
const credit = mw - tip;
const hrs = 30, tips = 60;
const owed = mw * hrs, cash = tip * hrs;
const topUp = Math.max(0, owed - cash - tips);
const year = fullTimeAt(mw).annual;
const br = S.breaks;
const pto = 64 * 22;

export default defineStatePage({
  slug: 'north-dakota',
  title: `North Dakota Labor Laws 2026: ${rate$(mw)}, PTO Paid Out by Law`,
  description: `North Dakota in 2026: ${rate$(mw)} minimum wage, ${rate$(tip)} tipped cash wage, unused PTO paid at separation, final checks sent by certified mail, and no comp time.`,
  intro: 'A federal-level wage, paired with unusually firm rules on paid time off and on how a dismissed worker receives the last check.',
  resume: `North Dakota's minimum wage is ${rate$(mw)} an hour in 2026, unchanged since August 2015, and no increase is scheduled. Full-time work at that rate grosses ${usd(year)} a year. Employers may take a tip credit, paying tipped staff ${rate$(tip)} an hour provided tips bring them to ${rate$(mw)}. Overtime is due at time and a half after ${S.overtime.weeklyHours} hours a week, and private employers cannot substitute compensatory time off for non-exempt workers. The rule that sets North Dakota apart concerns paid time off: once PTO has been made available to use, the unused balance counts as wages at separation, and no contract or policy may make it forfeit, apart from narrow exceptions. A worker who is fired must be paid by the next regular payday, by certified mail to an address the worker designates unless both sides agree otherwise. Shifts over ${br.mealAfterHours} hours carry a ${br.mealMinutes}-minute meal period when two or more employees are on duty.`,
  body: (h) => `
<h2>Paid time off that cannot be taken back</h2>
<p>Most states let the employer's handbook decide what happens to unused vacation. North Dakota's labor department treats it as earned pay: once PTO is available for an employee to use, whatever is left at separation must be paid, and a policy that says otherwise is not enforceable. The exceptions are narrow. An employer may withhold the balance from someone who quits with less than a year of service and gives less than five days' notice, but only if that rule was given in writing at hire. Time that was awarded but not yet earned can also be withheld. A use-it-or-lose-it policy is allowed if employees are told about it, which means days can expire during employment while a balance still on the books at the end must be paid.</p>
<p>In numbers: an office manager paid $22 an hour leaves with 64 hours of available PTO. The balance is worth ${usd(pto)}, due with the final wages whether she resigned or was let go, unless one of those exceptions applies.</p>
${h.mini('ptoPayout', stateArg('North Dakota'))}
<h2>The final check by certified mail</h2>
<p>When the employer ends the job, the last wages are due on the regular payday for the period worked, and they must be sent by certified mail to an address the employee designates, unless the two sides agree on another method. A worker who quits is also paid on the next regular payday. Giving the employer a mailing address in writing on the way out avoids delay. The Wage and Hour Division of the Department of Labor and Human Rights takes claims for unpaid wages.</p>
<h2>Tip credit and overtime</h2>
<p>North Dakota allows a tip credit equal to 33 percent of the minimum wage, ${rate$(credit)} an hour, for employees who receive more than $30 a month in tips. Take a server working ${hrs} hours who collects ${usd(tips)} in tips that week. The cash wage pays ${usdx(cash)}, and with tips the total must reach ${usdx(owed)}; the employer owes ${usdx(topUp)} more to close the gap. Sub-minimum wages for other workers require a license from the department.</p>
<p>Hours past ${S.overtime.weeklyHours} in a workweek are paid at one and a half times the regular rate, and a private employer cannot offer comp time instead. The salary test for exempt staff is the federal ${usd(F.exemptWeekly)} a week.</p>
${h.mini('tipTopUp', stateArg('North Dakota'))}
<h2>Meal periods, unions and leave</h2>
<p>The meal period rule is conditional: a shift exceeding ${br.mealAfterHours} hours brings a ${br.mealMinutes}-minute break only when at least two employees are on duty, and the employee may waive it. North Dakota is a right-to-work state, so union membership or nonmembership cannot cost anyone a job. There is no state paid sick leave or paid family leave program; the federal FMLA covers eligible workers for up to ${FM.weeks} unpaid weeks. ${h.a('right-to-work-states', 'Right-to-work states')} are compared in a separate guide.</p>`,
  faqs: [
    { q: 'Does North Dakota require payout of unused PTO?', a: 'Yes. Once paid time off has been made available to use, the unused portion is treated as wages and must be paid at separation, and no policy can make it forfeit. Exceptions: a worker who quits with under one year of service and less than five days of notice, if told in writing at hire, and time awarded but not yet earned.' },
    { q: 'How is a final paycheck delivered in ND after a firing?', a: 'By certified mail to an address the employee designates, unless the employer and employee agree on another method. The wages are due on the regular payday for the period worked. Employees who quit are also paid on the next regular payday. If wages do not arrive, the Wage and Hour Division of the Department of Labor and Human Rights takes claims.' },
    { q: 'What is the tipped minimum wage in North Dakota?', a: `${rate$(tip)} an hour in 2026. North Dakota allows a tip credit of 33 percent of the ${rate$(mw)} minimum wage for employees who receive more than $30 a month in tips. If cash wage and tips together fall below ${rate$(mw)} for the hours worked, the employer must make up the difference.` },
    { q: 'Do I get a lunch break in North Dakota on a 6-hour shift?', a: `Usually yes. North Dakota requires a ${br.mealMinutes}-minute meal period on shifts exceeding ${br.mealAfterHours} hours, but only when two or more employees are on duty, and the employee can waive it. Someone working alone has no state right to a meal break. Short rest breaks are not required by state law for adults.` },
  ],
  related: ['state:minnesota', 'state:south-dakota', 'state:montana', 'pto-payout-laws', 'final-paycheck-laws', 'tipped-minimum-wage'],
});
