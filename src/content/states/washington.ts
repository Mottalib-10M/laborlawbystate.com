import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, exemptTest, breakShift, rate$, usd, usdx, day, listOf, F, FM, fullTimeAt } from '../../lib/kit';
import { cityArg, stateArg } from '../../lib/mini-args';

const S = sd('washington');
const mw = mwNow('washington');
const next = mw2027('washington')!;
const amt = (s: string | null | undefined, i = 0) => Number([...(s ?? '').matchAll(/\$(\d+(?:\.\d+)?)/g)][i][1]);
const loc = S.localMinWages;
const top = [...loc].sort((a, b) => b.rate - a.rate)[0];
const sea = loc.find((l) => l.name === 'Seattle')!;
const sea27 = amt(sea.note);
const seaGap = fullTimeAt(sea.rate).annual - fullTimeAt(mw).annual;
const tiered = listOf(loc.filter((l) => /employees/.test(l.note ?? '')).map((l) => (l.name.startsWith('King County') ? 'unincorporated King County' : l.name)));
const ex = S.overtime.exemptSalaryWeekly!;
const ex27small = 2.25 * next.rate * 40;
const ex27large = 2.5 * next.rate * 40;
const salary = 75000;
const test = exemptTest('washington', salary / 52);
const shift = breakShift('washington', 10);
const sl = S.sickLeave;
const fl = S.familyLeave;
const premNote = S.notes.find((n) => /premium/.test(n.text))!.text;
const prem = Number(premNote.match(/(\d+\.\d+)%/)![1]);
const empShare = Number(premNote.match(/employees (\d+\.\d+)%/)![1]);
const weekly = 1200;

export default defineStatePage({
  slug: 'washington',
  title: `Washington Labor Law 2026: ${rate$(mw)}, Seattle ${rate$(sea.rate)}, PFML`,
  description: `Washington in 2026: ${rate$(mw)} statewide (${rate$(next.rate)} in 2027), ${loc.length} local rates up to ${rate$(top.rate)}, a ${usdx(ex)} weekly exempt salary, paid rest breaks and ${fl.maxWeeks} weeks of PFML.`,
  intro: 'Washington stacks a high state wage, a salary test tied to it, city rates around Seattle and a paid leave insurance program with job protection.',
  resume: `Washington's minimum wage is ${rate$(mw)} an hour in 2026, and the Department of Labor & Industries has announced ${rate$(next.rate)} for ${day(next.from)}. There is no tip credit: servers and bartenders earn the full rate before tips, and tips and service charges belong to the worker. ${loc.length} local governments set higher rates, topping out at ${rate$(top.rate)} in ${top.name}, while Seattle's ${rate$(sea.rate)} covers every employer in the city. Overtime follows the ${S.overtime.weeklyHours}-hour week, but the salary needed to be exempt is 2.25 times the minimum wage for 40 hours, which works out to ${usdx(ex)} a week, far above the federal ${usd(F.exemptWeekly)}. Paid sick leave accrues at one hour per ${sl.accrualPerHours} hours worked for everyone. Paid Family and Medical Leave replaces up to 90 percent of weekly pay, capped at ${usdx(fl.maxWeeklyBenefit2026!)} a week in 2026, for up to ${fl.maxWeeks} weeks. Adults are owed a paid ten-minute rest for each four hours and a 30-minute meal.`,
  body: (h) => `
<h2>The salary line that moves with the wage</h2>
<p>Washington's rarest rule is the one that decides who can be paid a salary with no overtime. Instead of a fixed dollar figure, WAC 296-128-545 sets the threshold as a multiple of the state minimum wage for a 40-hour week: 2.25 times in 2026 for employers of every size, or ${usdx(ex)} a week. In 2027 the multiple splits by employer size. At the announced ${rate$(next.rate)} rate, the level becomes ${usdx(ex27small)} a week at employers with 50 or fewer employees and ${usd(ex27large)} at larger ones. A project coordinator on ${usd(salary)} a year earns ${usd(salary / 52)} a week, short of the 2026 line by ${usd(test.gap * 52)} a year, so hours past 40 must be paid at time and a half whatever the job title says. The duties tests still apply on top of the salary test.</p>
${h.mini('exemptCheck', stateArg('Washington'))}
<h2>City rates around Puget Sound</h2>
<p>Local wages cluster south and north of Seattle, and most of them depend on who employs you. ${tiered} set tiers by employer size, so two cashiers on the same street can have different floors. SeaTac's rate applies only to hospitality and transportation employers, while Bellingham, near the Canadian border, uses a single rate for everyone. Seattle has announced ${rate$(sea27)} for 2027. Full time in Seattle pays ${usd(seaGap)} a year more than the same job at the state rate. The local figure applies to hours worked inside the city limits.</p>
${h.mini('cityCompare', cityArg())}
<h2>Tips, rest breaks and the three-hour rule</h2>
<p>Tips and service charges cannot count toward the hourly minimum, and the employer must hand them over to the employees. Breaks follow WAC 296-126-092: a paid ten-minute rest period for each four hours, with no more than three hours of work without one, and a 30-minute meal period that starts between the second and fifth hour, so nobody works more than five hours in a row without eating. On a ten-hour shift that comes to ${shift.meals} meal period and ${shift.rests} paid rest periods. The ${h.ext(S.breaks.source!.url, 'rule text')} is short and worth reading in full.</p>
<h2>Paid leave, sick hours and the final paycheck</h2>
<p>Paid Family and Medical Leave pays up to 90 percent of weekly pay for ${fl.maxWeeks} weeks of family or medical leave, up to 16 weeks combined when more than one qualifying event occurs, and 18 when a pregnancy complication causes incapacity. Since January 1, 2026, job protection reaches employees of companies with 25 or more workers in Washington after 180 days, well below the ${FM.employerEmployees}-employee federal threshold. The 2026 premium is ${prem}% of gross wages up to the Social Security cap; at employers with 50 or more employees the worker's share is ${empShare}%. On ${usd(weekly)} a week the total premium is ${usdx((weekly * prem) / 100)}, and the employee pays ${usdx(Math.round(weekly * prem * empShare / 100) / 100)} of it. Sick leave starts at one hour per ${sl.accrualPerHours} hours, usable 90 calendar days after hire, and up to 40 unused hours carry over. Whether you quit or are let go, wages are due at the end of the established pay period. ${h.a('paid-family-leave-by-state', 'Other state paid leave programs')} use different caps.</p>`,
  faqs: [
    { q: 'What will the Washington minimum wage be in 2027?', a: `${rate$(next.rate)} an hour from ${day(next.from)}, as announced by the Department of Labor & Industries in September 2026, up from ${rate$(mw)}. Workers aged 14 and 15 may be paid 85 percent of the adult rate. Several cities set more: Seattle has announced ${rate$(sea27)} for 2027. The exempt salary level rises with the state rate, and it splits by employer size in 2027.` },
    { q: 'How much salary do I need to be exempt in Washington in 2026?', a: `At least ${usdx(ex)} a week, which is 2.25 times the state minimum wage for a 40-hour week and applies whatever the employer's size. That equals ${usd(ex * 52)} a year. Earning the salary is not enough on its own: the job duties must also meet the executive, administrative or professional tests. If either test fails, overtime is owed after 40 hours in a workweek.` },
    { q: 'Do Washington employers have to give paid rest breaks?', a: 'Yes. Adults are owed a paid rest period of at least ten minutes for each four hours of work, and no one may work more than three hours without a rest period. A 30-minute meal period must start between the second and fifth hour of the shift. The meal can be unpaid if you are relieved of duty. L&I enforces these rules and investigates complaints.' },
    { q: 'Is my job protected while on Washington Paid Leave?', a: 'Likely yes, if you work for a company with 25 or more employees in Washington and have been there at least 180 days, under the rule in force since January 1, 2026. The federal FMLA may protect you as well if you meet its own conditions. Benefits and job protection are separate questions, and an employment lawyer can look at the facts of a disputed return to work.' },
  ],
  related: ['state:oregon', 'state:idaho', 'state:california', 'city-minimum-wage', 'salary-exempt-threshold', 'break-laws-by-state'],
});
