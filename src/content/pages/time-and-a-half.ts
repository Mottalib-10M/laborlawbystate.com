import { definePage } from '../../lib/page-types';
import { STATES, F, sd, highest, otRule, mwNow, rate$, usd, num, names } from '../../lib/kit';

const has = (slug: string) => STATES.some((s) => s.slug === slug);
const m = F.otMultiplier;
const top = highest(1)[0];
const topRate = mwNow(top.slug);
const nm = (x: { slug: string; name: string }) => (x.slug === 'district-of-columbia' ? 'the District of Columbia' : x.name);
const dbl = STATES.filter((s) => s.overtime.doubleTime);
const daily = STATES.filter((s) => s.overtime.dailyHours);
const caDD = has('california') ? otRule('california').dailyDouble : null;
const noComp = STATES.filter((s) => /comp(ensatory)? time/i.test(s.overtime.note ?? ''));
/* Worked examples (hypotheses, not official figures). */
const ex = { rate: 22, hours: 46 };
const exOt = ex.hours - F.otWeeklyHours;
const exPay = ex.rate * F.otWeeklyHours + ex.rate * m * exOt;
const bn = { rate: 18, hours: 45, bonus: 90 };
const bnRegular = (bn.rate * bn.hours + bn.bonus) / bn.hours;
const bnPremium = (m - 1) * bnRegular * (bn.hours - F.otWeeklyHours);
const bnWrong = bn.rate * bn.hours + bn.bonus + (m - 1) * bn.rate * (bn.hours - F.otWeeklyHours);
const sal = { weekly: 900, hours: 40, worked: 48 };
const salRate = sal.weekly / sal.hours;
const yearly = { rate: 20, ot: 5, weeks: 50 };

export default definePage({
  id: 'time-and-a-half',
  group: 'overtime',
  kind: 'guide',
  order: 20,
  slug: 'time-and-a-half',
  nav: 'Time and a half',
  card: `How much time and a half pays on your rate, and what goes into the regular rate the law multiplies.`,
  title: `Time and a Half 2026: ${m} x Your Regular Rate, With Examples`,
  description: `Time and a half in 2026: ${m} times your regular rate for hours over ${F.otWeeklyHours} a week, ${rate$(F.minWage * m)} at the federal minimum. Worked examples with bonuses, salary and tips.`,
  h1: 'Time and a half: how much an overtime hour pays',
  intro: 'Time and a half is the legal minimum for an overtime hour, but the rate it multiplies is often more than your hourly wage. The calculator does the arithmetic on your own figures.',
  resume: `Time and a half means ${m} times your regular rate of pay for each overtime hour. On a wage of ${rate$(20)} an hour that is ${rate$(20 * m)}; on ${rate$(ex.rate)} it is ${rate$(ex.rate * m)}; at the federal minimum of ${rate$(F.minWage)} it is ${rate$(F.minWage * m)}, and at the ${rate$(topRate)} rate in ${nm(top)} it is ${rate$(topRate * m)}. Federal law requires it for every hour over ${F.otWeeklyHours} in a workweek for non-exempt employees, and ${names(daily)} also require it after a set number of hours in one day. The rate multiplied is not always the posted wage: the regular rate is your total pay for the week, including shift differentials, commissions and promised bonuses, divided by the hours worked. So a worker with a production bonus earns more per overtime hour than the hourly wage suggests. A ${ex.hours}-hour week at ${rate$(ex.rate)} pays ${usd(exPay)}, of which ${usd(ex.rate * m * exOt)} is overtime.`,
  mini: 'timeHalf',
  body: (h) => `
<h2>The arithmetic, step by step</h2>
<p>Start with the regular rate, multiply it by ${m} to get the overtime rate, and multiply that by the overtime hours. For an hourly worker with no extras, the regular rate is the hourly wage. A cook paid ${rate$(ex.rate)} who works ${ex.hours} hours in a week has ${exOt} overtime hours. The first ${F.otWeeklyHours} hours pay ${usd(ex.rate * F.otWeeklyHours)}, the ${exOt} overtime hours pay ${rate$(ex.rate * m)} each, or ${usd(ex.rate * m * exOt)}, and the week totals ${usd(exPay)}. The extra half alone, the premium the law adds on top of straight time, is worth ${usd(ex.rate * (m - 1) * exOt)} that week.</p>
<p>Over a year the premium adds up. Someone earning ${rate$(yearly.rate)} who works ${yearly.ot} overtime hours a week for ${yearly.weeks} weeks earns ${usd(yearly.rate * m * yearly.ot * yearly.weeks)} in overtime pay, ${usd(yearly.rate * (m - 1) * yearly.ot * yearly.weeks)} more than the same hours at straight time. That is why the classification of a job, exempt or not, is worth checking before accepting a salary.</p>
${h.table(['Hourly rate', 'Time and a half', 'Double time', '5 overtime hours'], [F.minWage, 12, 15, 18, 20, 25, 30, 40, topRate].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b).map((r) => [rate$(r), rate$(r * m), rate$(r * 2), usd(r * m * 5, 2)]), 'Overtime rates for common hourly wages, including the federal minimum and the highest state rate', ['r', 'r', 'r', 'r'])}
<h2>What counts in the regular rate</h2>
<p>Federal regulations define the regular rate as an hourly figure drawn from what the employee is actually paid: total pay for the workweek, minus a short list of exclusions, divided by the hours actually worked. That list of inclusions is wider than most people expect. Shift differentials for nights or weekends count. Commissions count. Bonuses count when they are promised in advance or tied to production, attendance, safety or quality, because they are not left to the employer's discretion. Only a few items stay out: reimbursed expenses, the premium part of overtime already paid, true premiums for weekend or holiday work, gifts, discretionary bonuses decided at the employer's sole discretion near the end of the period, and pay for time not worked such as vacation, holidays or sick days.</p>
<p>Here is how a bonus changes the result. A warehouse worker earns ${rate$(bn.rate)} an hour, works ${bn.hours} hours and receives a ${usd(bn.bonus)} production bonus for the week. The regular rate is ${usd(bn.rate * bn.hours + bn.bonus)} divided by ${bn.hours} hours, or ${rate$(bnRegular)}. Straight time for all hours plus the bonus is already paid, so the employer owes an extra half of ${rate$(bnRegular)} for the ${bn.hours - F.otWeeklyHours} overtime hours, ${usd(bnPremium, 2)}. A payroll that ignores the bonus pays only ${usd(bnWrong, 2)} for the week instead of ${usd(bn.rate * bn.hours + bn.bonus + bnPremium, 2)}. The gap looks small for one week, and it is exactly the kind of error that adds up in back-pay claims.</p>
<h2>Salaried and non-exempt</h2>
<p>A salary does not cancel the right to overtime. Many salaried employees are non-exempt because their duties or their pay fail the exemption tests, and they are owed time and a half like anyone else. When a salary is paid for a fixed schedule, the regular rate is the weekly salary divided by the hours it is meant to cover. A coordinator paid ${usd(sal.weekly)} a week for a ${sal.hours}-hour schedule has a regular rate of ${rate$(salRate)}; working ${sal.worked} hours in one week earns ${sal.worked - F.otWeeklyHours} overtime hours at ${rate$(salRate * m)}, or ${usd(salRate * m * (sal.worked - F.otWeeklyHours))} on top of the salary. ${h.a('exempt-vs-non-exempt', 'The exempt vs non-exempt guide')} explains which salaried jobs fall on each side.</p>
<h2>Tipped workers, double time and other twists</h2>
<p>For a tipped employee, the overtime rate is computed on the full minimum wage, not on the reduced cash wage. Under federal law that gives ${rate$(F.minWage * m)}, from which the employer may subtract the same ${rate$(F.tipCredit)} tip credit as for regular hours, leaving at least ${rate$(F.minWage * m - F.tipCredit)} in cash per overtime hour. ${h.a('tipped-minimum-wage', 'The tipped minimum wage guide')} has the state figures.</p>
<p>Double time is twice the regular rate. Federal law never requires it. ${dbl.length ? `${names(dbl)} ${dbl.length > 1 ? 'do' : 'does'}${caDD ? `, for hours beyond ${caDD} in a day in California` : ''}, and some union contracts and employer policies add it on holidays.` : 'Some union contracts and employer policies add it on holidays.'} Hours paid at double time are not paid again at time and a half: each hour gets one premium, the higher one.</p>
<p>Overtime pay belongs on the regular payday for the pay period in which the workweek ends. Federal rules allow a delay only when the amount cannot be worked out in time, and then no later than the next payday after it can be computed.${noComp.length ? ` In ${names(noComp)}, state law also says outright that a private employer cannot swap overtime pay for compensatory time off later.` : ''} Shifting hours inside the same workweek is lawful, so a manager can send someone home early on Friday after a long Monday to keep the week at ${F.otWeeklyHours} hours.</p>
<h2>Paid days off and the ${F.otWeeklyHours}-hour line</h2>
<p>The threshold counts hours actually worked. A paid holiday, a vacation day or a sick day puts money in the check but adds nothing to the hours that trigger overtime, because pay for time not worked is excluded from the regular rate calculation. Take a week with a paid Monday holiday and four 10-hour days: the check covers 48 paid hours, yet only 40 were worked, so no time and a half is due under federal law. ${has('montana') ? 'Montana writes the same point into its own rules, stating that holiday, sick and vacation hours do not count toward the 40. ' : ''}Some employers count paid leave toward overtime anyway, by policy or under a union contract, and that is lawful because it pays more than the minimum. The reverse is not: an employer cannot label worked hours as something else to keep the total under the line.</p>
<h2>Reading your pay stub</h2>
<p>A correct stub shows straight hours and overtime hours on separate lines, each with its rate. Check three things. The overtime rate should be at least ${m} times your hourly wage, and higher in any week with a promised bonus or a shift differential. The overtime hours should match the hours over ${F.otWeeklyHours} in each workweek, not in the pay period, since a two-week check can hide a 50-hour week next to a 30-hour week. And in a state with daily overtime, long days should show up even when the week is short. Keep your own record of start and end times; it is the best evidence if the numbers do not match.</p>
<h2>Where state law changes the count</h2>
<p>The ${m} multiplier is the same everywhere; what varies is how many hours earn it. In ${names(daily)}, hours over a daily limit earn time and a half even when the week stays under ${F.otWeeklyHours}. ${has('minnesota') ? `Minnesota's own threshold is ${sd('minnesota').overtime.weeklyHours} hours, though the federal ${F.otWeeklyHours} still binds most employers there. ` : ''}${h.a('overtime-laws-by-state', 'The overtime laws by state page')} applies each state rule to a full week. If an employer pays straight time for hours that should earn the premium, the state labor agency or the Wage and Hour Division takes the claim and decides it on the payroll and time records.</p>`,
  faqs: [
    { q: 'What is time and a half of $20 an hour?', a: `${rate$(20 * m)} an hour. Multiply the regular rate by ${m}: ${rate$(20)} plus half of ${rate$(20)}, which is ${rate$(10)}. Five overtime hours at that rate pay ${usd(20 * m * 5)}, and a ${ex.hours}-hour week at ${rate$(20)} pays ${usd(20 * F.otWeeklyHours + 20 * m * exOt)} in total. If you also earn a promised bonus or a shift differential, the regular rate is higher and so is the overtime rate.` },
    { q: 'How do you calculate time and a half on a paycheck?', a: `Find the hours over ${F.otWeeklyHours} in the workweek, or over the daily limit in states that have one. Multiply your regular rate by ${m}, then by those hours. Add the result to straight pay for the other hours. If the pay includes bonuses or commissions, first divide the week's total pay by all hours worked to get the regular rate, then add half of it for each overtime hour.` },
    { q: 'Do bonuses count when calculating overtime pay?', a: 'Most do. Bonuses promised in advance or tied to production, attendance, safety or quality are part of the regular rate under federal law, so they raise the overtime rate for the weeks they cover. Only discretionary bonuses, where the employer decides both whether and how much to pay near the end of the period with no prior promise, are left out, along with gifts.' },
    { q: 'Do salaried employees get time and a half?', a: `Non-exempt salaried employees do. If your salary is below the exemption level, ${usd(F.exemptWeekly)} a week under federal law and more in some states, or your duties are not executive, administrative or professional, overtime is owed. The regular rate is the weekly salary divided by the hours it covers, and each hour past ${F.otWeeklyHours} earns ${m} times that figure.` },
    { q: 'Is time and a half the same as overtime?', a: `Usually. Time and a half is the minimum overtime rate under federal law and in every state, so most people use the words interchangeably. Overtime is the hours; time and a half is the price of each one. ${dbl.length ? `In ${names(dbl)}, the longest days are paid at double time instead, which is overtime too.` : 'Some contracts pay double time for certain hours, which is overtime too.'}` },
  ],
  related: ['overtime-laws-by-state', 'exempt-vs-non-exempt', 'salary-exempt-threshold', 'tipped-minimum-wage', 'state:california'],
  sources: ['fs23', 'cfr778107', 'cfr778109', 'cfr778105', 'cfr778106', 'fs15'],
});
