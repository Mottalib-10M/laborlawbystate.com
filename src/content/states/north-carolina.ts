import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, otCalc, rate$, usd, F, FM, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('north-carolina');
const mw = mwNow('north-carolina');
const tip = S.minWage.tipped.cashWage!;
const year = fullTimeAt(mw).annual;
const ot = otCalc('north-carolina', 16, 9, 5);
const days = 7, rate = 19;
const balance = days * 8 * rate;

export default defineStatePage({
  slug: 'north-carolina',
  title: `North Carolina Labor Laws 2026: ${rate$(mw)} and Promised Pay`,
  description: `North Carolina in 2026: ${rate$(mw)} an hour (${usd(year)} a year full time), ${rate$(tip)} tipped cash wage, overtime after 40 hours, vacation lost only by written clause.`,
  intro: 'A state that mandates few benefits but holds employers to the ones they promise, starting with earned vacation.',
  resume: `North Carolina's minimum wage is ${rate$(mw)} an hour in 2026, the same as the federal rate, with no increase announced. Working 40 hours a week all year at that rate pays ${usd(year)} before taxes. Tipped employees may receive a cash wage of ${rate$(tip)} if they are told in advance, keep all their tips and end up with at least ${rate$(mw)} an hour. Non-exempt workers earn time and a half after ${S.overtime.weeklyHours} hours a week. The state does not require paid sick days, vacation or holidays, and adults aged 16 and over have no right to a meal or rest break. What sets North Carolina apart is the Wage and Hour Act's treatment of promised wage benefits: once an employer offers vacation, commissions or bonuses, earned amounts cannot be forfeited unless a written forfeiture clause was given to employees. Final wages are due on or before the next regular payday, for anyone leaving for any reason.`,
  body: (h) => `
<h2>What your employer promised is what you can claim</h2>
<p>The North Carolina Department of Labor puts it bluntly: an employer is not required by law to give vacation pay, sick leave, jury duty pay or holiday pay. The catch is on the other side. When a business chooses to offer those benefits, the Wage and Hour Act treats them as promised wages, and the employer has to pay them as its policy describes. Earned vacation is the case that comes up most. It must be paid when you leave unless the employer has a written forfeiture clause in its vacation policy and told employees about it in advance.</p>
<p>Consider a technician paid $${rate} an hour who leaves with ${days} unused vacation days of 8 hours. That balance is worth ${usd(balance)}. If the handbook says nothing about losing unused days, the amount is part of the last paycheck. If a written forfeiture clause was in place and communicated, the employer can keep it. Commissions and bonuses follow the same logic.</p>
${h.mini('ptoPayout', stateArg('North Carolina'))}
<h2>A federal-level wage with a tipped condition</h2>
<p>The state rate matches the federal ${rate$(F.minWage)}, so a raise would have to come from Congress or the General Assembly. Restaurants can count tips toward the wage, paying a cash wage of ${rate$(tip)}, but only if employees are notified in advance and keep all their tips; a server whose tips leave the hour below ${rate$(mw)} must be topped up. Agricultural and domestic workers are covered by the federal minimum wage rather than the state act.</p>
<h2>Overtime at 40 hours, 45 in seasonal amusement</h2>
<p>Overtime begins after ${S.overtime.weeklyHours} hours in a workweek at one and a half times the regular rate. A warehouse associate earning $16 who works five 9-hour days is owed 5 overtime hours, ${usd(ot.otPay)} on top of ${usd(ot.regularPay)} in straight time, ${usd(ot.total)} for the week. Seasonal amusement and recreation businesses reach overtime only after 45 hours. Exempt status depends on duties and on the federal salary test, as no state salary level exists.</p>
<h2>Breaks, school visits and the last paycheck</h2>
<p>Workers 16 and older have no legal right to a meal or rest break in North Carolina; only youths under 16 must get 30 minutes after 5 hours. When an employer does offer a short break, of less than 30 minutes, it generally has to be paid. Parents, guardians and anyone standing in for a parent of a school-age child are entitled to 4 hours of leave a year to take part in the child's school, unpaid unless the employer decides otherwise. For leave beyond that, the federal FMLA gives eligible workers up to ${FM.weeks} unpaid weeks.</p>
<p>Whether you quit or are let go, everything due must be paid on or before the next regular payday, earned vacation included when no forfeiture clause applies. The Wage and Hour Bureau investigates unpaid wages, and the ${h.a('final-paycheck-laws', 'final paycheck guide')} lists deadlines in every state.</p>`,
  faqs: [
    { q: 'Does North Carolina require employers to pay out vacation?', a: 'Not by default, but often in practice. No law forces an employer to offer vacation. If it does, earned vacation counts as a promised wage under the Wage and Hour Act and must be paid at separation unless the employer has a written forfeiture clause that employees were told about beforehand. Without such a clause, unused earned days belong in the final paycheck.' },
    { q: 'Are breaks required by law in NC for adults?', a: 'No. North Carolina requires breaks only for workers under 16, who must receive at least 30 minutes after 5 consecutive hours. Employees 16 and older have no legal right to a meal or rest period. If an employer chooses to give a break shorter than 30 minutes, such as a 15-minute rest break, that time generally has to be paid.' },
    { q: 'Can a North Carolina employer pay tipped workers less than minimum wage?', a: `Yes, down to a cash wage of ${rate$(tip)} an hour, but with conditions. Employees must be notified in advance, must keep all their tips, and tips plus the cash wage must reach at least ${rate$(mw)} an hour. If they do not, the employer pays the difference. Agricultural and domestic employees fall under the federal minimum wage rules instead.` },
    { q: 'How many hours of school leave do parents get in North Carolina?', a: 'Four hours per year. Employers must grant that leave to any employee who is a parent, guardian or person standing in for a parent of a school-age child, so they can attend or be involved at the school. The law does not require that the time be paid, so those hours can go unpaid unless your employer lets you use paid leave for them. A conference, a class event or volunteering at the school all fit the purpose.' },
  ],
  related: ['state:south-carolina', 'state:virginia', 'state:tennessee', 'state:georgia', 'pto-payout-laws', 'break-laws-by-state'],
});
