import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mwJan, rate$, usd, F, FM, fullTimeAt, day, mwMidYear } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('florida');
const now = mwNow('florida');
const jan = mwJan('florida');
const step = mwMidYear('florida')[0];
const tip = S.minWage.tipped.cashWage!;
const gain = fullTimeAt(now - jan).annual;

export default defineStatePage({
  slug: 'florida',
  title: `Florida Minimum Wage 2026: ${rate$(now)} Since September 30`,
  description: `Florida minimum wage 2026: ${rate$(jan)} until September 29, then ${rate$(now)} from ${day(step.from)}, a ${rate$(tip)} tipped cash wage, federal overtime, no sick leave law.`,
  intro: 'Florida raises its minimum wage in the autumn, writes it into the state constitution and keeps cities from adding wage or leave rules of their own.',
  resume: `Florida's minimum wage became ${rate$(now)} an hour on ${day(step.from)}, up from ${rate$(jan)}, completing the dollar-a-year schedule that voters added to the state constitution in 2020. The date matters: Florida does not change its rate on January 1 like most states, but on September 30, and from 2027 the September increase will follow inflation. A full-time worker gains about ${usd(gain)} a year from this last step. Tipped employees must receive a cash wage of at least ${rate$(tip)}, because Florida freezes the tip credit at a fixed amount instead of letting it grow with the minimum. Overtime follows the federal 40-hour rule, and Florida has no state law requiring paid sick leave, paid family leave, meal breaks for adults or a deadline for a final paycheck. Cities and counties are not allowed to fill those gaps for private employers.`,
  body: (h) => `
<h2>Why Florida raises pay on September 30</h2>
<p>The minimum wage sits in Article X, Section 24 of the Florida Constitution, not in an ordinary statute. The 2020 amendment set a $1 increase each September 30 until the rate reached ${rate$(now)}, which happened this year. From September 30, 2027, the state recalculates the figure every year from the consumer price index, so a raise will keep arriving in the autumn. For payroll that means the January paycheck brings no change, and a pay rate set in the spring can fall below the minimum by October. Anyone paid exactly the minimum should check the stub that covers September 30: hours worked on or after that date earn the new rate.</p>
${h.mini('raiseTimeline', stateArg('Florida'))}
<h2>Tips: a fixed credit, a rising cash wage</h2>
<p>Most states that allow a tip credit let the employer count a share of tips toward the minimum wage. Florida fixes that share at the amount allowed under federal law in 2003, so each time the minimum wage goes up, the cash wage a server or bartender must receive goes up by the same amount. Since September 30 the cash floor is ${rate$(tip)} an hour, more than five times the federal ${rate$(F.tippedCash)}. If cash wage plus tips still falls short of ${rate$(now)} for the hours in a workweek, the employer must make up the difference.</p>
${h.mini('tipTopUp', stateArg('Florida'))}
<h2>Statewide rules only</h2>
<p>A Florida statute bars cities and counties from requiring private employers to pay a local minimum wage or to provide benefits that state or federal law does not require, which rules out local sick leave ordinances. Living wage rules adopted by local governments reach only their own staff and some contractors. That leaves Florida workers with the federal framework for leave: up to ${FM.weeks} weeks of unpaid FMLA leave for those who qualify, and whatever paid time off the employer offers. ${h.a('paid-sick-leave-by-state', 'States that do require paid sick leave')} are mostly in the Northeast and the West.</p>
<h2>Overtime, final pay and breaks</h2>
<p>With no state overtime statute, time and a half is owed after ${F.otWeeklyHours} hours in a workweek under federal law, and the federal salary test of ${usd(F.exemptWeekly)} a week applies to exempt jobs. Florida sets no deadline for the last paycheck and no rule on paying out unused vacation, so the employer's regular payday and written policy govern both. Meal breaks are required only for minors. The state does protect the right to work: the Declaration of Rights in the constitution forbids making union membership a condition of employment.</p>`,
  faqs: [
    { q: 'What is the Florida minimum wage right now?', a: `It is ${rate$(now)} an hour since ${day(step.from)}. From January 1 to September 29, 2026 it was ${rate$(jan)}. Tipped employees must receive at least ${rate$(tip)} an hour in cash, with tips covering the rest. The next change comes on September 30, 2027, when the rate will be adjusted for inflation under the state constitution.` },
    { q: 'Can a Florida city set a higher minimum wage?', a: 'Not for private employers. Florida law forbids counties and cities from requiring businesses to pay a local minimum wage above the state rate, or to provide benefits beyond those required by state or federal law. Local living wage ordinances apply only to the local government itself and to some of its contractors, not to private businesses in general.' },
    { q: 'Do Florida employers have to pay out unused vacation?', a: 'No Florida statute requires it. Whether accrued vacation is paid when you leave depends on the employer policy, the handbook or your contract. If the written policy promises a payout, it can be enforced as a wage claim. Federal law does not require vacation pay either, so read the policy before your last day.' },
  ],
  related: ['state:georgia', 'state:alabama', 'minimum-wage-increases', 'tipped-minimum-wage', 'paid-sick-leave-by-state'],
});
