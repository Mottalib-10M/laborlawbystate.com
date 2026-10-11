import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, otCalc, day, breakShift, rate$, usd, F, FM, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('west-virginia');
const mw = mwNow('west-virginia');
const amt = (s: string | null | undefined, i = 0) => Number([...(s ?? '').matchAll(/\$(\d+(?:\.\d+)?)/g)][i][1]);
const trainee = amt(S.minWage.other);
const since = S.minWage.rates2026[0].note!.match(/since (.+?\d{4})/)![1];
const yState = fullTimeAt(mw).annual;
const yFed = fullTimeAt(F.minWage).annual;
const gap = yState - yFed;
const br = S.breaks;
const shift = breakShift('west-virginia', 8);
const va27 = mw2027('virginia')!.rate;
const welder = otCalc('west-virginia', 24, 10, 5);

export default defineStatePage({
  slug: 'west-virginia',
  title: `West Virginia Labor Laws 2026: ${rate$(mw)}, Frozen Since 2016`,
  description: `West Virginia in 2026: ${rate$(mw)} an hour at employers with six or more workers at one site, ${usd(gap)} a year over the federal floor, and a ${br.mealMinutes}-minute meal rule.`,
  intro: 'West Virginia has kept the same minimum wage for a decade, applies it only to employers above a headcount line and requires meal time on long days.',
  resume: `West Virginia's minimum wage is ${rate$(mw)} an hour in 2026, the same figure in force since ${since}, and no change has been announced. It binds only employers with six or more employees at one separate, permanent location; smaller businesses owe the federal ${rate$(F.minWage)} if the Fair Labor Standards Act covers them. Over a full-time year that line is worth ${usd(gap)}: ${usd(yState)} at the state rate against ${usd(yFed)} at the federal one. New workers under 20 can be paid a training wage of ${rate$(trainee)} for up to 90 days, and tipped employees can have up to 70 percent of the minimum covered by tips. Overtime is time and a half after ${S.overtime.weeklyHours} hours a week. There is no state paid sick leave or paid family leave. A workday of six hours or more carries at least ${br.mealMinutes} minutes for a meal, unless breaks or eating on the job are already allowed. Whether you quit or are fired, final wages are due by the next regular payday.`,
  body: (h) => `
<h2>A decade at ${rate$(mw)}</h2>
<p>The figure in West Virginia Code 21-5C-2 has not changed since ${since}. Unlike states that index their rate to inflation every January, West Virginia needs the Legislature to amend the statute before the number can move, and as of this check no amendment had been passed. The result is a rate that sits ${rate$(mw - F.minWage)} above the federal one and has stood still while Virginia, across the eastern border, has written ${rate$(va27)} into law for ${day(mw2027('virginia')!.from)}. For a worker at the minimum, the legal floor in 2026 is exactly where it stood ten years earlier. ${h.a('minimum-wage-by-state', 'The state-by-state wage table')} shows where the rate now ranks.</p>
${h.mini('stateCompare', stateArg('West Virginia'))}
<h2>The six-employee test</h2>
<p>The state minimum wage law defines an employer as one with six or more employees during any calendar week in one separate, distinct and permanent location or business establishment. The count is per site, not per company. A family restaurant with five staff falls outside the state law and owes only the federal ${rate$(F.minWage)}, and then only when the FLSA reaches it. A franchise owner with three locations of four workers each is in the same position, while a single store with six workers on the payroll that week owes ${rate$(mw)}. The ${h.ext('https://code.wvlegislature.gov/21-5C-1/', 'definitions section')} spells out the test. For a full-time worker the difference comes to ${usd(gap)} a year, so it is worth knowing which side of the line your workplace sits on.</p>
<h2>Overtime and the 80 percent carve-out</h2>
<p>State law requires time and a half after ${S.overtime.weeklyHours} hours in a workweek, the same threshold as the federal rule, with no daily overtime. Its overtime section does not apply to an employer when 80 percent of its employees are covered by the federal overtime law; the FLSA then governs. Either way the arithmetic is identical. A welder paid $24 an hour who works five ten-hour days earns ${usd(welder.total)} for the week, ${usd(welder.otPay)} of it for ${welder.otHours} overtime hours. Salaried staff are measured against the federal exemption level of ${usd(F.exemptWeekly)} a week, since West Virginia sets no higher figure.</p>
<h2>Meal time, vacation and the last check</h2>
<p>West Virginia is one of the states with a written meal rule for adults. During a workday of six hours or more, the employer must make at least ${br.mealMinutes} minutes available for meals, unless employees already get breaks or may eat while working. On an eight-hour shift that means ${shift.meals ? `one ${shift.mealMinutes}-minute meal` : 'a meal period'} and no required rest break. Vacation is treated through the definition of wages: accrued fringe benefits that can be calculated and are payable directly to the employee count as wages, but the amount follows the agreement between employer and employee, including any conditions it sets. Final wages, for those who quit and those who are discharged alike, are due on or before the next regular payday. Unpaid leave rests on the federal FMLA, open to eligible employees at employers with ${FM.employerEmployees} or more workers. Jobs in West Virginia are held at will.</p>
${h.mini('shiftBreaks', stateArg('West Virginia'))}`,
  faqs: [
    { q: 'Does the West Virginia minimum wage apply to a small business?', a: `Only if it has six or more employees at one location in a calendar week. Below that line the state law does not apply, and the employer owes the federal ${rate$(F.minWage)} if the Fair Labor Standards Act covers it. At or above the line, the rate is ${rate$(mw)} an hour. The count is made per separate, permanent establishment, so a chain of small shops may fall outside the state law.` },
    { q: 'How long is a lunch break by law in West Virginia?', a: `At least ${br.mealMinutes} minutes during any workday of six hours or more. The rule applies to adults, but an employer does not have to add a separate meal break if employees already receive breaks during the day or are allowed to eat while working. West Virginia has no paid rest break requirement. Questions about missed meal time go to the Wage and Hour Section of the Division of Labor.` },
    { q: 'Is unused vacation paid when I leave a job in West Virginia?', a: 'It depends on the agreement. West Virginia counts accrued fringe benefits that can be calculated and are payable directly to the employee as wages, but the amount is figured under the employer-employee agreement. If that agreement makes vacation payable only on certain conditions, those conditions apply. Wages due, including any vacation owed, must be paid by the next regular payday.' },
    { q: 'When will West Virginia raise its minimum wage?', a: `No increase has been enacted. The rate of ${rate$(mw)} has applied since ${since}, and because it is not indexed to inflation, only a change to the state code can raise it. Employers with fewer than six employees at one site remain subject to the federal ${rate$(F.minWage)} when the FLSA covers them. Check the Division of Labor before each January.` },
  ],
  related: ['state:virginia', 'state:pennsylvania', 'state:ohio', 'state:kentucky', 'state:maryland', 'minimum-wage-by-state'],
});
