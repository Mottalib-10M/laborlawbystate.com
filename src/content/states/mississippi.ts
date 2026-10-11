import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, F, FM, fullTimeAt, otCalc, atFederal } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('mississippi');
const mw = mwNow('mississippi');
const ot = otCalc('mississippi', 14, 8, 6);
const floor = atFederal();

export default defineStatePage({
  slug: 'mississippi',
  title: `Mississippi Labor Laws 2026: ${rate$(mw)} and No State Wage Law`,
  description: `Mississippi labor laws in 2026: no state minimum wage, overtime or final pay law, so the federal ${rate$(mw)} and 40-hour overtime rule apply; right to work.`,
  intro: 'Mississippi has almost no wage and hour law of its own: federal rules and the employer\'s written policies decide nearly everything.',
  resume: `Mississippi has no state minimum wage law, so workers at employers covered by the Fair Labor Standards Act are owed the federal ${rate$(mw)} an hour, ${usd(fullTimeAt(mw).annual)} a year at 40 hours a week, and tipped workers a cash wage of at least ${rate$(F.tippedCash)} with tips making up the rest. There is no state overtime statute either: time and a half after ${F.otWeeklyHours} hours in a workweek comes from federal law. Mississippi also has no state labor department enforcing wages, no paid sick leave or family leave requirement, no break rules and no statute on the timing of a final paycheck or on vacation payout. What the state does put in its constitution is the right to work, in Section 198A. In practice, a Mississippi worker's rights come from three places: federal law, the written policies of the employer and any contract signed.`,
  body: (h) => `
<h2>A state with no wage agency</h2>
<p>Most states have a labor department that takes wage complaints. Mississippi does not run one for private-sector pay, so claims for unpaid minimum wage or overtime go to the Wage and Hour Division of the U.S. Department of Labor, which charges nothing. Claims that rest on a promise, such as an agreed hourly rate above the minimum, a commission plan or a vacation payout written into a handbook, are contract claims, taken to a state court. Mississippi is one of ${floor.length} states where the federal floor is the working minimum.</p>
${h.mini('stateCompare', stateArg())}
<h2>What the federal floor covers</h2>
<p>The FLSA reaches businesses with ${usd(F.enterpriseSales)} or more in annual sales and any employee whose work regularly crosses state lines, which covers most jobs in retail, logistics, health care and manufacturing. A poultry plant worker paid $14 an hour who works six 8-hour shifts has 48 hours that week and is owed 8 at time and a half, ${usd(ot.total)} gross. Mississippi adds no daily overtime and no higher salary test for exempt jobs, so the federal ${usd(F.exemptWeekly)} a week applies.</p>
<h2>Tips and the cash wage</h2>
<p>Restaurants in Mississippi may use the federal tip credit. A server receives at least ${rate$(F.tippedCash)} an hour from the employer, and tips must carry the total to ${rate$(mw)} for every hour of the workweek. When a slow week leaves the average short, the employer owes the difference in that paycheck. Tips belong to the worker under federal rules; managers and owners cannot keep any part of them, even through a pool.</p>
${h.mini('tipTopUp', stateArg('Mississippi'))}
<h2>The end of a job</h2>
<p>No Mississippi statute sets a deadline for final wages, and federal law does not set one. Whether unused vacation is paid depends entirely on the employer's policy or a contract. Before leaving, it helps to ask in writing when the last check will be issued and whether accrued time will be included, and to keep copies of recent pay stubs.</p>
<h2>Leave, breaks and unions</h2>
<p>Mississippi law does not require sick days, paid family leave or meal and rest breaks for adults. Eligible workers have the federal FMLA: up to ${FM.weeks} weeks of unpaid, job-protected leave at employers with ${FM.employerEmployees} or more employees. The constitution guarantees that no one can be required to join a union or pay dues as a condition of employment, and employment is at will. ${h.a('right-to-work-states', 'The right-to-work page')} compares the states that share that rule.</p>`,
  faqs: [
    { q: 'Does Mississippi have a minimum wage?', a: `Not under state law. Mississippi is one of the few states with no minimum wage statute, so the federal minimum of ${rate$(mw)} an hour applies to employers covered by the Fair Labor Standards Act. Employees of small, purely local businesses outside federal coverage have no legal minimum. Tipped workers may be paid ${rate$(F.tippedCash)} in cash if tips bring them to ${rate$(mw)}.` },
    { q: 'Who do I call about unpaid wages in Mississippi?', a: 'For unpaid minimum wage or overtime, contact the Wage and Hour Division of the U.S. Department of Labor, since Mississippi has no state agency that enforces private-sector wages. For pay promised in a contract or policy, such as a commission or a vacation payout, the route is a civil claim in court, usually in a state court.' },
    { q: 'Is Mississippi a right-to-work state?', a: 'Yes. Section 198A of the Mississippi Constitution provides that no person can be denied employment for joining or refusing to join a labor union, or be required to pay union dues. Employment is also at will, so an employer may end a job without a reason, as long as the reason is not one the law forbids, such as discrimination.' },
  ],
  related: ['state:alabama', 'state:louisiana', 'state:tennessee', 'state:arkansas', 'minimum-wage-by-state', 'right-to-work-states'],
});
