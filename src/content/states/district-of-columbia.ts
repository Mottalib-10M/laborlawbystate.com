import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mwOn, mwMidYear, tippedCash, sickYear, fullTimeAt, rate$, usd, usdx, day } from '../../lib/kit';
import { pflArg, stateArg } from '../../lib/mini-args';

const S = sd('district-of-columbia');
const now = mwNow('district-of-columbia');
const jan = mwOn('district-of-columbia', '2026-01-01')!;
const step = mwMidYear('district-of-columbia')[0];
const cash = tippedCash('district-of-columbia')!;
const fl = S.familyLeave;
const max = fl.maxWeeklyBenefit2026!;
const oldMax = Number(fl.medicalLeave!.match(/\$([\d,]+) before/)![1].replace(/,/g, ''));
const cutDate = '2026-10-01';
const nc = S.notes.find((n) => n.text.includes('non-compete'))!.text;
const ncPay = Number(nc.match(/less than \$([\d,]+)/)![1].replace(/,/g, ''));
const yearHours = 40 * 52;
const mid = sickYear('district-of-columbia', 40);
const large = Math.min(yearHours / 37, 7 * 8);
const small = Math.min(yearHours / 87, 3 * 8);

export default defineStatePage({
  slug: 'district-of-columbia',
  title: `District of Columbia Labor Law 2026: ${rate$(now)}, PFL Cut`,
  description: `DC labor rules for 2026: ${rate$(now)} an hour since July 1, a tipped wage of ${rate$(cash)}, family leave trimmed October 1 to a ${usd(max)} weekly cap, and sick leave by size.`,
  intro: 'Washington, DC raised its wage in July and then, three months later, shortened two kinds of paid family leave and lowered the benefit ceiling.',
  resume: `On ${day(cutDate)} the District of Columbia reduced its Paid Family Leave program: medical leave for your own condition dropped from 12 to 10 weeks, family caregiving leave from 12 to 6 weeks, and the maximum weekly benefit from ${usd(oldMax)} to ${usd(max)}, while parental leave stays at ${fl.maxWeeks} weeks. The program is paid for entirely by employers, with no deduction from your check. The minimum wage rose from ${rate$(jan)} to ${rate$(now)} on ${day(step.from)} for every employer regardless of size, an inflation adjustment the District makes each July. Tipped workers receive ${rate$(cash)}, which is 56 percent of the full wage under the amended Initiative 82 schedule. Overtime begins after ${S.overtime.weeklyHours} hours a week. Paid sick and safe leave depends on employer size, from 3 to 7 days a year, and a fired employee must be paid by the next working day.`,
  body: (h) => `
<h2>October 1, 2026: fewer weeks, a lower ceiling</h2>
<p>The FY2027 Budget Support Act rewrote DC Paid Family Leave with effect from ${day(cutDate)}. A worker recovering from surgery can now claim 10 weeks of medical leave instead of 12, and someone caring for a seriously ill parent or spouse can claim 6 weeks instead of 12. Parental leave keeps its ${fl.maxWeeks} weeks and prenatal leave its 2. The weekly benefit still follows a sliding scale that replaces up to 90 percent of wages for lower earners, but it now stops at ${usd(max)}.</p>
<p>What the change means in money: a higher earner taking the longest medical leave could previously receive 12 weeks at ${usd(oldMax)}, or ${usd(12 * oldMax)}. Under the new rules the most is 10 weeks at ${usd(max)}, ${usd(10 * max)}, a drop of ${usd(12 * oldMax - 10 * max)}. For family caregiving the gap is wider, because the weeks are halved. Workers whose leave started before the change should check with the DC Paid Family Leave office how their claim is handled.</p>
${h.mini('pflState', pflArg('District of Columbia'))}
<h2>A wage that moves every July</h2>
<p>The District indexes its minimum wage to the Washington-area consumer price index each July 1. The ${day(step.from)} increase took the rate to ${rate$(now)}, worth ${usd(fullTimeAt(now).annual - fullTimeAt(jan).annual)} a year to a full-time worker, and that rate stays in force until the next adjustment in July 2027. There is no smaller rate for small businesses. The tipped base wage is now set as 56 percent of the full minimum, so it rose to ${rate$(cash)} at the same time, and the employer must top up any hour in which tips fail to reach ${rate$(now)}. Government contractors covered by the Living Wage Act pay the same ${rate$(now)} this year. ${h.a('tipped-minimum-wage', 'Tipped wages in the states')} are mostly far lower.</p>
<h2>Sick and safe leave scaled to the employer</h2>
<p>The Accrued Sick and Safe Leave Act sets three tiers. At an employer with 100 or more workers, leave accrues at one hour per 37 worked, up to 7 days a year; at 25 to 99 workers, one hour per 43, up to 5 days; at 24 or fewer, one hour per 87, up to 3 days. A full-time employee working ${yearHours.toLocaleString('en-US')} hours a year therefore reaches about ${Math.floor(large)} hours at a large firm, ${Math.floor(mid.accrued)} at a mid-sized one and ${Math.floor(small)} at a small one. Leave can be used after 90 days of service, and it also covers safe leave for victims of stalking, domestic violence or sexual abuse.</p>
${h.mini('sickAccrual', stateArg('District of Columbia'))}
<h2>Overtime, non-competes and the final paycheck</h2>
<p>Hours past ${S.overtime.weeklyHours} in a workweek are paid at time and a half. DC also bans non-compete clauses for most of the workforce: since January 1, 2026 the ban protects anyone earning less than ${usd(ncPay)} a year, with a higher line for medical specialists. When a job ends by dismissal, wages are due by the following working day, or within 4 days for an employee who handled the employer's money. A worker who quits is paid by the next regular payday or within 7 days, whichever comes first. The Office of Wage-Hour at the Department of Employment Services investigates unpaid wages, and ${h.a('final-paycheck-laws', 'the final paycheck guide')} compares deadlines.</p>`,
  faqs: [
    { q: 'How did DC Paid Family Leave change on October 1, 2026?', a: `The FY2027 Budget Support Act cut medical leave from 12 to 10 weeks and family caregiving leave from 12 to 6 weeks, and it lowered the maximum weekly benefit from ${usd(oldMax)} to ${usd(max)}. Parental leave remains ${fl.maxWeeks} weeks and prenatal leave 2 weeks. The program is still funded by employers alone, with no deduction from workers' pay.` },
    { q: 'What is the minimum wage in the District of Columbia right now?', a: `${rate$(now)} an hour since ${day(step.from)}, up from ${rate$(jan)}, for every employer regardless of size. The District adjusts the rate each July 1 for inflation, so this figure applies until June 30, 2027. Tipped employees receive a base wage of ${rate$(cash)}, 56% of the full rate, and the employer must make up any shortfall.` },
    { q: 'How much paid sick leave do DC employers have to give?', a: 'It depends on size. Employers with 100 or more employees provide one hour per 37 hours worked, up to 7 days a year; those with 25 to 99 provide one hour per 43, up to 5 days; those with 24 or fewer provide one hour per 87, up to 3 days. Workers can use the leave after 90 days of service, including as safe leave.' },
    { q: 'When is my last paycheck due if I am fired in DC?', a: 'By the working day after the discharge. If you handled your employer\'s money, the employer has up to 4 days to settle the account. Someone who resigns must be paid by the next regular payday or within 7 days of quitting, whichever is earlier. The Department of Employment Services Office of Wage-Hour takes complaints about unpaid final wages.' },
  ],
  related: ['state:maryland', 'state:virginia', 'state:delaware', 'paid-family-leave-by-state', 'paid-sick-leave-by-state', 'tipped-minimum-wage'],
});
