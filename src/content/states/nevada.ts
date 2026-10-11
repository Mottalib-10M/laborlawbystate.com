import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, otCalc, sickYear, num } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('nevada');
const mw = mwNow('nevada');
const line = 1.5 * mw;
const low = otCalc('nevada', 16, 10, 4);
const high = otCalc('nevada', 20, 10, 4);
const leave = sickYear('nevada', 40);

export default defineStatePage({
  slug: 'nevada',
  title: `Nevada Labor Laws 2026: ${rate$(mw)} Wage and Daily Overtime Rule`,
  description: `Nevada labor laws in 2026: ${rate$(mw)} minimum wage with no tip credit, daily overtime below ${rate$(line)} an hour, paid leave for any reason, and final pay at once.`,
  intro: 'Nevada pays daily overtime only to lower-wage workers, gives paid leave that needs no reason, and bans the tip credit in a state built on tipped work.',
  resume: `Nevada's minimum wage is ${rate$(mw)} an hour for every employee, a single rate since the two-tier system tied to health benefits ended in July 2024, and the July 2026 bulletin kept it unchanged. Tipped workers in casinos, restaurants and hotels receive the full ${rate$(mw)} before tips, because Nevada law forbids counting tips toward the minimum. Overtime has a twist found nowhere else: employees earning less than one and a half times the minimum wage, ${rate$(line)} an hour, are owed time and a half after 8 hours in a 24-hour period, while everyone non-exempt gets it after 40 hours a week. Employers with 50 or more employees in Nevada must give paid leave that can be used for any reason, about ${num(Math.floor(leave.raw ?? 0))} hours a year for a full-time worker. A fired employee is paid immediately; one who quits, by the next payday or within 7 days, whichever comes first.`,
  body: (h) => `
<h2>Daily overtime with a wage line</h2>
<p>The Nevada rule protects the hourly workers who most often pull long shifts. Below ${rate$(line)} an hour, every hour beyond 8 in a 24-hour period is paid at time and a half, unless the employer and employee have agreed in writing to four 10-hour days. At or above that rate, only the weekly 40-hour threshold applies. Compare two workers on four 10-hour shifts: at $16 an hour the daily rule adds 8 overtime hours and the week pays ${usd(low.total)}; at $20 an hour the same 40 hours are all straight time, ${usd(high.total)}. The calculator on this page applies the line automatically from the rate you enter. Because the line is set at one and a half times the minimum wage, it moves whenever the minimum wage changes, so check it each July when the Labor Commissioner publishes the annual bulletin.</p>
${h.mini('stateCompare', stateArg())}
<h2>Tips on top of the full minimum</h2>
<p>Nevada is one of the few states where a server, dealer or bartender cannot be paid a reduced cash wage. The employer pays at least ${rate$(mw)} for every hour, and tips are extra. That matters in a state where hospitality jobs are a large share of employment: a 30-hour week guarantees ${usd(30 * mw)} before a single tip.</p>
<h2>Paid leave you do not have to explain</h2>
<p>Since January 1, 2020, private employers with 50 or more employees in Nevada have had to provide paid leave at a rate of 0.01923 hours for every hour worked, roughly one hour per 52. The worker does not need to say why the time is taken. Employers may cap carryover and annual use at 40 hours, new businesses are exempt for their first two years, and unused leave is not paid out at the end of the job unless the employer's policy says so. Smaller employers have no such obligation.</p>
${h.mini('sickAccrual', stateArg('Nevada'))}
<h2>Breaks and the end of a job</h2>
<p>A continuous 8-hour stretch of work carries a 30-minute meal period, and paid 10-minute rest periods are due for every 4 hours or major fraction, with no rest period required on days under three and a half hours or where only one person is employed. When a job ends, a discharged worker is owed wages immediately, and someone who resigns by the next regular payday or within 7 days, whichever is sooner. Nevada is a right-to-work state and employment is at will. ${h.a('break-laws-by-state', 'Break rules in other states')} are often less generous.</p>`,
  faqs: [
    { q: 'Who gets daily overtime in Nevada?', a: `Non-exempt employees paid less than one and a half times the minimum wage, which is ${rate$(line)} an hour with the current ${rate$(mw)} rate. They earn time and a half for hours beyond 8 in a 24-hour period. A written agreement for four 10-hour days removes the daily rule. Workers paid ${rate$(line)} or more get overtime only after 40 hours in a workweek.` },
    { q: 'Can Nevada employers pay tipped workers less than minimum wage?', a: `No. Nevada law does not allow tips to count toward the minimum wage, so tipped employees receive at least ${rate$(mw)} an hour from the employer, with tips on top. Since July 2024 there is one rate for everyone, whether or not the employer offers health benefits.` },
    { q: 'How much paid leave do Nevada employees earn?', a: `At employers with 50 or more employees in Nevada, leave accrues at 0.01923 hours per hour worked, about 40 hours a year for a full-time schedule. It can be used for any reason without explanation. Employers may limit use and carryover to 40 hours a year, and new businesses are exempt for two years.` },
  ],
  related: ['state:california', 'state:arizona', 'state:utah', 'overtime-laws-by-state', 'tipped-minimum-wage', 'paid-sick-leave-by-state'],
});
