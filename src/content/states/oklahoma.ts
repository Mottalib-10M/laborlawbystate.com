import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, otCalc, rate$, usd, F, FM, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('oklahoma');
const mw = mwNow('oklahoma');
const tip = S.minWage.tipped.cashWage!;
const year = fullTimeAt(mw).annual;
const ot = otCalc('oklahoma', 17.5, 10, 5);

export default defineStatePage({
  slug: 'oklahoma',
  title: `Oklahoma Labor Laws 2026: ${rate$(mw)} Wage, FLSA Overtime, Paydays`,
  description: `Oklahoma in 2026: ${rate$(mw)} minimum wage (${usd(year)} a year full time), a state act limited to larger employers, overtime only under the FLSA, paydays in 11 days.`,
  intro: 'Oklahoma leans on federal law for most pay rules and keeps a narrow state act of its own, with firm limits on how long an employer can hold your wages.',
  resume: `Oklahoma's minimum wage is ${rate$(mw)} an hour in 2026, the federal rate adopted by state law, and no change is planned. A full-time year at that rate comes to ${usd(year)}. The state minimum wage act covers only employers with at least 10 full-time employees or more than $100,000 in annual gross sales, and it does not apply to jobs already covered by the federal FLSA, which reaches most workers anyway. Tipped employees can be paid a cash wage of ${rate$(tip)} with tips making up the difference. Oklahoma has no overtime statute: time and a half after ${F.otWeeklyHours} hours comes from federal law for employers it covers. No state law requires paid sick days, paid family leave or breaks for workers aged 16 and over. Paydays must fall within 11 days after each pay period ends, final wages are due by the next regular payday whether you quit or were fired, and Oklahoma is a right-to-work state.`,
  body: (h) => `
<h2>A state wage act with a narrow reach</h2>
<p>Oklahoma's minimum wage law applies to an employer that has at least 10 full-time employees, or the equivalent, or grosses more than $100,000 a year, and it steps aside wherever the FLSA already applies. In practice, the federal law is the one that protects most Oklahoma workers, at the same ${rate$(F.minWage)}. The state act also excludes a long list of jobs, including part-time work under 25 hours a week, students and farm workers. A very small employer outside both laws may fall through the gaps, so a worker at a tiny business with an unusually low wage should ask the Department of Labor which law, if any, covers the job.</p>
<p>Tipped workers receive at least the federal cash wage of ${rate$(tip)}. Tips are expected to carry the rest of the way to ${rate$(mw)} an hour.</p>
<h2>The 11-day payday rule</h2>
<p>Oklahoma requires employers to set regular paydays no later than 11 days after the end of each pay period, and gives them 3 extra days after the scheduled payday to issue the money. A pay period that closes on the last day of the month must therefore lead to a payday by the 11th of the next month, with payment allowed until the 14th at the latest. The same schedule governs the last paycheck. The Department of Labor says an employer may wait until the next regularly designated payday whether an employee quit or was fired, so there is no same-day obligation even after a dismissal.</p>
<p>Vacation pay counts as wages only when it was agreed with the employee or is part of an established policy. If the policy promises payout, the balance belongs in the final paycheck; if it is silent or excludes payout, the state law does not add one.</p>
${h.mini('atWillState', stateArg('Oklahoma'))}
<h2>Overtime comes from Washington</h2>
<p>No Oklahoma statute requires overtime. An employer covered by the FLSA must pay non-exempt staff one and a half times the regular rate for hours past ${F.otWeeklyHours} in a workweek. A welder earning $17.50 who works five 10-hour days logs 50 hours: 40 at straight time and 10 at ${rate$(17.5 * 1.5)}, ${rate$(ot.total)} in all. The salary test for exempt employees is the federal ${usd(F.exemptWeekly)} a week. Employers outside the FLSA owe no overtime under Oklahoma law.</p>
<h2>Unions, breaks and leave</h2>
<p>Oklahoma's right-to-work provision bars requiring anyone to join, stay out of, or pay a labor organization as a condition of a job. Employment is at will. Workers aged 16 or older have no legal right to a meal or rest break under either state or federal law, though 14- and 15-year-olds must get break and lunch periods under the child labor rules. There is no state paid sick leave or paid family leave; the federal FMLA protects eligible employees for up to ${FM.weeks} weeks without pay. The ${h.a('right-to-work-states', 'right-to-work map')} shows the other states with similar laws.</p>
${h.mini('rtwState', stateArg('Oklahoma'))}`,
  faqs: [
    { q: 'Does Oklahoma have its own overtime law?', a: `No. Oklahoma has no state overtime statute. Employers covered by the federal Fair Labor Standards Act must pay non-exempt employees time and a half for every hour over ${F.otWeeklyHours} in a workweek. The federal salary test of ${usd(F.exemptWeekly)} a week applies to exempt staff, and the U.S. Department of Labor enforces the overtime rule.` },
    { q: 'How soon must an Oklahoma employer pay after a pay period ends?', a: 'Paydays must be set no later than 11 days after the end of each pay period, and employers have up to 3 more days after the scheduled payday to issue payment. A final paycheck follows the same schedule: Oklahoma allows the employer to wait until the next regularly designated payday whether the employee quit or was fired.' },
    { q: 'Which employers must follow the Oklahoma minimum wage act?', a: `Employers with at least 10 full-time employees or the equivalent, or annual gross sales above $100,000. The state act does not apply where the federal FLSA already covers the employment, and it excludes groups such as part-time workers under 25 hours a week, students and farm workers. The rate under both laws is ${rate$(mw)} an hour.` },
    { q: 'Are lunch breaks required in OK for adult workers?', a: 'No. Neither Oklahoma nor federal law requires employers to give breaks to employees aged 16 or older, so meal and rest periods depend on company policy. Oklahoma child labor law does require break and lunch periods for 14- and 15-year-olds. Check the handbook, since any break the employer promises is set by its own policy.' },
  ],
  related: ['state:texas', 'state:kansas', 'state:arkansas', 'state:missouri', 'right-to-work-states', 'overtime-laws-by-state'],
});
