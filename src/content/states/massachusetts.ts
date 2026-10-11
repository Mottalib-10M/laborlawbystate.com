import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, tippedCash, sickYear, rate$, usd, usdx, day, FM, fullTimeAt } from '../../lib/kit';
import { pflArg, stateArg } from '../../lib/mini-args';

const S = sd('massachusetts');
const now = mwNow('massachusetts');
const cash = tippedCash('massachusetts')!;
const farm = Number(S.minWage.other!.match(/\$([\d.]+)/)![1]);
const pfl = S.familyLeave;
const max26 = pfl.maxWeeklyBenefit2026!;
const max27 = Number(S.notes[0].text.match(/to \$([\d,.]+) \(2027\)/)![1].replace(/,/g, ''));
const sl = S.sickLeave;
const sick = sickYear('massachusetts', 35);
const vac = 60 * 28;
const year = fullTimeAt(now);

export default defineStatePage({
  slug: 'massachusetts',
  title: `Massachusetts Labor Laws 2026: ${rate$(now)}, Same-Day Final Pay`,
  description: `Massachusetts labor laws in 2026: ${rate$(now)} an hour since 2023, ${rate$(cash)} service rate, PFML up to ${pfl.maxWeeks} weeks at ${usdx(max26)} a week, and full pay on the day you are fired.`,
  intro: 'Fired on a Tuesday, paid in full that Tuesday: Massachusetts treats earned vacation as wages and runs one of the longest paid leave programs in the country.',
  resume: `Massachusetts requires an employer that fires or lays off a worker to pay every wage owed, earned vacation included, on the last day of work, one of the strictest deadlines in the country. The minimum wage is ${rate$(now)} an hour in 2026, unchanged since January 2023, with no increase scheduled, which gives ${usd(year.annual)} for a full-time year. Tipped workers who receive more than $20 a month in tips may be paid a service rate of ${rate$(cash)}, and most farm workers have a floor of ${rate$(farm)}. Overtime is time and a half after 40 hours a week. Earned Sick Time accrues at ${sl.accrual}, up to ${sl.capHours} hours a year, paid at employers with 11 or more employees. Paid Family and Medical Leave covers up to ${pfl.maxWeeks} weeks in a benefit year, with a 2026 maximum of ${usdx(max26)} a week that rises to ${usdx(max27)} in 2027.`,
  body: (h) => `
<h2>Paid in full on your last day</h2>
<p>Under Massachusetts law an employee who is discharged must receive full wages on the day of discharge, not at the next payroll run. Earned vacation counts as wages, so it goes into the same check. Picture a dental assistant let go with 60 unused vacation hours at $28 an hour: ${usd(vac)} of vacation pay is due that same day, along with the hours worked since the last payday. A worker who resigns waits a little longer, until the next regular payday, or the first Saturday after leaving when there is no regular payday. Employers that miss these deadlines face claims through the Fair Labor Division of the Attorney General's Office, which is the state agency for wage complaints, not a Department of Labor as in most states.</p>
${h.mini('ptoPayout', stateArg('Massachusetts'))}
<h2>${pfl.maxWeeks} weeks of PFML in one benefit year</h2>
<p>Paid Family and Medical Leave has paid benefits since ${day(pfl.benefitsStart!)}. A worker can take up to 20 weeks for a personal serious health condition, 12 weeks to bond with a child or care for a relative, and up to ${pfl.maxWeeks} weeks to care for a covered service member, with ${pfl.maxWeeks} weeks as the combined limit in a benefit year. That is more than double the ${FM.weeks} unpaid weeks of the federal FMLA. The weekly benefit replaces 80% of your average weekly wage up to half of the state average weekly wage, then 50% of the part above, so a lower earner keeps a larger share of pay. The ceiling is ${usdx(max26)} a week in 2026, which makes ${usd(max26 * 20)} for 20 weeks of medical leave at the maximum, and ${usdx(max27)} a week in 2027.</p>
${h.mini('pflState', pflArg('Massachusetts'))}
<h2>A wage that stopped at ${rate$(now)}</h2>
<p>The rate reached ${rate$(now)} on January 1, 2023, and no further step is scheduled, so it has not moved since. Any further increase would have to come from the legislature or a ballot question. For a full-time worker that means the same ${usd(year.weekly)} a week before taxes in 2026 as three years earlier. The service rate of ${rate$(cash)} applies only when tips bring total pay to at least ${rate$(now)} an hour; if a slow night leaves the server short, the employer adds the difference.</p>
<h2>Sick time and the lunch break</h2>
<p>Earned Sick Time took effect on July 1, 2015 and covers every employer, paid at those with 11 or more employees and unpaid but protected at smaller ones. Someone working 35 hours a week builds up about ${Math.floor(sick.accrued)} hours over a year, of which the employer has to honor ${sick.capped}. A worker on duty more than 6 hours in a calendar day is entitled to a meal break of at least 30 minutes. The Fair Labor Division decides complaints; an employment lawyer can review an individual situation.</p>`,
  faqs: [
    { q: 'Do I get paid the same day I am fired in Massachusetts?', a: 'Yes. A Massachusetts employer must pay all wages owed, including earned and unused vacation, on the day it discharges or lays off an employee. If you quit, the deadline is the next regular payday, or the following Saturday when there is no regular payday. Complaints about late or missing final pay go to the Attorney General Fair Labor Division.' },
    { q: 'What is the Massachusetts PFML maximum weekly benefit in 2027?', a: `It rises to ${usdx(max27)} a week in 2027, from ${usdx(max26)} in 2026. Your own benefit depends on your average weekly wage: 80% of the part up to half of the state average weekly wage, plus 50% of the part above it, never more than the maximum. Leave can last up to ${pfl.maxWeeks} weeks in a benefit year when family and medical leave are combined.` },
    { q: 'What is the tipped minimum wage in MA?', a: `The service rate is ${rate$(cash)} an hour for employees who serve customers and receive more than $20 a month in tips. Tips must bring total hourly pay to at least the ${rate$(now)} minimum wage; if they fall short, the employer must make up the difference. Servers also share the general protections of the state wage law, including same-day pay at discharge.` },
  ],
  related: ['state:connecticut', 'state:rhode-island', 'state:new-hampshire', 'state:new-york', 'final-paycheck-laws', 'paid-family-leave-by-state'],
});
