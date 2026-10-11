import { defineStatePage } from '../../lib/page-types';
import { sd, mwOn, mw2027, rate$, usd, usdx, day, F, FM, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('new-york');
const down = 'Rest of state';
const metro = 'New York City, Long Island and Westchester';
const hi = mwOn('new-york', '2026-10-11', metro)!;
const lo = mwOn('new-york', '2026-10-11', down)!;
const next = mw2027('new-york');
const pfl = S.familyLeave;
const ex = S.overtime.exemptSalaryWeekly!;

export default defineStatePage({
  slug: 'new-york',
  title: `New York Labor Laws 2026: ${rate$(hi)} Minimum Wage, PFL, Breaks`,
  description: `New York labor laws in 2026: ${rate$(hi)} downstate and ${rate$(lo)} upstate, no raise in 2027, ${pfl.maxWeeks} weeks of Paid Family Leave, sick leave, final pay and meal breaks.`,
  intro: 'Two minimum wages, a 2027 freeze, a paid leave insurance program and a meal rule tied to the clock: what a private-sector worker in New York is owed.',
  resume: `New York has two general minimum wages in 2026: ${rate$(hi)} an hour in New York City, Long Island and Westchester, and ${rate$(lo)} everywhere else in the state, both in force since January 1, 2026. They will not rise on January 1, 2027, because the Department of Labor found that an inflation off-ramp written into the law was triggered, so ${next ? rate$(next.rate) : 'the same rate'} stays the figure for next year. A full-time job at the downstate rate pays ${usd(fullTimeAt(hi).annual)} a year before taxes. Overtime starts after 40 hours a week, and salaried managers must earn at least ${usdx(ex)} a week upstate to be exempt, far above the federal ${usd(F.exemptWeekly)}. Every employer must offer paid sick leave, and Paid Family Leave replaces part of your pay for up to ${pfl.maxWeeks} weeks, with a 2026 maximum of ${usdx(pfl.maxWeeklyBenefit2026!)} a week.`,
  body: (h) => `
<h2>Why New York has two minimum wages and a freeze for 2027</h2>
<p>The Labor Law splits the state into a downstate zone, made of the five boroughs, Nassau, Suffolk and Westchester, and the rest of the state. The gap between them is ${rate$(hi - lo)} an hour in 2026. The statute that set the 2024 to 2026 steps also tied later raises to inflation, with brakes: if certain economic indicators turn, the increase is skipped. For January 1, 2027 the Department of Labor announced that one of those conditions was met, so the general rates stay where they are. Home care aides are the exception and still get their scheduled raise. A worker in Albany or Buffalo therefore keeps ${rate$(lo)} for at least another year, which matters for budgeting and for anyone comparing an offer upstate with one in Yonkers.</p>
${h.mini('stateCompare', stateArg())}
<h2>Overtime and the salary test that catches many office jobs</h2>
<p>Time and a half after 40 hours a week applies to nearly every hourly employee, and residential employees who live in reach overtime after 44. The state test for exempt executive and administrative staff is a weekly salary, ${usdx(ex)} upstate in 2026 and higher downstate, as the table below shows. A coordinator paid ${usd(55000)} a year in Rochester is under that line, so the job title does not matter: hours past 40 must be paid at time and a half. Farm workers are on a separate path, with a weekly threshold that is falling in steps until it reaches 40 in 2032.</p>
<h2>Leave: sick days, prenatal hours and Paid Family Leave</h2>
<p>Sick leave accrues at one hour per 30 worked from the first day, and how much of it is paid depends on the size of the employer, from unpaid hours at the smallest firms to ${S.sickLeave.capHours} paid hours at employers with 100 or more employees. Since 2025 every employer also owes 20 hours of paid prenatal leave a year, separate from sick time. Paid Family Leave is an insurance program funded by a payroll deduction: it pays a share of your average weekly wage while you bond with a new child, care for a seriously ill relative or handle a military family need, and your job is protected even when the federal FMLA would not cover you because your employer is small or you have not yet worked ${FM.hours.toLocaleString('en-US')} hours. Your own illness is handled by the separate disability benefits program.</p>
<h2>Leaving a job in New York</h2>
<p>Whether you quit or are let go, the last wages are due by the next regular payday for the pay period in which the job ended. Accrued vacation is owed unless your employer told you in writing that unused days are forfeited, so read the handbook before your last week. If the money does not arrive, the Division of Labor Standards takes wage claims at no cost, and ${h.a('final-paycheck-laws', 'the final paycheck calculator')} shows how other states compare.</p>
<h2>The lunch rule that depends on the time of day</h2>
<p>New York does not require short rest breaks for adults, but it does require a meal period: a shift of more than six hours that runs through the window from 11 a.m. to 2 p.m. carries an uninterrupted half hour, taken inside that window. Night and early shifts have their own meal periods. These rules apply to adults in most industries; ${h.a('break-laws-by-state', 'break laws in other states')} are often looser.</p>`,
  faqs: [
    { q: 'Will the New York minimum wage go up in January 2027?', a: `No. The Department of Labor announced that an off-ramp condition in the law was met, so the general rates stay at ${rate$(hi)} in New York City, Long Island and Westchester and ${rate$(lo)} in the rest of the state on January 1, 2027. Home care aides still receive their scheduled increase. The state may revisit the off-ramp, so check the Department of Labor page before each January.` },
    { q: 'How much does New York Paid Family Leave pay in 2026?', a: `It pays 67% of your average weekly wage, capped at 67% of the state average weekly wage, which gives a maximum of ${usdx(pfl.maxWeeklyBenefit2026!)} a week in 2026. You can take up to ${pfl.maxWeeks} weeks to bond with a child, care for a relative with a serious health condition or handle a military family need. Your job and health insurance are protected while you are on leave.` },
    { q: 'Do I get a lunch break if I work 7 hours in New York?', a: 'Yes, if the shift runs from before 11 a.m. through 2 p.m. A shift of more than six hours that covers that window carries an uninterrupted meal period of at least 30 minutes, taken between 11 a.m. and 2 p.m. Shifts that start later or run overnight have their own meal periods. The meal can be unpaid if you are fully relieved of duty.' },
    { q: 'Is unused vacation paid when I leave a job in New York?', a: 'Usually yes. The Department of Labor says accrued vacation must be paid at separation unless the employer gave you a written policy saying that unused time is forfeited. If your handbook says nothing, the hours are owed with your last wages, which are due by the next regular payday for the period in which the job ended.' },
  ],
  related: ['state:new-jersey', 'state:connecticut', 'state:pennsylvania', 'paid-family-leave-by-state', 'salary-exempt-threshold', 'minimum-wage-by-state'],
});
