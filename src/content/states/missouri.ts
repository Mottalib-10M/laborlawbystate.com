import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, F, FM, fullTimeAt, otCalc } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('missouri');
const mw = mwNow('missouri');
const tip = S.minWage.tipped.cashWage!;
const ot = otCalc('missouri', 17, 9, 5);

export default defineStatePage({
  slug: 'missouri',
  title: `Missouri Minimum Wage 2026: ${rate$(mw)}, Sick Leave Repealed`,
  description: `Missouri labor laws in 2026: ${rate$(mw)} minimum wage with no inflation raise ahead, ${rate$(tip)} tipped wage, paid sick leave repealed in 2025, pay due on discharge.`,
  intro: 'Voters raised Missouri\'s wage to $15 and added paid sick leave in 2024; the legislature kept the wage, stopped its indexing and repealed the sick leave in 2025.',
  resume: `Missouri's minimum wage is ${rate$(mw)} an hour in 2026, the last step of the increase voters approved with Proposition A in November 2024. It will stay there: a 2025 law, HB 567, removed the yearly inflation adjustment that was due to start in 2027, so the rate changes only if the legislature or voters act again. Full time at ${rate$(mw)} pays ${usd(fullTimeAt(mw).annual)} a year. Tipped employees receive at least ${rate$(tip)}, half the minimum, with tips covering the rest. The same 2025 law repealed the paid sick leave that Proposition A had required from May 1, 2025, effective August 28, 2025, so Missouri again has no paid sick leave mandate. Overtime is due after 40 hours a week. A fired employee is owed wages on the day of discharge, and small retail and service businesses with sales under $500,000 are outside the state wage law.`,
  body: (h) => `
<h2>From ballot box to statute book</h2>
<p>Proposition A did two things: it raised the minimum wage to ${rate$(mw)} on January 1, 2026, with annual cost-of-living increases afterward, and it created a right to earn paid sick time. HB 567 kept the ${rate$(mw)} rate but ended the indexing, and it repealed the sick leave sections outright. Workers who had started accruing sick hours in the spring of 2025 lost the legal right to them once the repeal took effect on August 28, 2025, although an employer may keep offering paid sick time as a matter of policy. Since that same date, the state minimum wage also covers public employers, including cities, counties and school districts.</p>
${h.mini('stateCompare', stateArg())}
<h2>Who the ${rate$(mw)} rate covers</h2>
<p>Retail and service businesses with annual gross sales below $500,000 are exempt from the Missouri wage law. Their employees still have federal protection when their employer or their work is covered by the FLSA, in which case at least the federal ${rate$(F.minWage)} applies. Tipped workers get a cash wage of ${rate$(tip)}; if tips do not bring the hour to ${rate$(mw)} over the workweek, the employer pays the rest.</p>
${h.mini('tipTopUp', stateArg('Missouri'))}
<h2>Overtime and pay at the end of a job</h2>
<p>Missouri follows the 40-hour weekly rule. A machine operator earning $17 who works five 9-hour days has 5 overtime hours and a gross week of ${usd(ot.total)}. When an employee is discharged, Missouri law makes wages due that day; the worker may ask in writing for the pay to be sent, and if it does not arrive within seven days of that request, penalty wages can run. For workers who quit, no Missouri statute sets a deadline. Vacation payout depends on the employer's policy, and Missouri has no meal or rest break law for adults, so breaks also follow policy. Missouri is not a right-to-work state: the right-to-work law passed in 2017 never took effect after voters rejected it in a 2018 referendum.</p>
<h2>The service letter</h2>
<p>A rule found in few other states: an employee with at least 90 days of service at a corporation with seven or more employees may ask, by certified mail, for a letter stating what work they did and the true reason they left. The employer has 45 days to answer. The letter can matter for a future job or a dispute, so the request is worth making soon after leaving. ${h.a('final-paycheck-laws', 'The final paycheck page')} covers the payment side in every state.</p>`,
  faqs: [
    { q: 'Will the Missouri minimum wage go up in 2027?', a: `Not under current law. Proposition A would have indexed the ${rate$(mw)} rate to inflation from 2027, but HB 567, signed in 2025, removed that adjustment. Unless the legislature or voters change the law again, the Missouri minimum stays at ${rate$(mw)} an hour, with a tipped cash wage of ${rate$(tip)}.` },
    { q: 'Do Missouri employers still have to give paid sick leave?', a: 'No. Paid sick leave required by Proposition A started on May 1, 2025, but HB 567 repealed it with effect from August 28, 2025. Missouri now has no statewide paid sick leave requirement for private employers. Employers may still offer sick days by policy, and the federal FMLA protects eligible workers during serious health conditions, without pay.' },
    { q: 'What is a service letter in Missouri?', a: 'A written statement an employer must provide on request describing the nature and length of your service and the true cause of your departure. You qualify after 90 days at a corporation with seven or more employees, and you must ask by certified mail. The employer then has 45 days to send the letter.' },
  ],
  related: ['state:illinois', 'state:kansas', 'state:arkansas', 'paid-sick-leave-by-state', 'minimum-wage-increases', 'final-paycheck-laws'],
});
