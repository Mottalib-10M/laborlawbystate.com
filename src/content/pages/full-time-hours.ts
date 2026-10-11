import { definePage } from '../../lib/page-types';
import { ACA, F, FM, STATES, hoursCheck, fullTimeAt, highest, mwNow, names, num, usd, rate$ } from '../../lib/kit';

const daily = STATES.filter((s) => s.overtime.dailyHours != null);
const top = highest(1)[0];
const yr40 = hoursCheck(F.otWeeklyHours);
const yr30 = hoursCheck(ACA.fullTimeWeekly);
const fed = fullTimeAt(F.minWage);
const topPay = top ? fullTimeAt(mwNow(top.slug)) : null;
const bls = 35;
const rows = [30, 32, 35, 37.5, 40, 45].map((h) => {
  const x = hoursCheck(h);
  return [`${num(h, h % 1 ? 1 : 0)} hours`, num(x.monthly, 1), num(x.yearly), x.acaFullTime ? 'Yes' : 'No', h >= bls ? 'Yes' : 'No', num(x.overtimeHours, 1)];
});

export default definePage({
  id: 'full-time-hours',
  group: 'hours',
  kind: 'guide',
  order: 10,
  slug: 'how-many-hours-is-full-time',
  nav: 'How many hours is full time',
  card: `The ${ACA.fullTimeWeekly}, ${bls} and ${F.otWeeklyHours} hour lines, what each one triggers, and why no single law settles it.`,
  title: `Full-Time Hours 2026: ${ACA.fullTimeWeekly} for Benefits, ${F.otWeeklyHours} for Overtime`,
  description: `How many hours is full time in 2026? ${ACA.fullTimeWeekly} a week (${ACA.fullTimeMonthly} a month) for employer health coverage, ${F.otWeeklyHours} before overtime, ${bls} in federal statistics. Check your schedule.`,
  h1: 'How many hours is full time? The answer depends on the law asking',
  intro: 'There is no single legal number. Health coverage, overtime and government statistics each draw the line somewhere different.',
  resume: `Full time has no general definition in federal labor law: the Department of Labor says it is a matter generally determined by the employer. Three numbers matter in practice. For employer health coverage under the Affordable Care Act, a full-time employee is someone with an average of at least ${ACA.fullTimeWeekly} hours of service a week, or ${ACA.fullTimeMonthly} hours in a month, and large employers must offer coverage to those workers or risk a tax payment. For pay, ${F.otWeeklyHours} hours is the line after which a non-exempt employee earns time and a half, whatever the job is called. For statistics, the Bureau of Labor Statistics counts anyone who usually works ${bls} hours or more as full time. Most employers set their own threshold for benefits somewhere between ${ACA.fullTimeWeekly} and ${F.otWeeklyHours} hours. A ${F.otWeeklyHours}-hour week adds up to ${num(yr40.yearly)} hours a year, which is the standard used to turn an hourly rate into an annual salary.`,
  mini: 'fullTime',
  body: (h) => `
<h2>Why the Fair Labor Standards Act stays silent</h2>
<p>The federal wage law was written around hours, not job categories. It requires the minimum wage for every hour and overtime after ${F.otWeeklyHours} in a workweek, and it applies the same way to someone on a 12-hour schedule and someone on 50. The ${h.src('dolFullTime', 'Department of Labor page on full-time employment')} spells it out: whether an employee is full time or part time does not change how the law applies. So when a job posting says full time, it is describing the employer's own policy, and the label only matters where a benefit plan, a union contract or another statute attaches consequences to it.</p>
<p>That is why a 32-hour position can be full time at one company and part time at another. Retailers and hospitals often set their benefit line at ${ACA.fullTimeWeekly} or 32 hours, offices at ${bls} or ${F.otWeeklyHours}. Check the handbook definition before accepting a reduced schedule, because a drop of a few hours can move you out of health insurance, paid holidays or a retirement match.</p>
<h2>The ${ACA.fullTimeWeekly}-hour line for health coverage</h2>
<p>The one federal definition with teeth comes from the Affordable Care Act. According to the ${h.src('irsFullTime', 'IRS')}, a full-time employee for a calendar month is one with at least ${ACA.fullTimeWeekly} hours of service a week on average, or ${ACA.fullTimeMonthly} hours of service in the month. The rule binds applicable large employers, which must offer affordable coverage to most full-time staff or face the employer shared responsibility payment.</p>
<p>Two details surprise people. First, hours of service include paid time off: vacation, holidays, sick days, jury duty and paid leave count, unlike the hours test of the FMLA, which counts only time worked. Second, employers may measure status month by month or use a look-back method, averaging hours over a measurement period of several months and then locking in full-time status for a later stability period. A seasonal surge in December may therefore not change your status until the next stability period begins. ${yr30.yearly ? `At exactly ${ACA.fullTimeWeekly} hours a week, the year adds up to ${num(yr30.yearly)} hours, or ${num(yr30.monthly, 1)} a month on average, just above the monthly line.` : ''}</p>
${h.table(['Hours per week', 'Per month (avg.)', 'Per year', 'Full time for ACA', `Full time in BLS data (${bls}+)`, 'Weekly overtime hours'], rows, 'What common schedules count as under each federal yardstick (52 weeks)', ['l', 'r', 'r', 'l', 'l', 'r'])}
<h2>The ${F.otWeeklyHours}-hour week and overtime</h2>
<p>${F.otWeeklyHours} hours is not the definition of full time, but it is where federal overtime starts: non-exempt workers earn ${num(F.otMultiplier, 1)} times their regular rate for each hour beyond it in a workweek. ${daily.length ? `A few states add a daily limit, so a long shift can trigger overtime even in a short week: ${names(daily)} in the data.` : ''} The ${h.a('overtime-laws-by-state', 'overtime rules by state')} show where those daily lines sit. An employer cannot avoid overtime by calling someone part time; the count of hours in the week is what decides. Salaried employees who pass the salary and duties tests of an exemption are the exception, and the ${h.a('exempt-vs-non-exempt', 'exempt guide')} explains those tests.</p>
<h2>The ${bls}-hour line in government statistics</h2>
<p>When the monthly jobs report says how many Americans work full time, it uses the ${h.ext('https://www.bls.gov/cps/definitions.htm', 'Current Population Survey definition')}: people who usually work ${bls} hours or more a week, across all jobs. That definition is for counting, not for rights. Nobody gains or loses a benefit because of it, but it explains why surveys and news stories often use ${bls} hours as the dividing line, and why a 37.5-hour office week is commonly treated as full time.</p>
<h2>What a full-time schedule pays at minimum wage</h2>
<p>Annual salary comparisons assume ${F.otWeeklyHours} hours a week for 52 weeks, ${num(yr40.yearly)} hours in all. At the federal minimum of ${rate$(F.minWage)}, that is ${usd(fed.weekly)} a week and ${usd(fed.annual)} a year before taxes. ${top && topPay ? `At the highest state rate on this site, ${rate$(mwNow(top.slug))} in ${top.name}, the same schedule pays ${usd(topPay.annual)} a year.` : ''} The ${h.a('minimum-wage-by-state', 'minimum wage table')} gives the figure for every state. For FMLA purposes, a full-time schedule passes the ${num(FM.hours)}-hour test in well under a year; the ${h.a('fmla-eligibility', 'eligibility guide')} shows how long it takes from the first day.</p>
<h2>Two jobs, shifting schedules and salaried roles</h2>
<p>Hours at separate employers are not added together for any of the legal lines. Someone with two jobs of 25 hours each works 50 hours a week, yet neither employer owes overtime and neither has to treat that person as full time for health coverage, because each one counts only its own hours. Only the statistics combine them: the survey asks about all jobs, so that same worker shows up as full time in the national data. The picture changes when two businesses are so intertwined that they are joint employers, a question the Wage and Hour Division decides on the facts.</p>
<p>Variable schedules are handled by averaging. A restaurant server whose hours swing between 22 and 38 a week can still be full time for health coverage if the average over the employer's measurement period reaches ${ACA.fullTimeWeekly}. New hires expected to work full time must generally be treated that way from the start, while those whose hours are genuinely unpredictable can be measured for a while first.</p>
<p>For salaried exempt staff, full time usually means the hours the job demands, with no overtime pay. The salary still has to reach the federal minimum of ${usd(F.exemptWeekly)} a week, or a higher state level, for the exemption to hold. A salaried employee placed on a reduced schedule keeps the exemption only if the salary stays above that floor.</p>
<h2>Full time under state law</h2>
<p>A few state statutes use the term for specific purposes, such as eligibility for a state benefit or the scheduling rules of a city ordinance, but none of them sets a general definition for private employment. Paid sick leave laws and paid family leave programs count hours or wages, not status, so a part-time employee accrues and qualifies on the same basis as a full-time one. If a reduction of your hours seems aimed at taking away coverage, the ${h.a('part-time-hours', 'part-time guide')} explains what still applies, and the state labor agency on ${h.a('states', 'your state page')} answers questions about state rules.</p>`,
  faqs: [
    { q: 'Is 32 hours a week considered full time?', a: `It can be. No federal labor law fixes a full-time number, so many employers treat 32 hours as full time for benefits. For employer health coverage under the Affordable Care Act, 32 hours a week is above the ${ACA.fullTimeWeekly}-hour line, so a large employer must count you as full time. Federal statistics, which use ${bls} hours, would count you as part time.` },
    { q: 'How many hours a year is a full-time job?', a: `The standard is ${num(yr40.yearly)} hours: ${F.otWeeklyHours} hours a week for 52 weeks. Payroll and salary conversions use that figure, including paid holidays and vacation. Someone who works ${F.otWeeklyHours} hours a week but takes two unpaid weeks off works ${num(F.otWeeklyHours * 50)} hours. For employer health coverage, ${ACA.fullTimeWeekly} hours a week, or ${num(yr30.yearly)} hours a year, is already full time.` },
    { q: 'Do paid holidays count toward ACA full-time hours?', a: `Yes. The IRS counts hours of service, which include each hour you are paid or entitled to pay for work and for time off such as vacation, holidays, illness, jury duty and paid leave. A week with a paid holiday and ${ACA.fullTimeWeekly - 8} hours of work therefore counts as ${ACA.fullTimeWeekly} hours. Unpaid time off does not count toward the ${ACA.fullTimeMonthly}-hour monthly measure.` },
    { q: 'Can my employer cut my hours to avoid giving me benefits?', a: `Generally yes, if the cut is not discriminatory or retaliatory. Employers decide schedules, and dropping someone below their own benefit threshold or below the ${ACA.fullTimeWeekly}-hour ACA line is usually lawful. A cut that punishes you for taking protected leave, filing a wage complaint or reporting a safety problem is different and can be unlawful retaliation. An employment lawyer can look at the facts.` },
  ],
  related: ['part-time-hours', 'fmla-eligibility', 'overtime-laws-by-state', 'exempt-vs-non-exempt', 'minimum-wage-by-state'],
  sources: ['dolFullTime', 'irsFullTime', 'fs23'],
  extraSources: [{ name: 'Bureau of Labor Statistics: Current Population Survey definitions (full time: 35 hours or more a week)', url: 'https://www.bls.gov/cps/definitions.htm' }],
});
