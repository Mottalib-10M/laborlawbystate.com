import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, rate$, usd, F, fullTimeAt, sickYear, day, num, otCalc } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('michigan');
const now = mwNow('michigan');
const next = mw2027('michigan')!;
const tip = S.minWage.tipped.cashWage!;
const sick = sickYear('michigan', 40);
const raise = fullTimeAt(next.rate - now).annual;
const ot = otCalc('michigan', 18, 9, 5);

export default defineStatePage({
  slug: 'michigan',
  title: `Michigan Minimum Wage 2026: ${rate$(now)}, Then ${rate$(next.rate)} in 2027`,
  description: `Michigan labor laws in 2026: ${rate$(now)} minimum wage rising to ${rate$(next.rate)} on January 1, 2027, a ${rate$(tip)} tipped wage, earned sick time up to ${S.sickLeave.capHours} hours and no right-to-work.`,
  intro: 'Michigan is in the middle of a wage schedule set by statute, has a new sick time law in force since 2025 and ended its right-to-work law in 2024.',
  resume: `Michigan's minimum wage is ${rate$(now)} an hour in 2026 for employers with two or more employees aged 16 and over, and the statutory schedule takes it to ${rate$(next.rate)} on ${day(next.from)}. For a full-time worker, that next step is worth about ${usd(raise)} a year. Tipped employees can be paid ${rate$(tip)} an hour in cash, 40 percent of the minimum, as long as tips make up the rest; that share rises each year. Overtime is time and a half after 40 hours in a workweek. Since February 21, 2025, the Earned Sick Time Act gives one hour of paid sick time for every 30 hours worked, usable up to ${S.sickLeave.capHours} hours a year at larger employers and 40 at small businesses. Michigan has no paid family leave program and no break law for adults, and it is no longer a right-to-work state.`,
  body: (h) => `
<h2>A wage schedule written into law</h2>
<p>Michigan's increases come from the Improved Workforce Opportunity Wage Act, whose schedule the Department of Labor and Economic Opportunity publishes in advance. The rate went from $12.48 to ${rate$(now)} in January 2026 and will reach ${rate$(next.rate)} in January 2027. The tipped wage climbs at the same time, as a rising share of the full minimum: 40 percent in 2026, 42 percent in 2027 and more after that. Two groups have lower floors. Minors aged 16 and 17 may be paid 85 percent of the minimum, and employers may pay a training wage of ${rate$(F.youthWage)} to new hires under 20 for their first 90 days.</p>
${h.mini('raiseTimeline', stateArg('Michigan'))}
<h2>Earned sick time, now for nearly everyone</h2>
<p>The Earned Sick Time Act took effect for employers with 11 or more employees on February 21, 2025, and small businesses with 10 or fewer started accruing on October 1, 2025. The rule is one hour for every 30 hours worked. A full-time worker earns about ${num(Math.floor(sick.raw ?? 0))} hours over a year, of which a larger employer may cap use at ${S.sickLeave.capHours}; a small business can cap use at 40. Michigan has no paid family leave insurance, so longer absences fall under the federal FMLA if you qualify.</p>
${h.mini('sickAccrual', stateArg('Michigan'))}
<h2>Overtime under the Michigan act</h2>
<p>The state act copies the federal threshold: time and a half after 40 hours in a fixed workweek of seven days, with no daily overtime. An assembler paid $18 who works five 9-hour shifts is owed 5 hours at time and a half, ${rate$(27)} an hour, for ${usd(ot.total)} that week. Michigan has no salary level of its own for exempt jobs, so the federal ${usd(F.exemptWeekly)} a week applies, together with the federal duties tests. Employers with fewer than two employees aged 16 or older fall outside the state act, though the federal law may still cover them.</p>
<h2>The end of right-to-work</h2>
<p>Michigan's private-sector right-to-work law was repealed and the repeal took effect in 2024, so a union contract covering private-sector workers may again require a fee as a condition of employment. ${h.a('right-to-work-states', 'The list of right-to-work states')} shows where the rule still applies.</p>
<h2>Paychecks, vacation and breaks</h2>
<p>When a job ends, by dismissal or resignation, wages are due on the regular payday for the pay period in which the job ended. Vacation is a fringe benefit under Michigan law, paid out only if the written policy or contract says so. Adults have no statutory meal or rest break; workers under 18 cannot work more than five hours without a documented 30-minute break. For other states' break rules, see ${h.a('break-laws-by-state', 'break laws by state')}.</p>`,
  faqs: [
    { q: 'When does Michigan minimum wage go to $15?', a: `On ${day(next.from)}, under the schedule of the Improved Workforce Opportunity Wage Act. The rate is ${rate$(now)} until then. The tipped cash wage rises at the same time, from 40 to 42 percent of the minimum. Minors aged 16 and 17 may still be paid 85 percent of the full rate.` },
    { q: 'How many sick hours do Michigan employees get?', a: `Employees earn one hour of paid sick time for every 30 hours worked under the Earned Sick Time Act. Employers with 11 or more employees may cap use at ${S.sickLeave.capHours} hours a year; small businesses with 10 or fewer may cap it at 40 hours. Small businesses began accruing on October 1, 2025, larger employers on February 21, 2025.` },
    { q: 'Is Michigan still a right-to-work state?', a: 'No. The private-sector right-to-work law was repealed, with effect in 2024. A union contract may again require workers it covers to pay a fee as a condition of employment. Public employees are governed by separate rules. Michigan remains an at-will state, so jobs can be ended without cause unless a contract or a law says otherwise.' },
  ],
  related: ['state:ohio', 'state:indiana', 'state:wisconsin', 'paid-sick-leave-by-state', 'right-to-work-states', 'minimum-wage-increases'],
});
