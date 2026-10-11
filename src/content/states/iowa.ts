import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, F, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('iowa');
const mw = mwNow('iowa');
const cash = S.minWage.tipped.cashWage!;
const credit = mw - cash;
const tips = 2;
const topUp = Math.max(0, mw - cash - tips);
const year = fullTimeAt(mw).annual;
const rate = 21, hours = 46;
const otPay = rate * F.otMultiplier * (hours - F.otWeeklyHours);
const week = rate * F.otWeeklyHours + otPay;

export default defineStatePage({
  slug: 'iowa',
  title: `Iowa Minimum Wage 2026: ${rate$(mw)} and a ${rate$(cash)} Tipped Floor`,
  description: `Iowa labor rules in 2026: ${rate$(mw)} an hour, a ${rate$(cash)} tipped cash wage, ${rate$(cash - F.tippedCash)} above the federal level, no state overtime law and final pay by the next payday.`,
  intro: 'Iowa matches the federal minimum but limits how much of it tips may cover, and sends overtime questions to Washington.',
  resume: `Iowa's general minimum wage is ${rate$(mw)} an hour in 2026, unchanged since 2008, and the state has no increase on the books for 2027; full time at that rate pays ${usd(year)} a year. The figure that stands out is the tipped wage: Iowa caps the tip credit at 40 percent of the minimum, so a server receiving tips must still get at least ${rate$(cash)} an hour in cash, against the federal ${rate$(F.tippedCash)}. The state also lets employers pay a lower rate during a worker's first 90 calendar days, although employers covered by the federal FLSA must still pay ${rate$(F.minWage)}. Iowa has no overtime statute of its own: the federal rule of time and a half after 40 hours applies, and the state wage unit refers overtime complaints to the U.S. Department of Labor. Final wages are due on the next regular payday, and vacation is paid out only under an employer policy.`,
  body: (h) => `
<h2>Tips can cover only part of the hour</h2>
<p>Federal law lets an employer count tips toward all but ${rate$(F.tippedCash)} of the minimum wage. Iowa is stricter: once an employee makes about $30 a month in tips, the employer may credit tips for no more than 40 percent of the minimum, which is ${rate$(credit)}, leaving a cash wage of ${rate$(cash)}. That is ${rate$(cash - F.tippedCash)} more per hour than the federal floor, or ${usd((cash - F.tippedCash) * 30)} over a 30-hour week. On a slow weekday shift where a bartender averages ${rate$(tips)} an hour in tips, cash wage plus tips reaches ${rate$(cash + tips)}, so the employer owes ${rate$(topUp)} more for each of those hours.</p>
${h.mini('tipTopUp', stateArg('Iowa'))}
<h2>The first 90 days and the smallest businesses</h2>
<p>Iowa Code 91D.1 allows a new-hire wage of $6.35 an hour until the employee completes 90 calendar days of employment. In practice the federal ${rate$(F.minWage)} overrides it for any employer covered by the FLSA, which includes most businesses with ${usd(F.enterpriseSales)} or more in yearly sales and many smaller ones whose staff handle interstate commerce. The state minimum wage also leaves out most enterprises grossing under $300,000 a year, with exceptions for laundries, construction, hospitals, schools and a few other sectors. A worker at a very small shop may therefore be outside the state law yet still protected by the federal one. When in doubt, the U.S. Department of Labor can tell you which law reaches your job.</p>
<h2>Overtime is a federal matter in Iowa</h2>
<p>The Iowa Department of Inspections, Appeals, and Licensing does not enforce overtime. Its wage page tells workers who think they are owed overtime to contact the U.S. Department of Labor's Wage and Hour office. The federal rule is time and a half after 40 hours in a workweek, with no daily threshold. A line cook in Des Moines earning $${rate} who works ${hours} hours is owed ${usd(otPay)} in overtime, for a gross week of ${usd(week)}. Salaried employees are exempt only if they earn at least ${usd(F.exemptWeekly)} a week and meet a duties test; see ${h.a('salary-exempt-threshold', 'the salary threshold for exempt employees')}.</p>
<h2>Paychecks, leave and breaks</h2>
<p>Whether you resign or are dismissed, the last paycheck is due on the next regularly scheduled payday. An employer needs your written consent before mailing a check. Unused vacation is owed only if the employer has a contract, policy or procedure to pay it to departing staff, and the state says plainly that Iowa law does not require employers to provide sick time, vacation pay or holiday pay. Adults have no state right to a meal break, but every employee must be allowed to use the toilet when needed, and minors under 16 get a 30-minute break when they work five hours or more in a day. ${h.a('break-laws-by-state', 'Break rules in other states')} go further.</p>`,
  faqs: [
    { q: 'What is the tipped minimum wage in Iowa in 2026?', a: `${rate$(cash)} an hour. Iowa limits the tip credit to 40 percent of the ${rate$(mw)} minimum wage, so an employer can count no more than ${rate$(credit)} of tips per hour. If cash wage plus tips falls short of ${rate$(mw)} for the workweek, the employer must pay the difference. The rule applies to employees who receive about $30 or more in tips a month.` },
    { q: 'Does Iowa have its own overtime law?', a: `No. Iowa has no state overtime statute, and the state wage office refers overtime complaints to the U.S. Department of Labor. The federal Fair Labor Standards Act requires time and a half after 40 hours in a workweek for non-exempt employees, and the exemption for salaried staff needs pay of at least ${usd(F.exemptWeekly)} a week plus qualifying duties.` },
    { q: 'Can an Iowa employer pay new hires less than minimum wage?', a: `Iowa law allows $6.35 an hour during an employee's first 90 calendar days. Most employers are also covered by the federal FLSA, though, and must pay at least ${rate$(F.minWage)} from the first hour. The lower state rate matters only for the rare employer that the federal law does not reach. Ask the U.S. Department of Labor if you are unsure which law applies.` },
  ],
  related: ['state:illinois', 'state:minnesota', 'state:missouri', 'state:nebraska', 'state:wisconsin', 'tipped-minimum-wage'],
});
