import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, F, FM, fullTimeAt, otCalc } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('louisiana');
const mw = mwNow('louisiana');
const ot = otCalc('louisiana', 19, 12, 4);

export default defineStatePage({
  slug: 'louisiana',
  title: `Louisiana Labor Laws 2026: No State Minimum, ${rate$(mw)} Federal`,
  description: `Louisiana labor laws in 2026: no state minimum wage, so the federal ${rate$(mw)} applies; final pay is due within 15 days and earned vacation can't be forfeited.`,
  intro: 'Louisiana has no minimum wage law of its own, but it is stricter than many states on two points: the last paycheck and earned vacation.',
  resume: `Louisiana is one of the few states with no minimum wage statute at all, so workers covered by federal law are owed the federal ${rate$(mw)} an hour, or ${usd(fullTimeAt(mw).annual)} a year at full time, and tipped workers at least ${rate$(F.tippedCash)} in cash plus tips. Overtime follows the federal rule of time and a half after ${F.otWeeklyHours} hours in a workweek. There is no state paid sick leave or paid family leave, and adults have no break law. Where Louisiana does protect workers is the end of the job: whether you are fired or you quit, your final wages are due by the next regular payday or within 15 days, whichever comes first, and vacation you have earned under the employer's policy is part of those wages and cannot be taken away by a forfeiture rule.`,
  body: (h) => `
<h2>No state minimum wage law</h2>
<p>Louisiana never enacted a general minimum wage, so the Louisiana Workforce Commission has no state rate to enforce. Workers whose employer is covered by the FLSA get ${rate$(mw)}; employees of very small, purely local businesses can fall outside both laws. Tipped staff in restaurants and bars follow the federal tip credit rules: a cash wage of ${rate$(F.tippedCash)}, tips counted toward the rest, and a top-up from the employer when tips fall short in a workweek.</p>
${h.mini('tipTopUp', stateArg('Louisiana'))}
<h2>The 15-day rule for final wages</h2>
<p>Louisiana Revised Statutes Title 23 treat a resignation and a dismissal the same way. The employer pays everything owed on or before the next regular payday for the pay cycle worked, or within 15 days of the separation, whichever comes first. A worker let go on the 1st of a month with a monthly payday on the 30th is therefore owed final pay by the 16th. The amount includes earned, unused vacation: under the statute, an employer cannot write a policy that makes earned vacation pay disappear when you leave.</p>
${h.mini('ptoPayout', stateArg('Louisiana'))}
<h2>Overtime on offshore and plant schedules</h2>
<p>Long rotations are common in Louisiana's refineries, plants and offshore work, and the federal rule still counts only the workweek. Four 12-hour shifts make 48 hours, so a technician paid $19 an hour is owed 8 overtime hours and ${usd(ot.total)} for the week; a 12-hour day alone triggers nothing. Hours spent in required safety meetings, travel between job sites during the workday and waiting time that the employer controls generally count as hours worked under federal rules, which is where many overtime disputes start; ${h.a('overtime-laws-by-state', 'the overtime rules page')} computes a week under the federal standard.</p>
<h2>Leave and breaks</h2>
<p>Paid sick days and paid family leave are left to employers. The federal FMLA gives eligible workers up to ${FM.weeks} weeks of unpaid, job-protected leave. Break rules exist only for minors under 16, who must get a 30-minute meal interval in any 5-hour work period. Louisiana is a right-to-work state, and employment is at will.</p>
<h2>Where to turn</h2>
<p>Because Louisiana has no state minimum wage or overtime law, complaints about an hourly rate below ${rate$(mw)} or unpaid overtime go to the federal Wage and Hour Division, which investigates without charge. Disputes about the 15-day final pay rule or forfeited vacation are state law questions, usually pursued as a civil claim, often first through a written demand to the employer that cites the statute. Keep a record of your hours, your pay stubs and the vacation balance on your last stub.</p>`,
  faqs: [
    { q: 'What is the minimum wage in Louisiana in 2026?', a: `Louisiana has no state minimum wage law, so the federal minimum of ${rate$(mw)} an hour applies to employers covered by the Fair Labor Standards Act. Tipped employees may be paid ${rate$(F.tippedCash)} in cash if tips bring them to ${rate$(mw)}. No increase is scheduled; only Congress can raise the rate that applies in Louisiana.` },
    { q: 'When is my final paycheck due in Louisiana if I quit?', a: 'The same day as if you were fired: by the next regular payday for the pay cycle you worked, or within 15 days of leaving, whichever comes first. The payment must include earned vacation that you have not used. Keep a copy of your last pay stub and the vacation balance it shows: they are the evidence of what was owed.' },
    { q: 'Can a Louisiana employer refuse to pay unused vacation?', a: 'Not if the vacation was earned under the employer policy and not yet used. Louisiana law treats it as wages due at separation and bars policies that forfeit earned vacation pay. An employer can still decide how vacation is earned in the first place, for example that it accrues only after a probation period.' },
  ],
  related: ['state:texas', 'state:mississippi', 'state:arkansas', 'final-paycheck-laws', 'pto-payout-laws', 'tipped-minimum-wage'],
});
