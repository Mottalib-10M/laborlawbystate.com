import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, F, fullTimeAt, breakShift } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('kentucky');
const mw = mwNow('kentucky');
const tip = S.minWage.tipped.cashWage!;
const br = S.breaks;
const shift8 = breakShift('kentucky', 8);
const shift12 = breakShift('kentucky', 12);
const year = fullTimeAt(mw).annual;
const rate = 16, perDay = 6.5;
const weekHours = perDay * 7;
const weeklyOnly = rate * F.otWeeklyHours + rate * F.otMultiplier * (weekHours - F.otWeeklyHours);
const seventh = rate * perDay * 6 + rate * F.otMultiplier * perDay;

export default defineStatePage({
  slug: 'kentucky',
  title: `Kentucky Labor Laws 2026: Paid Rest Breaks and ${rate$(mw)} Wage`,
  description: `Kentucky workplace law in 2026: ${br.restMinutes} paid minutes of rest every ${br.restPerHours} hours, a lunch window, ${rate$(mw)} an hour (${usd(year)} a year full time) and seventh-day overtime.`,
  intro: 'Kentucky keeps the federal wage but gives workers something most states do not: paid rest breaks and a set window for lunch.',
  resume: `Kentucky is one of the few states that require breaks for adults: a paid rest period of at least ${br.restMinutes} minutes for every ${br.restPerHours} hours worked, plus a reasonable lunch period that starts no sooner than three hours and no later than five hours into the shift. The minimum wage is ${rate$(mw)} an hour in 2026, worth ${usd(year)} for a full-time year, and the statute raises it automatically if the federal rate goes up; no change is announced for 2027. Tipped employees may be paid ${rate$(tip)} in cash when tips bring them to ${rate$(mw)}. Overtime is time and a half after 40 hours a week, and an employee permitted to work all seven days of a workweek earns time and a half on the seventh. Final wages are due by the next normal pay period or within 14 days, whichever comes later, and vested vacation counts as wages.`,
  body: (h) => `
<h2>Ten paid minutes every four hours, and lunch in the middle</h2>
<p>Federal law requires no breaks at all, and most states add nothing for adults. Kentucky's statute says no employer may require an employee to work four hours without a rest period of at least ${br.restMinutes} minutes, and the employer may not cut pay for it. The rest period comes in addition to the lunch period. On an 8-hour shift that means ${shift8.rests} paid rest breaks; a 12-hour hospital or plant shift carries ${shift12.rests}. Lunch must be a reasonable period, scheduled as close to the middle of the shift as possible, and an employee cannot be sent to lunch sooner than three hours after starting or later than five hours. The statute does not fix the length of lunch, so the employer sets it within that reasonable standard.</p>
<h2>Overtime on the seventh day</h2>
<p>Kentucky follows the 40-hour weekly rule, and KRS 337.050 adds a seventh-day rule: an employer who permits an employee to work all seven days of a workweek pays time and a half for the time worked on the seventh day, when the week also passes 40 hours. Picture a grocery distribution worker at $${rate} an hour who works ${perDay} hours a day, seven days straight, for ${weekHours} hours. Counting only hours past 40 gives ${usd(weeklyOnly)} for the week. Paying the whole seventh day at time and a half gives ${usd(seventh)}. The state overtime statute excludes employees of retail stores and of restaurants, hotels and motels, but they keep federal overtime whenever their employer is covered by the FLSA. Exempt salaried staff need at least the federal ${usd(F.exemptWeekly)} a week.</p>
<h2>Vacation that has vested is part of your pay</h2>
<p>Kentucky's definition of wages includes vested vacation pay, alongside salaries and commissions. Whether your unused days have vested depends on the employer's written policy or agreement, which is why two workers leaving the same week from different companies can get very different checks. If the policy treats vacation as earned and vested, it must be paid with the final wages.</p>
${h.mini('ptoPayout', stateArg('Kentucky'))}
<h2>The last paycheck and union fees</h2>
<p>When a job ends, by dismissal or resignation, the employer must pay what is owed by the next normal pay period after the last day or within 14 days of it, whichever date is later. If your last day is a Monday and payday falls that Friday, the employer still has until the fourteenth day. Kentucky has been a right-to-work state since January 9, 2017: no employee can be required to join a union or pay dues to keep a job. The Office of Workplace Standards in the Education and Labor Cabinet enforces the wage and hour law, and ${h.a('break-laws-by-state', 'a comparison of break laws')} shows how unusual Kentucky's rest rule is.</p>`,
  faqs: [
    { q: 'Are rest breaks paid in Kentucky?', a: `Yes. Kentucky requires a rest period of at least ${br.restMinutes} minutes for every ${br.restPerHours} hours worked, and the statute forbids any reduction in pay for it, so the break is paid. It is separate from the lunch period. An 8-hour shift therefore includes ${shift8.rests} paid rest breaks plus a lunch scheduled between the third and fifth hour of work.` },
    { q: 'When is lunch required in Kentucky?', a: 'Kentucky law requires a reasonable lunch period, placed as near the middle of the shift as possible. An employer cannot require you to take it sooner than three hours after your shift starts or later than five hours after. The statute does not set a length in minutes, so the employer decides what counts as reasonable. The rest periods of ten minutes every four hours come on top of this lunch.' },
    { q: 'How long does a KY employer have to pay my final wages?', a: 'Until the next normal pay period after your last day or 14 days after it, whichever is later. The rule is the same whether you were dismissed or quit. Vacation that is vested under the employer\'s policy counts as wages and must be included. The Office of Workplace Standards in the Education and Labor Cabinet takes wage complaints.' },
  ],
  related: ['state:indiana', 'state:ohio', 'state:tennessee', 'state:west-virginia', 'break-laws-by-state', 'pto-payout-laws'],
});
