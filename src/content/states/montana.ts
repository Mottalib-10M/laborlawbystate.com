import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, rate$, usd, F, FM, fullTimeAt, day } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('montana');
const mw = mwNow('montana');
const next = mw2027('montana')!;
const small = S.minWage.rates2026.find((r) => r.rate < F.minWage)!;

export default defineStatePage({
  slug: 'montana',
  title: `Montana Labor Laws 2026: Good Cause Firing Rule, ${rate$(mw)} Wage`,
  description: `Montana labor laws in 2026: firing requires good cause after probation, a ${rate$(mw)} minimum wage (${rate$(next.rate)} in 2027), no tip credit and vacation is paid out.`,
  intro: 'Montana is the one state that is not at will: after a probationary period, most employees can only be dismissed for good cause.',
  resume: `Montana is the only state where most private-sector employees cannot be fired without good cause once their probationary period is over. The Wrongful Discharge from Employment Act lets a worker sue for lost wages when a dismissal breaks that rule, violates the employer's own written policy, or punishes the worker for refusing to break the law or for reporting a violation. Pay rules are generous too. The minimum wage is ${rate$(mw)} an hour in 2026 and rises to ${rate$(next.rate)} on ${day(next.from)} under the yearly inflation adjustment, and Montana allows no tip credit, so servers receive the full minimum before tips. Earned vacation counts as wages and must be paid out when the job ends. A fired worker is owed final pay immediately unless a written policy sets a later date, and Montana has no paid sick leave or paid family leave law.`,
  body: (h) => `
<h2>Good cause instead of at-will</h2>
<p>Everywhere else in the country, a job without a contract can end for any lawful reason or none. Montana changed that by statute. Once a probationary period ends (the employer's stated period, or a default set by law when none is stated), a dismissal must rest on ${h.ext('https://leg.mt.gov/bills/mca/title_0390/chapter_0020/part_0090/section_0030/0390-0020-0090-0030.html', 'good cause')}, which the statute defines as reasonable job-related grounds such as failing to perform the job satisfactorily, disrupting the employer's operation, or another legitimate business reason. A worker dismissed in breach of the act can recover ${h.ext('https://leg.mt.gov/bills/mca/title_0390/chapter_0020/part_0090/section_0050/0390-0020-0090-0050.html', 'lost wages and fringe benefits for up to 4 years')}, minus what they earned or could have earned elsewhere in the meantime. Quitting because the employer made the job intolerable can count as a constructive discharge under the same act. Since a 2023 amendment, firing someone only for lawful free speech, including posts on social media, also counts as a wrongful discharge. Two procedural rules matter: ${h.ext('https://leg.mt.gov/bills/mca/title_0390/chapter_0020/part_0090/section_0110/0390-0020-0090-0110.html', 'a claim must be filed within 1 year')} of the discharge, and if the employer has a written internal appeal procedure, the worker must use it first.</p>
${h.mini('atWillState', stateArg('Montana'))}
<h2>A wage indexed every year</h2>
<p>The Department of Labor and Industry recalculates the minimum wage each autumn from the consumer price index; the letter for 2027 sets ${rate$(next.rate)}. Montana bans tip credits, meal credits and training wages, so the rate is the rate. One exception remains in the statute: businesses not covered by federal law with gross annual sales of $110,000 or less may pay ${rate$(small.rate)} an hour, but any employee individually covered by the FLSA must still receive at least the federal ${rate$(F.minWage)}, which in practice limits that rate to very few jobs.</p>
${h.mini('raiseTimeline', stateArg('Montana'))}
<h2>Overtime and final pay</h2>
<p>Time and a half is owed after 40 hours a week, and holiday, sick and vacation hours do not count toward the 40. When a job ends by dismissal, wages are due at once, unless a written policy that existed beforehand allows the next payday or 15 days, whichever comes first; a worker who quits is paid by the next regular payday or within 15 days. Accrued vacation is part of what is owed.</p>
<h2>Leave</h2>
<p>Montana has no paid sick leave or paid family leave requirement for private employers. The federal FMLA covers eligible workers at larger employers for up to ${FM.weeks} weeks of unpaid leave. Montana is not a right-to-work state.</p>`,
  faqs: [
    { q: 'Can I be fired without a reason in Montana?', a: 'During the probationary period, generally yes. After it ends, the Wrongful Discharge from Employment Act requires good cause for most private-sector dismissals. A dismissal is also wrongful if it violates the employer\'s written personnel policy or retaliates for refusing to break the law or for reporting a violation. Workers with a written contract for a set term, and union members, follow other rules.' },
    { q: 'Do Montana tipped workers get the full minimum wage?', a: `Yes. Montana does not allow a tip credit, so tipped employees receive at least ${rate$(mw)} an hour from the employer, with tips on top. The rate rises to ${rate$(next.rate)} on ${day(next.from)}. Employers also cannot count meals or a training wage against the minimum.` },
    { q: 'Is unused vacation paid out when you leave a job in Montana?', a: 'Yes. Montana treats earned vacation pay as wages, so accrued and unused vacation is owed with the final paycheck, like any other wages. The Department of Labor and Industry handles wage claims for unpaid vacation along with other unpaid wages. Sick leave is different: Montana has no law requiring it, and payout depends on the employer policy.' },
  ],
  related: ['state:idaho', 'state:wyoming', 'state:north-dakota', 'at-will-employment', 'pto-payout-laws', 'minimum-wage-increases'],
});
