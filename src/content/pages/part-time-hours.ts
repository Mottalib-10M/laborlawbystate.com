import { definePage } from '../../lib/page-types';
import { ACA, F, FM, STATES, sickStates, pflStates, hoursCheck, fullTimeAt, num, usd, rate$, names } from '../../lib/kit';

const bls = 35;
const sick = sickStates();
const cnt = new Map<number, number>();
for (const s of sick) if (s.sickLeave.accrualPerHours) cnt.set(s.sickLeave.accrualPerHours, (cnt.get(s.sickLeave.accrualPerHours) ?? 0) + 1);
const usual = [...cnt.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0;
const minHours = sick.filter((s) => /hours a week|hours a year|days for the same employer/i.test(s.sickLeave.employerThreshold ?? ''));
const pfl = pflStates();
const fmlaWeekly = FM.hours / 52;
const under = ACA.fullTimeWeekly - 1;
const p20 = hoursCheck(20);
const p25 = hoursCheck(25);
const pay20 = fullTimeAt(F.minWage, 20);
const rows = [10, 15, 20, 24, 25, under].map((h) => {
  const x = hoursCheck(h);
  return [`${h} hours`, num(x.yearly), x.fmlaHours ? 'Met' : 'Not met', x.acaFullTime ? 'Full time' : 'Part time', usual ? num(x.yearly / usual, 1) : 'n/a', num(x.fte, 2)];
});

export default definePage({
  id: 'part-time-hours',
  group: 'hours',
  kind: 'guide',
  order: 20,
  slug: 'how-many-hours-is-part-time',
  nav: 'How many hours is part time',
  card: `Below ${ACA.fullTimeWeekly} hours for health coverage, below ${bls} in statistics: what a part-time schedule keeps and what it loses.`,
  title: `Part-Time Hours 2026: Under ${ACA.fullTimeWeekly} a Week and What It Changes`,
  description: `How many hours is part time in 2026? Under ${ACA.fullTimeWeekly} a week for employer health coverage, under ${bls} in federal data. Minimum wage, overtime and sick leave still apply.`,
  h1: 'How many hours is part time, and which rights come with it',
  intro: 'Part time is mostly an employer label. A few federal lines give it consequences, and most worker protections ignore it entirely.',
  resume: `Part time has no general legal definition in the United States, and the Department of Labor says the label does not change how federal wage law applies. Two numbers are used in practice. For employer health coverage under the Affordable Care Act, anyone averaging fewer than ${ACA.fullTimeWeekly} hours of service a week, and fewer than ${ACA.fullTimeMonthly} in a month, is not a full-time employee, so a large employer is not required to offer that person coverage. For statistics, the Bureau of Labor Statistics counts people who usually work under ${bls} hours a week as part time. Everything else depends on hours, not status: you earn at least the minimum wage for each hour, overtime after ${F.otWeeklyHours} hours in a week, and paid sick leave at the same accrual rate as full-time staff in states with a sick leave law. The FMLA is the federal right part-timers most often miss, because it needs ${num(FM.hours)} hours in a year, about ${num(fmlaWeekly, 1)} a week.`,
  mini: 'partTime',
  body: (h) => `
<h2>A label set by your employer</h2>
<p>The ${h.src('dolPartTime', 'Department of Labor page on part-time employment')} is short because the federal wage law says almost nothing on the subject. A part-time cashier and a full-time one are covered by the same minimum wage and the same overtime rule. What part-time status changes is the employer's own package: health insurance, paid holidays, vacation accrual, retirement contributions and scheduling priority are often tied to a threshold written in the handbook. Two employers on the same street can draw that line at different places, and nothing in federal law stops them, so the definition that matters for your benefits is the one in your offer letter or plan document.</p>
<h2>The thresholds that do have consequences</h2>
<p>Below ${ACA.fullTimeWeekly} hours of service a week on average, you are part time for the employer mandate of the Affordable Care Act, as the ${h.src('irsFullTime', 'IRS')} defines it. Hours of service include paid leave, so a week with a paid holiday counts the holiday hours. Large employers often keep part-time schedules a little under that line, at ${under} or 28 hours, precisely to stay out of the coverage requirement for those positions. If you are close to the line, track your hours, including paid time off, across the employer's measurement period.</p>
<p>The second threshold is the FMLA. Its ${num(FM.hours)}-hour test counts only time actually worked in the 12 months before leave. A steady 25-hour schedule reaches ${num(p25.yearly)} hours over a full year and passes, while 20 hours a week gives ${num(p20.yearly)} and does not. The table puts common part-time schedules against both lines and shows the paid sick leave they earn under the most common state accrual rate.</p>
${h.table(['Hours per week', 'Hours per year', `FMLA ${num(FM.hours)}-hour test`, 'ACA status', usual ? `Sick hours at 1 per ${usual} (before caps)` : 'Sick hours', 'Share of a 40-hour job'], rows, 'Part-time schedules against the federal thresholds (52 weeks)', ['l', 'r', 'l', 'l', 'r', 'r'])}
<h2>What part-time workers keep in full</h2>
<p>Pay rules apply hour by hour. You are owed at least the federal minimum of ${rate$(F.minWage)}, or the higher state or city rate, for every hour. A 20-hour week at the federal minimum pays ${usd(pay20.weekly)} before taxes, ${usd(pay20.annual)} over a year. Overtime starts at ${F.otWeeklyHours} hours in the workweek even if your contract calls you part time: an employee scheduled for 24 hours who covers extra shifts and reaches 44 earns time and a half for the last four. Hours at two unrelated employers are not combined, though, so two 25-hour jobs produce no overtime at either.</p>
<p>Paid sick leave works the same way. In the ${sick.length} jurisdictions on this site with a statewide law, ${names(sick)}, part-time staff earn leave on every hour worked, at the same ratio as full-time staff.${minHours.length ? ` A few laws set a minimum before coverage starts: the data shows such conditions in ${names(minHours)}.` : ''} State ${h.a('paid-family-leave-by-state', 'paid family and medical leave programs')} look at wages earned during a base period rather than a weekly schedule, so many part-timers qualify; ${pfl.length} jurisdictions covered here have one. Workplace safety, anti-discrimination law and unemployment insurance also cover part-time employees, although unemployment benefits are calculated from your earnings and may be small.</p>
<h2>Two part-time jobs compared with one full-time job</h2>
<p>Many people reach a full week by stacking two part-time jobs, and the law treats that very differently from one ${F.otWeeklyHours}-hour position. Each employer looks only at its own hours. With two 20-hour jobs, neither employer reaches the ${ACA.fullTimeWeekly}-hour line, so neither must offer health coverage. Neither job passes the FMLA hours test on its own, since each produces ${num(p20.yearly)} hours a year against the ${num(FM.hours)} required, which leaves you without federal job protection for a long medical absence at both. Overtime works the same way: 45 hours split between two employers creates no overtime pay at either.</p>
<p>Some protections do stack. Paid sick leave accrues separately at each job in a state with a sick leave law, so two 20-hour jobs ${usual ? `at one hour per ${usual} earn about ${num(p20.yearly / usual, 1)} hours a year each, and ${num((2 * p20.yearly) / usual, 1)} hours together, close to what one full-time job earns before any cap, with the advantage that each employer's cap applies only to its own bank` : 'each earn leave on their own hours'}. State paid family leave programs usually add the wages from both jobs when they compute your benefit, because they look at total covered earnings. Unemployment insurance can also take both into account if you lose one of the jobs, although rules on partial benefits differ from state to state. If you rely on two employers, keep a separate record of the hours at each, since every calculation starts from that number.</p>
<h2>What part-time status can cost you</h2>
<p>The losses are on the benefit side. Without the ACA full-time line, a large employer need not offer you health coverage, and many smaller employers offer none to anyone. Paid vacation and holiday pay are voluntary in federal law and are often reserved for full-time staff. Retirement plans have their own eligibility rules based on hours worked in a year, and your plan administrator can tell you the threshold that applies. Short schedules also take longer to reach the FMLA hours test or a seniority step. Ask human resources for the plan documents rather than relying on a summary.</p>
<h2>Moving between part time and full time</h2>
<p>An employer can usually change your hours without notice unless a contract, a union agreement or a local scheduling ordinance says otherwise. Some large cities require predictable schedules and advance notice for retail, food service and hospitality workers, and a few require offering extra hours to existing part-time staff before hiring new ones. If your hours are cut, check two consequences right away: whether you drop under the employer's benefit line, and whether your average for the year will still reach ${num(FM.hours)} hours if you may need medical or family leave. The ${h.a('full-time-hours', 'full-time guide')} covers the other side of the line, and your ${h.a('states', 'state page')} lists the local rules on minimum wage and leave.</p>`,
  faqs: [
    { q: 'Is 25 hours a week part time?', a: `Yes, under both common yardsticks. It is below the ${ACA.fullTimeWeekly}-hour average used for employer health coverage and below the ${bls}-hour line used in federal statistics. Your employer may still give part-time benefits at 25 hours. Over a full year, 25 hours a week is ${num(p25.yearly)} hours, enough for the FMLA hours test of ${num(FM.hours)}.` },
    { q: 'Do part-time employees get overtime pay?', a: `Yes, on the same terms as full-time employees. A non-exempt worker earns ${num(F.otMultiplier, 1)} times the regular rate for every hour over ${F.otWeeklyHours} in a workweek, whatever the job is called. Part-time status only matters for overtime in states with a daily limit, where a long shift can trigger it. Hours worked for two separate employers are not added together.` },
    { q: 'What is the maximum number of hours for a part-time job?', a: `No law sets one. For employer health coverage, a large employer can keep you part time only if your average stays under ${ACA.fullTimeWeekly} hours of service a week, or ${ACA.fullTimeMonthly} a month. Beyond that, the employer's own policy decides, and many employers draw their line in the low thirties. Minors are the exception: federal and state child labor laws cap their hours.` },
    { q: 'Can part-time workers take FMLA leave?', a: `Yes, if they have ${FM.months} months with the employer, ${num(FM.hours)} hours worked in the last 12 months and a worksite with ${FM.worksiteEmployees} employees within ${FM.radiusMiles} miles. The hours test is the hard part: it takes an average of about ${num(fmlaWeekly, 1)} hours a week across a full year. The leave is then counted in proportion to your normal schedule.` },
  ],
  related: ['full-time-hours', 'fmla-eligibility', 'paid-sick-leave-by-state', 'overtime-laws-by-state', 'minimum-wage-by-state'],
  sources: ['dolPartTime', 'irsFullTime', 'fs28'],
  extraSources: [{ name: 'Bureau of Labor Statistics: Current Population Survey definitions (part time: fewer than 35 hours a week)', url: 'https://www.bls.gov/cps/definitions.htm' }],
});
