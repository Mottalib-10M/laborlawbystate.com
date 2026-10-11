import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, otCalc, sickYear, sickStates, rate$, usd, num, day, F, FM, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('vermont');
const mw = mwNow('vermont');
const cash = S.minWage.tipped.cashWage!;
const amt = (s: string | null | undefined, i = 0) => Number([...(s ?? '').matchAll(/\$(\d+(?:\.\d+)?)/g)][i][1]);
const tipLine = amt(S.minWage.tipped.note);
const per = S.sickLeave.accrualPerHours!;
const cap = S.sickLeave.capHours!;
const fast = sickStates().filter((s) => s.sickLeave.accrualPerHours === 30).length;
const full = sickYear('vermont', 40);
const part = sickYear('vermont', 25);
const year = fullTimeAt(mw).annual;
const cookRate = 19;
const cook = otCalc('vermont', cookRate, 8, 6);
const ot = S.overtime.weeklyHours!;

export default defineStatePage({
  slug: 'vermont',
  title: `Vermont Labor Laws 2026: ${rate$(mw)} Wage, Sick Time 1 per ${per}`,
  description: `Vermont in 2026: ${rate$(mw)} an hour, ${rate$(cash)} for tipped staff, earned sick time of 1 hour per ${per} worked, 12 weeks of unpaid family leave, pay within 72 hours.`,
  intro: 'Vermont gives nearly every worker earned sick time, pegs the tipped wage at half the minimum and keeps its family leave unpaid but broad.',
  resume: `Vermont's minimum wage is ${rate$(mw)} an hour in 2026, and its earned sick time builds more slowly than in most states with a law: one hour for every ${per} hours worked, where ${fast} states use one hour per 30. The wage is indexed each January 1 to inflation, with any rise capped at 5 percent, and no 2027 figure had been published when this page was checked. Tipped staff in hotels, restaurants and tourist businesses who usually collect more than ${usd(tipLine)} a month in tips can be paid half the minimum, ${rate$(cash)}, as long as tips close the gap. Full time at the regular rate pays ${usd(year)} a year. Overtime is owed after ${ot} hours a week, but the state rule leaves out hotels, motels, restaurants and retail or service businesses, where the federal law may still apply. A fired worker must be paid within 72 hours, and since 2025 unpaid family leave also covers bereavement.`,
  body: (h) => `
<h2>Earned sick time at one hour per ${per}</h2>
<p>Vermont's earned sick time law has applied since ${day(S.sickLeave.effective!)} to employers of every size, but it protects only employees who average at least 18 hours a week, and seasonal jobs of 20 weeks or fewer sit outside it. The pace is slower than most. A full-time employee on 40 hours a week accrues ${num(full.accrued)} hours over a year, which is exactly the ${cap}-hour ceiling an employer may set for a 12-month period. A part-timer on 25 hours a week ends the year with ${num(Math.floor(part.accrued))} hours, roughly three working days. An employer may also make new hires wait up to one year before they use the time. Each hour off is paid at the greater of the employee's normal hourly rate or the minimum wage, so a tipped server does not drop to ${rate$(cash)} on a sick day; the floor is ${rate$(mw)}.</p>
${h.mini('sickAccrual', stateArg('Vermont'))}
<h2>Family leave: unpaid, but wider since Act 32</h2>
<p>Vermont runs no mandatory paid family leave insurance. Its Parental and Family Leave Act grants up to 12 weeks of unpaid, job-protected leave in a 12-month period, and Act 32 of 2025 widened the reasons it covers. Parental, bereavement, safe and qualifying exigency leave apply at employers with 10 or more employees; family leave for a relative's serious illness applies at 15 or more. The employee must have averaged 30 hours a week for 12 months. Bereavement leave is limited to two weeks, or 10 workdays, with no more than five in a row, and must be taken within a year of the death. Those headcounts sit far below the ${FM.employerEmployees} employees the federal FMLA requires, so a worker at a 20-person shop in Burlington can hold state protection that the federal statute would never give. The Department of Labor lists the categories on its ${h.ext(S.familyLeave.source!.url, 'Act 32 page')}.</p>
<h2>Tipped pay and the hospitality gap in overtime</h2>
<p>The tipped wage is written as one half of the state minimum, so it moves automatically with each January adjustment. Only employees of hotels, motels, tourist places and restaurants who customarily receive more than ${usd(tipLine)} a month in tips qualify, and the employer owes the difference for any hour where cash wage plus tips falls short of ${rate$(mw)}. Those same businesses are carved out of the state overtime rule. A line cook at a Stowe restaurant who works six eight-hour days gets no state overtime, yet the federal FLSA reaches most restaurants, so time and a half after ${F.otWeeklyHours} hours usually follows anyway. At a hypothetical $${cookRate} an hour, that week is worth ${usd(cook.total)}, of which ${usd(cook.otPay)} is the overtime premium on ${cook.otHours} hours. The state rule earns its keep where the federal law does not reach.</p>
<h2>The last paycheck and a meal rule with no clock</h2>
<p>A discharged employee must be paid within 72 hours. Someone who quits is paid on the last regular payday, or on the following Friday where there is no regular payday. Vermont's break statute is a single sentence: employers must give reasonable opportunities during work periods to eat and to use toilet facilities. It sets no length and no hour by which the meal must come, so what counts as reasonable depends on the job and the shift. Either side may end a Vermont job at will. Wage claims go to the Wage and Hour Program of the Department of Labor, which decides each claim on its own facts, and ${h.a('break-laws-by-state', 'states with fixed break schedules')} offer a useful contrast with this open wording.</p>`,
  faqs: [
    { q: 'How many sick hours do I earn in Vermont working 40 hours a week?', a: `About ${num(full.accrued)} hours a year. Vermont workers accrue one hour of earned sick time for every ${per} hours worked, and an employer may cap accrual at ${cap} hours in a 12-month period, so a full-time schedule reaches the cap right at the end of the year. You must average at least 18 hours a week to be covered, and a new employer may make you wait up to a year before using the time.` },
    { q: `Can a Vermont restaurant pay servers ${rate$(cash)} an hour?`, a: `Yes, if the server customarily receives more than ${usd(tipLine)} a month in tips and works in a hotel, motel, tourist place or restaurant. The cash wage is half the state minimum, ${rate$(cash)} in 2026, and tips must bring each hour up to ${rate$(mw)}. When they do not, the employer pays the difference. Sick time taken by a tipped worker is paid at no less than the full minimum wage.` },
    { q: 'Does Vermont have paid family leave in 2026?', a: `Vermont has no mandatory state paid family leave insurance for private-sector workers. What it has is unpaid, job-protected leave: up to 12 weeks in 12 months under the Parental and Family Leave Act, expanded in 2025 to bereavement, safe leave and qualifying exigency leave. Coverage starts at 10 employees for parental leave and 15 for family leave, well below the federal FMLA threshold of ${FM.employerEmployees}.` },
    { q: 'How long does a Vermont employer have to pay a fired worker?', a: 'Seventy-two hours from the discharge. Vermont law sets a shorter clock for firings than for resignations: an employee who quits is paid on the last regular payday, or on the following Friday if there is no regular payday. When the money is late, the Wage and Hour Program of the Department of Labor accepts claims for unpaid wages, and an employment lawyer can look at the facts of a disputed case.' },
  ],
  related: ['state:new-hampshire', 'state:massachusetts', 'state:new-york', 'paid-sick-leave-by-state', 'tipped-minimum-wage'],
});
