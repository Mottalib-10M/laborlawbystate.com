import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, tippedCash, sickYear, rate$, usd, usdx, day, fullTimeAt } from '../../lib/kit';
import { pflArg, stateArg } from '../../lib/mini-args';

const S = sd('maine');
const now = mwNow('maine');
const next = mw2027('maine')!;
const cash = tippedCash('maine')!;
const cash27 = Number(next.note!.match(/\$([\d.]+)/)![1]);
const port = S.localMinWages.find((l) => l.name === 'Portland')!;
const portCash = Number(port.note!.match(/\$([\d.]+)/)![1]);
const ex = S.overtime.exemptSalaryWeekly!;
const ex27 = Number(S.overtime.exemptSalaryNote!.match(/\$([\d,.]+)\/week/)![1].replace(/,/g, ''));
const sl = S.sickLeave;
const pfl = S.familyLeave;
const full = sickYear('maine', 40);
const part = sickYear('maine', 25);
const gain = fullTimeAt(next.rate).annual - fullTimeAt(now).annual;

export default defineStatePage({
  slug: 'maine',
  title: `Maine Labor Laws 2026: ${rate$(now)} Wage, Earned Paid Leave, PFML`,
  description: `Maine labor laws 2026: ${rate$(now)} minimum wage, ${rate$(next.rate)} from January 2027, ${rate$(port.rate)} in Portland, paid leave for any reason, PFML paying since May and vacation payout.`,
  intro: 'Paid time off that you can spend on a beach day, a family leave program that only began paying in May 2026, and a wage that climbs with prices every January.',
  resume: `Maine's minimum wage is ${rate$(now)} an hour in 2026 and rises with the cost of living to ${rate$(next.rate)} on ${day(next.from)}; Portland sets its own floor of ${rate$(port.rate)}. Tipped service employees may be paid a direct wage of ${rate$(cash)} as long as tips make up the rest. Overtime is time and a half after 40 hours a week, and a salaried employee needs at least ${usdx(ex)} a week, about ${usd(ex * 52)} a year, to be exempt, a state level that ignores the lower federal one. Employers with more than 10 workers owe ${sl.accrual}, up to ${sl.capHours} hours a year, and the time can be used for any reason. Maine Paid Family and Medical Leave started paying benefits on ${day(pfl.benefitsStart!)}, for up to ${pfl.maxWeeks} weeks a year. Unused vacation earned since 2023 is paid out at the end of the job.`,
  body: (h) => `
<h2>Earned Paid Leave: time off with no reason required</h2>
<p>Most state sick leave laws list the reasons an employee may use the hours: an illness, a doctor visit, a sick child. Maine's version, called Earned Paid Leave, lists none. Once earned, the time can go to a flu, a school play or a long weekend at Acadia, and the employer may ask for up to four weeks of notice only when the absence is planned. The rate is slower than in many states, one hour for every ${sl.accrualPerHours} hours worked, and the law covers employers with more than 10 employees in Maine for more than 120 days of the calendar year. A full-time worker on 40 hours a week accrues ${Math.floor(full.accrued)} hours over a year, but the law only requires ${full.capped} of them, so the balance stops at ${sl.capHours} unless the employer's policy is more generous. Someone on 25 hours a week earns about ${Math.floor(part.accrued)} hours. Unused hours carry over to the next year.</p>
${h.mini('sickAccrual', stateArg('Maine'))}
<h2>A family and medical leave program in its first year</h2>
<p>Premiums were collected first, at 0.5% of wages with up to half deducted from the paycheck, and benefits followed on ${day(pfl.benefitsStart!)}. The program covers your own serious health condition, bonding with a new child, care of a relative, a military family need and safe leave, up to ${pfl.maxWeeks} weeks combined in a benefit year. The weekly check is weighted toward lower earners: 90% of the part of your average weekly wage up to half the state average, then 66% of the part above, with a ceiling around ${usdx(pfl.maxWeeklyBenefit2026!)} a week. A worker earning well below the state average therefore gets back most of a normal paycheck. ${h.a('paid-family-leave-by-state', 'Other state programs')} pay for longer or shorter periods.</p>
${h.mini('pflState', pflArg('Maine'))}
<h2>Indexed raises, Portland and the tipped direct wage</h2>
<p>The state rate is recalculated every January 1 from the cost of living. The move from ${rate$(now)} to ${rate$(next.rate)} adds ${usd(gain)} to a 40-hour year, and the direct wage for tipped service employees goes from ${rate$(cash)} to ${rate$(cash27)} at the same time. Overtime for tipped staff is computed on the full minimum wage, not on the direct wage. Portland, which has its own ordinance, pays ${rate$(port.rate)} in 2026, with a direct wage of at least ${rate$(portCash)} for service employees. The salary floor for exempt executive, administrative and professional staff moves too, to ${usdx(ex27)} a week in 2027, and Maine law does not recognize the federal exemption for highly compensated employees.</p>
<h2>Leaving a Maine job</h2>
<p>Final wages are due no later than the next established payday, whether you quit or were let go. Since January 1, 2023, paid vacation accrued under the employer's policy must be paid at separation by employers with 11 or more employees, unless a collective bargaining agreement provides otherwise. Adults are entitled to the opportunity for a 30-minute break after 6 consecutive hours; it may be unpaid when you are fully relieved of duty. The Bureau of Labor Standards takes wage complaints and decides them; an employment lawyer can review a particular dispute.</p>`,
  faqs: [
    { q: 'Can I use Maine Earned Paid Leave for a vacation?', a: `Yes. Maine's Earned Paid Leave can be used for any reason, including a planned trip, not only illness. You accrue one hour for every ${sl.accrualPerHours} hours worked, up to ${sl.capHours} hours a year, at employers with more than 10 employees. For planned use the employer may require up to four weeks of notice. Unused hours roll into the next year rather than disappearing.` },
    { q: 'What will the Maine minimum wage be in 2027?', a: `It rises to ${rate$(next.rate)} an hour on ${day(next.from)}, from ${rate$(now)} in 2026, through the annual cost-of-living adjustment published by the Maine Department of Labor. The direct wage for tipped service employees rises to ${rate$(cash27)} on the same day. Portland sets its own rate by city ordinance, so workers there should check the city figure separately.` },
    { q: 'How much does Maine Paid Family and Medical Leave pay per week?', a: `It replaces 90% of your average weekly wage up to half of the state average weekly wage, plus 66% of any wages above that, up to a maximum of roughly ${usdx(pfl.maxWeeklyBenefit2026!)} a week. You can claim up to ${pfl.maxWeeks} weeks in a benefit year for your own health, a new child, a sick relative, a military need or safe leave.` },
    { q: 'Do Maine employers have to pay out unused vacation?', a: 'Yes, for vacation accrued on or after January 1, 2023, at employers with 11 or more employees. The balance is due with your final wages, no later than the next established payday after the job ends. Public employers are not covered, and a collective bargaining agreement can set different terms. If the money does not come, the Bureau of Labor Standards accepts a wage complaint.' },
  ],
  related: ['state:new-hampshire', 'state:vermont', 'state:massachusetts', 'paid-sick-leave-by-state', 'paid-family-leave-by-state', 'pto-payout-laws'],
});
