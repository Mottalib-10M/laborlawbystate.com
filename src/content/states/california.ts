import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, otCalc, rate$, usd, usdx, day, F, fullTimeAt } from '../../lib/kit';
import { cityArg, stateArg } from '../../lib/mini-args';

const S = sd('california');
const now = mwNow('california');
const next = mw2027('california')!;
const top = [...S.localMinWages].sort((a, b) => b.rate - a.rate)[0];
const ex = S.overtime.exemptSalaryWeekly!;
const shift = otCalc('california', 20, 10, 5);
const fed = otCalc('texas', 20, 10, 5);
const pfl = S.familyLeave;

export default defineStatePage({
  slug: 'california',
  title: `California Labor Laws 2026: ${rate$(now)} Wage, Daily Overtime`,
  description: `California labor laws in 2026: ${rate$(now)} minimum wage (${rate$(next.rate)} in 2027), overtime after 8 hours a day, ${S.localMinWages.length} city rates up to ${rate$(top.rate)}, paid leave and meal breaks.`,
  intro: 'The state with the most rules for hourly workers: a daily overtime clock, a meal and rest schedule with a penalty hour, local wages above the state rate and pay due the day you are let go.',
  resume: `California's minimum wage is ${rate$(now)} an hour in 2026 for every employer, whatever its size, and it rises to ${rate$(next.rate)} on ${day(next.from)}. Tipped workers receive the full rate before tips, because the state allows no tip credit. Overtime is counted by the day as well as by the week: time and a half after 8 hours in a workday or 40 in a workweek, double time after 12 hours in a day, plus a special rule for the seventh consecutive day. Salaried staff must earn at least ${usdx(ex)} a week, twice the minimum wage for full-time work, to be treated as exempt. Workers earn one hour of paid sick leave for every 30 hours worked, State Disability Insurance pays Paid Family Leave for up to ${pfl.maxWeeks} weeks, and a fired employee must be paid in full, unused vacation included, at the moment of dismissal.`,
  body: (h) => `
<h2>Overtime by the day, not only by the week</h2>
<p>Most states look only at the weekly total. California also starts the overtime clock every morning. Take a warehouse worker paid $20 an hour who works four 10-hour shifts and one 10-hour Saturday: 50 hours in all. Under the federal rule alone that week pays ${usd(fed.total)}. California counts 2 overtime hours on each of the five days, and the week comes to ${usd(shift.total)}, the same here because the daily hours also total 10. The difference shows on uneven weeks: three 13-hour shifts total only 39 hours, under the federal threshold, yet in California each of those days carries 4 hours at time and a half and 1 hour at double time.</p>
${h.mini('stateCompare', stateArg())}
<h2>A state rate, then a city rate</h2>
<p>Cities and counties may set their own minimum wage, and ${S.localMinWages.length} large ones do. ${top.name} pays ${rate$(top.rate)}, and several Bay Area and Los Angeles County cities raise their rate every July 1 rather than in January. The local figure applies to the hours you work inside the city limits, so a delivery driver who spends part of the day in Emeryville and part in Oakland is owed each rate for the time spent there. Long Beach is a trap for comparisons: it has no general city minimum wage, only a rate for hotel workers. Two industries have their own statewide floors as well, $20 for workers at large fast-food chains and a tiered scale for health care facilities.</p>
${h.mini('cityCompare', cityArg())}
<h2>Meal and rest breaks that cost the employer an hour</h2>
<p>A shift of more than 5 hours carries a 30-minute unpaid meal period, and a second one after 10 hours, each of which can be waived only in the narrow cases the Labor Code allows. Rest breaks are paid: 10 minutes for every 4 hours or major fraction of 4. When an employer does not provide a required break, it owes the worker one extra hour of pay at the regular rate for each day the meal period was missed, and another for missed rest breaks. The Labor Commissioner explains both premiums in its ${h.ext('https://www.dir.ca.gov/dlse/faq_mealperiods.htm', 'meal period')} and ${h.ext('https://www.dir.ca.gov/dlse/faq_restperiods.htm', 'rest period')} guidance.</p>
<h2>Leaving a job</h2>
<p>A dismissed worker is owed every wage, including earned vacation, on the last day. Someone who quits without notice must be paid within 72 hours, and on the last day if they gave 72 hours' notice. Vacation cannot be lost under a use-it-or-lose-it policy, although an employer may cap how much accrues. When an employer pays late on purpose, the Labor Commissioner can award a ${h.ext('https://www.dir.ca.gov/dlse/faq_paydays.htm', 'waiting time penalty')} of a day of wages for each day late, up to 30 calendar days. ${h.a('final-paycheck-laws', 'The final paycheck calculator')} dates the deadline from your last day.</p>
<h2>Leave beyond the FMLA</h2>
<p>The California Family Rights Act protects up to 12 weeks of leave at employers with 5 or more employees, far below the federal threshold of 50, and Paid Family Leave replaces roughly 70 to 90 percent of wages, up to ${usdx(pfl.maxWeeklyBenefit2026!)} a week, while it lasts. Paid sick leave can be capped at 40 hours or 5 days of use a year, whichever is more, and several cities, Los Angeles and San Francisco among them, require more.</p>`,
  faqs: [
    { q: 'How much is the California minimum wage in 2027?', a: `It rises to ${rate$(next.rate)} an hour on ${day(next.from)}, up from ${rate$(now)} in 2026. The Department of Finance certifies the new rate each summer from inflation, and the Department of Industrial Relations announces it. Many cities set a higher rate of their own, so check your city first. The exempt salary floor follows the state rate and rises at the same time.` },
    { q: 'Do I get double time in California after 12 hours?', a: 'Yes. Non-exempt employees earn twice the regular rate for every hour beyond 12 in a single workday, and for every hour beyond 8 on the seventh consecutive day of work in a workweek. Hours between 8 and 12 in a day, and the first 8 hours of a seventh consecutive day, are paid at time and a half. These rules apply on top of the weekly 40-hour threshold.' },
    { q: 'Can a California employer pay tipped workers less than minimum wage?', a: `No. California does not allow a tip credit, so servers, bartenders and other tipped employees must receive at least the full ${rate$(now)} an hour, or the higher local rate, before any tips. Tips come on top of that wage, and a higher city rate replaces the state rate where one applies, also with no tip credit.` },
    { q: 'When must I get my last paycheck if I am fired in California?', a: 'Immediately, at the time of the dismissal, including pay for all earned and unused vacation. If you quit without notice, the employer has 72 hours; if you gave at least 72 hours of notice, you are owed your wages on your last day. Willful delays can bring waiting time penalties of a day of wages for each day late, up to 30 days.' },
  ],
  related: ['state:oregon', 'state:nevada', 'state:arizona', 'overtime-laws-by-state', 'city-minimum-wage', 'break-laws-by-state'],
});
