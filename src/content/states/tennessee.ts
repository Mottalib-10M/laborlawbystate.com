import { defineStatePage } from '../../lib/page-types';
import { mwNow, rate$, usd, usdx, day, F, FM, fullTimeAt, otCalc } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const mw = mwNow('tennessee');
const year = fullTimeAt(mw).annual;
const plus = (iso: string, n: number) => new Date(Date.parse(`${iso}T12:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
const lastDay = '2026-10-02';
const payday = '2026-10-09';
const cutoff = plus(lastDay, 21);
const ot = otCalc('tennessee', 16, 11, 4);

export default defineStatePage({
  slug: 'tennessee',
  title: `Tennessee Employment Law 2026: ${rate$(mw)}, Meal Break, Final Pay`,
  description: `Tennessee employment law in 2026: the federal ${rate$(mw)} wage, ${usd(year)} a year full time, a 30-minute break after 6 hours and final pay up to 21 days after you leave.`,
  intro: 'Tennessee has no wage or overtime statute of its own, yet it does guarantee a meal break and sets an unusually long final pay window.',
  resume: `Tennessee relies on federal law for pay rates: there is no state minimum wage, so covered employers pay the federal ${rate$(mw)} an hour, ${usd(year)} a year at full time, and the state refers overtime questions to the U.S. Department of Labor, which applies time and a half after ${F.otWeeklyHours} hours a week. Two state rules stand out. Every employee scheduled for six consecutive hours must receive a 30-minute unpaid meal or rest period, which cannot be placed before or during the first hour of work, unless the job naturally gives ample chances to rest. And final wages, whether you quit or are fired, are due on the next regular payday or within 21 days of leaving, whichever comes later, so the wait can reach three weeks. Unused vacation is paid only if a policy or labor agreement says so. The state has no paid sick leave mandate and no paid family leave insurance.`,
  body: (h) => `
<h2>A break rule in a state without wage rules</h2>
<p>Many states that leave the wage floor to Congress also have nothing to say about breaks. Tennessee is different. The Department of Labor and Workforce Development requires a 30-minute meal or rest period for any employee scheduled to work six consecutive hours. The break is unpaid, and the employer cannot schedule it before work starts or within the first hour, so a 30-minute stop at 9:15 on a shift that began at 9:00 does not satisfy the law. The exception covers workplaces where the nature of the business gives employees ample opportunity to rest or take breaks. If you are unsure whether your job qualifies, the written schedule is the starting point: the rule turns on hours scheduled, not hours actually worked.</p>
${h.mini('shiftBreaks', stateArg('Tennessee'))}
<h2>Final pay can take three weeks</h2>
<p>Tennessee measures the final paycheck deadline in two ways and gives the employer the later one: the next regular payday after you leave, or 21 days after the separation. Suppose your last day is ${day(lastDay)} and the next payday falls on ${day(payday)}. The 21-day mark is ${day(cutoff)}, so the employer may wait until then. If payday came after ${day(cutoff)}, that later date would apply. The rule is the same for a dismissal and a resignation. Vacation, sick days and other fringe benefits are paid at the end of employment only if the employer's policy or a labor agreement specifically requires it. ${h.a('pto-payout-laws', 'Vacation payout laws')} differ sharply from state to state.</p>
<h2>Pay rates and overtime follow federal law</h2>
<p>With no state minimum wage law, the federal ${rate$(mw)} applies to employers covered by the Fair Labor Standards Act, and tipped staff can be paid a cash wage of ${rate$(F.tippedCash)} if tips reach the minimum. Overtime is federal too. A nurse aide paid $16 an hour on four 11-hour shifts works 44 hours and earns ${usdx(ot.total)} for the week, with ${usdx(ot.otPay)} of that from the ${ot.otHours} hours above ${F.otWeeklyHours}. The length of a single shift does not matter, only the weekly total. Salaried employees must earn at least ${usd(F.exemptWeekly)} a week and meet a duties test to be exempt. ${h.a('time-and-a-half', 'Time and a half')} explains the regular rate.</p>
<h2>Leave and employment status</h2>
<p>Tennessee does not require private employers to provide paid sick days and runs no paid family leave program. The federal FMLA gives eligible employees up to ${FM.weeks} weeks of unpaid leave with job protection at employers with ${FM.employerEmployees} or more workers. Employment is at will: either side may end it at any time, but not for a reason the law forbids. For an unpaid final check, the state's Labor Standards Unit is the office that reviews wage complaints, and it decides each case on its facts.</p>`,
  faqs: [
    { q: 'Do Tennessee employers have to give a lunch break?', a: 'Yes, in most jobs. Tennessee requires a 30-minute unpaid meal or rest period for employees scheduled to work six consecutive hours, and it cannot be placed before or during the first hour of the shift. The exception is a workplace where the nature of the work gives ample chances to rest. The break can be unpaid when you are relieved of duty.' },
    { q: 'How long can a TN employer take to send my final paycheck?', a: 'Until the next regular payday or 21 days after you leave, whichever comes later. The same deadline applies if you quit or are fired. If your next payday is in three days, the employer still has up to 21 days. Unused vacation is included only if company policy or a labor agreement requires it. The Labor Standards Unit takes complaints about late final pay.' },
    { q: 'Is there a Tennessee state minimum wage?', a: `No. Tennessee has no minimum wage law, so employers covered by the Fair Labor Standards Act pay the federal ${rate$(mw)} an hour, and the state refers minimum wage questions to the U.S. Department of Labor. Tipped employees can receive ${rate$(F.tippedCash)} in cash if tips bring them to ${rate$(mw)}. A full-time job at the minimum pays ${usd(year)} a year before taxes.` },
  ],
  related: ['state:kentucky', 'state:georgia', 'state:alabama', 'state:mississippi', 'break-laws-by-state', 'final-paycheck-laws'],
});
