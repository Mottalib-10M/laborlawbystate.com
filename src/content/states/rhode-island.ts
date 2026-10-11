import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, rate$, usd, usdx, day, F, fullTimeAt, sickYear, tippedCash } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('rhode-island');
const mw = mwNow('rhode-island');
const next = mw2027('rhode-island')!;
const gain = fullTimeAt(next.rate).annual - fullTimeAt(mw).annual;
const cash = tippedCash('rhode-island')!;
const tci = S.familyLeave;
const sick = sickYear('rhode-island', 30);
const sunRate = 22;
const sunHours = 8;
const sunPremium = sunRate * 0.5 * sunHours;

export default defineStatePage({
  slug: 'rhode-island',
  title: `Rhode Island Labor Laws 2026: ${rate$(mw)} Wage and Sunday Pay`,
  description: `Rhode Island in 2026: ${rate$(mw)} an hour, ${rate$(next.rate)} from ${day(next.from)}, time and a half on Sundays and holidays, and ${tci.maxWeeks} weeks of paid TCI at up to ${usd(tci.maxWeeklyBenefit2026!)} a week.`,
  intro: 'Rhode Island still pays a premium for Sunday and holiday work, insures caregivers through payroll and has a raise locked in for 2027.',
  resume: `Rhode Island's minimum wage is ${rate$(mw)} an hour in 2026 and rises to ${rate$(next.rate)} on ${day(next.from)}, a step written into state law, which adds ${usd(gain)} a year to a full-time paycheck. The feature most visitors do not expect is the Sunday and holiday rule: in most businesses, work on those days is paid at time and a half, separately from overtime after ${S.overtime.weeklyHours} hours a week. Tipped staff may be paid ${rate$(cash)} in cash as long as tips bring them to the full minimum. Workers earn one hour of sick and safe leave per ${S.sickLeave.accrualPerHours} worked, up to ${S.sickLeave.capHours} hours a year, paid at employers with 18 or more employees. Temporary Caregiver Insurance pays up to ${tci.maxWeeks} weeks to bond with a child or care for a relative, with a maximum of ${usdx(tci.maxWeeklyBenefit2026!)} a week for claims starting on or after July 1, 2026. Accrued vacation must be paid out after one year on the job.`,
  body: (h) => `
<h2>Sundays and holidays pay more</h2>
<p>Rhode Island adds a pay rule tied to the calendar: the Department of Labor and Training (DLT) says employees must be paid at least one and a half times their normal rate for work on Sundays and holidays, with exceptions for some industries. That premium is a separate rule from weekly overtime. In retail, the Sunday and holiday premium hours are left out when counting the ${S.overtime.weeklyHours} hours that trigger overtime, so the same hour is not paid at a premium twice.</p>
<p>Take a store clerk paid $${sunRate} an hour who works an ${sunHours}-hour Sunday shift. The base pay for the day is ${usd(sunRate * sunHours)}, and the Sunday rule adds ${usd(sunPremium)} on top, whatever the length of the week. If your pay stub shows a plain rate for Sunday hours, DLT's Labor Standards Unit is the office that reviews wage complaints; it decides each one on its own facts.</p>
<h2>A dated raise for 2027</h2>
<p>Unlike states that index wages to inflation, Rhode Island sets each step in its statute. The ${rate$(next.rate)} rate for ${day(next.from)} is already law, so a full-time worker at the minimum moves from ${usd(fullTimeAt(mw).annual)} to ${usd(fullTimeAt(next.rate).annual)} a year. Some groups have a reduced rate: full-time students under 19 at nonprofit, religious or community organizations at 90% of the minimum, and 14- and 15-year-olds working 24 hours a week or less at 75%. The tip credit can reach ${rate$(mw - cash)} an hour in 2026.</p>
${h.mini('raiseTimeline', stateArg('Rhode Island'))}
<h2>Caregiver pay, disability pay and sick hours</h2>
<p>Rhode Island funds two linked insurance programs through payroll. Temporary Caregiver Insurance (TCI) covers up to ${tci.maxWeeks} weeks to bond with a new child or care for a seriously ill relative, with a weekly benefit based on your earnings, a floor of $148 and a dependency allowance for up to five dependents. Since January 1, 2026 it also covers bone marrow donors for one week and organ donors for thirty business days. Temporary Disability Insurance (TDI) handles your own illness or injury for up to 30 weeks, and TCI weeks reduce that total. The state Parental and Family Medical Leave Act adds 13 weeks of unpaid job protection at employers with 50 or more workers, after 12 months of service.</p>
<p>Sick and safe leave builds more slowly here than in many states, at one hour per ${S.sickLeave.accrualPerHours}. A part-timer on 30 hours a week earns about ${Math.round(sick.accrued)} hours over a year, ${sick.capped ? 'hitting' : 'just under'} the ${S.sickLeave.capHours}-hour cap. ${h.a('paid-sick-leave-by-state', 'Sick leave rules by state')} compare the accrual rates.</p>
<h2>Meals and the final paycheck</h2>
<p>Rhode Island ties the meal break to shift length: a 20-minute mealtime for a six-hour shift and 30 minutes for an eight-hour shift, unpaid, except in licensed health care facilities or where fewer than three employees are on site. Final wages are due on the next regular payday whatever the reason for leaving, and within 24 hours if the business is sold, merged, liquidated or moves out of state. Vacation earned and unused must be paid once you have worked there for a year.</p>`,
  faqs: [
    { q: 'Do I get time and a half for working Sundays in Rhode Island?', a: `In most businesses, yes. Rhode Island requires at least one and a half times the normal rate for work on Sundays and holidays, apart from weekly overtime, with exceptions for some industries. In retail, those premium hours are not counted again toward the ${S.overtime.weeklyHours}-hour overtime threshold. The Department of Labor and Training lists the exceptions and takes complaints.` },
    { q: `When does the Rhode Island minimum wage go up to ${rate$(next.rate)}?`, a: `On ${day(next.from)}. The increase from ${rate$(mw)} to ${rate$(next.rate)} an hour is written into the state minimum wage statute, so it does not depend on an inflation figure or a later announcement. For a full-time employee that is ${usd(gain)} more a year before taxes. The tipped cash wage and reduced rates for students and young teens are separate figures.` },
    { q: 'How much does RI Temporary Caregiver Insurance pay per week?', a: `For claims with a benefit year starting on or after July 1, 2026, the maximum weekly benefit is ${usdx(tci.maxWeeklyBenefit2026!)} and the minimum is $148, plus a dependency allowance of the greater of $20 or 7% of the rate for each dependent, up to five. Benefits last up to ${tci.maxWeeks} weeks for bonding with a new child or caring for a seriously ill family member.` },
    { q: 'Must a Rhode Island employer pay out unused vacation when I leave?', a: 'Yes, if you have worked for that employer for at least one year. Rhode Island requires accrued, unused vacation to be paid at separation after one year of service, together with the final wages, which are due on the next regular payday. Before that first anniversary, payout depends on the employer policy. Ask for the policy in writing before your last day.' },
  ],
  related: ['state:massachusetts', 'state:connecticut', 'state:new-york', 'paid-family-leave-by-state', 'paid-sick-leave-by-state', 'minimum-wage-increases'],
});
