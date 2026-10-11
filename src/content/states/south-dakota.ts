import { defineStatePage } from '../../lib/page-types';
import { mwNow, rate$, usd, usdx, F, FM, fullTimeAt, otCalc, tippedCash } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const mw = mwNow('south-dakota');
const cash = tippedCash('south-dakota')!;
const year = fullTimeAt(mw).annual;
const gapFed = fullTimeAt(mw).annual - fullTimeAt(F.minWage).annual;
const shift = 25;
const tips = 140;
const floor = shift * mw;
const got = shift * cash + tips;
const add = Math.max(0, floor - got);
const ot = otCalc('south-dakota', 18, 8, 6);

export default defineStatePage({
  slug: 'south-dakota',
  title: `South Dakota Minimum Wage 2026: ${rate$(mw)}, Indexed Each Year`,
  description: `South Dakota pays ${rate$(mw)} an hour in 2026, ${usd(gapFed)} a year above the federal rate at full time, with a tipped wage of half that and no state overtime or break law.`,
  intro: 'South Dakota indexes its wage to prices every year and leaves almost everything else to federal rules.',
  resume: `South Dakota's minimum wage is ${rate$(mw)} an hour since January 1, 2026, and it changes on a fixed formula: it follows the cost of living every year, any increase is rounded up to the next 5 cents, and the rate can never go down. That puts a full-time job at ${usd(year)} a year, ${usd(gapFed)} more than at the federal ${rate$(F.minWage)}. Tipped employees receive half the minimum, ${rate$(cash)} an hour, and the employer must make sure tips bring them to ${rate$(mw)}. Beyond the wage, the state adds little: no overtime statute, so the federal ${F.otWeeklyHours}-hour week applies; no paid sick leave; no paid family leave program; and no meal or rest break requirement for adults. Final wages are due by the next regular payday, or once company property is returned if that comes later. The 2027 rate had not been announced when this page was checked.`,
  body: (h) => `
<h2>A wage that only moves up</h2>
<p>The Department of Labor and Regulation recalculates the minimum each year from the cost of living, and the statute adds two features that favor workers. The increase is rounded up, never down, to the nearest 5 cents, and a falling price index cannot lower the rate. As of this check, the department had not yet published a 2027 number, so ${rate$(mw)} is the only confirmed rate. State law (SDCL 60-11-4.1) also allows a training wage, but the general rate covers most private jobs. Over a year, ${rate$(mw)} gives ${usd(year)} on a 40-hour schedule and ${usd(fullTimeAt(mw, 30).annual)} on 30 hours a week. Each annual step lifts the general and the tipped figures together, because the second is defined as half of the first, so a server's base pay moves on the same date as everyone else's.</p>
${h.mini('tipTopUp', stateArg('South Dakota'))}
<h2>Tipped pay at half the minimum</h2>
<p>South Dakota ties the tipped cash wage to the general rate: half of it, which gives ${rate$(cash)} an hour in 2026. That is well above the federal ${rate$(F.tippedCash)} and rises automatically with each annual adjustment. The employer remains responsible for the gap. A bartender who works ${shift} hours in a week and collects ${usd(tips)} in tips has ${usdx(got)} from cash wages and tips; the law requires ${usdx(floor)}, so the employer owes another ${usdx(add)}. The calculator above runs the same comparison for your own hours. ${h.a('tipped-minimum-wage', 'Tipped minimum wages by state')} put the half-rate rule in context.</p>
<h2>Overtime and breaks under federal rules</h2>
<p>The department says it plainly: South Dakota has no labor law on overtime or comp time. The federal Fair Labor Standards Act fills the space for covered employers. A cook paid $18 an hour on six 8-hour shifts works 48 hours and earns ${usdx(ot.total)}, of which ${usdx(ot.otPay)} is the time-and-a-half portion for the ${ot.otHours} hours past ${F.otWeeklyHours}. There is also no state rule requiring meal periods or rest breaks; federal law only says that short breaks an employer chooses to give are paid time. Salaried employees need at least ${usd(F.exemptWeekly)} a week, plus the duties test, to be exempt.</p>
<h2>Final pay, leave and unions</h2>
<p>Whether you quit or are fired, everything earned is due by the next regular payday. If you hold company tools, keys or equipment, the employer can wait until you return them. The state has not issued a rule on paying out unused vacation in the pages we read, so the employer's policy is the place to look. Leave rights come from the federal FMLA, which gives up to ${FM.weeks} weeks of unpaid job protection to eligible workers at employers with ${FM.employerEmployees} or more employees. State law guarantees that no one has to join a union or pay it to keep a job, and employment is at will. For a disputed paycheck, the Division of Labor and Management is the state contact. ${h.a('right-to-work-states', 'Right-to-work states')} lists the others.</p>`,
  faqs: [
    { q: 'What is the South Dakota minimum wage in 2026?', a: `It is ${rate$(mw)} an hour, in force since January 1, 2026. South Dakota adjusts the rate every year for the cost of living, rounding any increase up to the nearest 5 cents, and the rate cannot fall. Tipped workers get half the minimum in cash, ${rate$(cash)}, with tips required to make up the rest. Full time at that rate comes to ${usd(year)} a year before taxes.` },
    { q: 'Does South Dakota require overtime pay?', a: `Not under state law. South Dakota has no overtime or comp time statute, so overtime comes from the federal Fair Labor Standards Act: time and a half after ${F.otWeeklyHours} hours in a workweek for non-exempt employees of covered employers. There is no daily overtime, so a 10-hour day inside a 40-hour week is paid at the regular rate. Salaried staff must also pass the federal salary and duties tests to be exempt.` },
    { q: 'Can my SD employer hold my last paycheck until I return equipment?', a: 'It can delay it. South Dakota requires final wages to be paid by the next regular payday whether you quit or are fired, but if you have employer property, the wages can be held until you return it, if that happens later. Returning keys, uniforms or tools promptly keeps the deadline at the next payday. The Division of Labor and Management answers questions about final pay.' },
  ],
  related: ['state:north-dakota', 'state:nebraska', 'state:minnesota', 'state:montana', 'tipped-minimum-wage', 'minimum-wage-increases'],
});
