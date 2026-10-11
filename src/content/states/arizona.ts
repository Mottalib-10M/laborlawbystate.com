import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, tippedCash, otCalc, sickYear, fullTimeAt, rate$, usd, day, F } from '../../lib/kit';
import { cityArg, stateArg } from '../../lib/mini-args';

const S = sd('arizona');
const now = mwNow('arizona');
const next = mw2027('arizona')!;
const cash = tippedCash('arizona')!;
const credit = now - cash;
const flag = S.localMinWages.find((l) => l.name === 'Flagstaff')!;
const tuc = S.localMinWages.find((l) => l.name === 'Tucson')!;
const flag27 = Number(flag.note!.match(/\$([\d.]+) on January 1, 2027/)![1]);
const gapYear = fullTimeAt(flag.rate).annual - fullTimeAt(now).annual;
const ot = otCalc('arizona', 18, 8, 6);
const sick = sickYear('arizona', 40);
const cap = S.sickLeave.capHours!;

export default defineStatePage({
  slug: 'arizona',
  title: `Arizona Wage Laws 2026: ${rate$(now)} State, ${rate$(flag.rate)} in Flagstaff`,
  description: `Arizona in 2026: ${rate$(now)} statewide, ${rate$(next.rate)} from January 2027, Flagstaff at ${rate$(flag.rate)} with no tip credit, a ${rate$(credit)} tip credit elsewhere, and earned sick time.`,
  intro: 'Arizona combines an inflation-indexed state wage, a mountain city that outpays it by several dollars and one of the smallest tip credits in the country.',
  resume: `Arizona's minimum wage is ${rate$(now)} an hour in 2026 and rises to ${rate$(next.rate)} on ${day(next.from)}, the yearly cost-of-living step that voters wrote into the Fair Wages and Healthy Families Act. Two cities go higher: Flagstaff pays ${rate$(flag.rate)}, with no tip credit at all, and Tucson ${rate$(tuc.rate)} inside city limits. Elsewhere, an employer may pay tipped staff ${rate$(cash)}, which means the tip credit can never exceed ${rate$(credit)} an hour. The same law gives every worker earned paid sick time at one hour per 30 hours worked, up to ${cap} hours a year at businesses with 15 or more employees and 24 hours at smaller ones. Arizona has no overtime statute for private employers, so the federal rule of time and a half after ${F.otWeeklyHours} hours a week applies, and the state requires no meal or rest breaks for adults. It is a right-to-work state, and a fired worker must be paid within seven working days.`,
  body: (h) => `
<h2>Flagstaff, where tips cannot reduce the wage</h2>
<p>Two Arizona cities run their own wage ordinances, Flagstaff and Tucson. Flagstaff's is the more striking: ${rate$(flag.rate)} an hour since ${day(flag.from)}, rising to ${rate$(flag27)} in January 2027, and every employee, tipped or not, must receive the full rate before gratuities. A full-time line cook in Flagstaff earns ${usd(gapYear)} more a year than a cook paid the state minimum in Phoenix. Tucson's ${rate$(tuc.rate)} is closer to the state figure and allows the same tip credit as state law, adjusted every year by the consumer price index. Tucson's rate applies within city limits, so an employer based in Marana or Oro Valley pays the state figure.</p>
${h.mini('cityCompare', cityArg())}
<h2>A tip credit capped at ${rate$(credit)}</h2>
<p>Federal law lets an employer count up to ${rate$(F.tipCredit)} of tips toward the wage. Arizona allows only ${rate$(credit)}, so a server in Mesa or Scottsdale gets at least ${rate$(cash)} in cash per hour, and tips must carry the total to ${rate$(now)}. A bartender with $2.50 an hour in tips is short by ${rate$(Math.max(0, now - cash - 2.5))} an hour, which the employer has to make up. The calculator below runs your own numbers.</p>
${h.mini('tipTopUp', stateArg('Arizona'))}
<h2>Earned sick time by business size</h2>
<p>Proposition 206, approved by voters in 2016, put a paid sick leave mandate into the same law as the wage. A full-time worker accrues about ${Math.floor(sick.accrued)} hours over a year at one hour per 30, but a business with 15 or more employees may cap use at ${cap} hours and a smaller one at 24, unless it chooses a higher limit. ${h.a('paid-sick-leave-by-state', 'Sick leave laws in other states')} vary on the same points.</p>
<h2>Hours and breaks follow federal rules</h2>
<p>Title 23 of the Arizona statutes deals with wage amounts and payment timing but says nothing on overtime for the private sector. The FLSA therefore decides. A warehouse picker on $18 an hour working six 8-hour days reaches 48 hours, and the federal method pays ${ot.otHours} of them at time and a half, ${usd(ot.total)} for the week. There is no daily overtime and no state salary test above the federal ${usd(F.exemptWeekly)} a week. Lunch and rest periods are left to the employer for adults, so a policy offering them can also take them away.</p>
<h2>The last paycheck and vacation</h2>
<p>When an employer discharges a worker, wages are due within seven working days or by the end of the next regular pay period, whichever comes first. A worker who resigns is paid on the regular payday for the period in which the job ended. Arizona has no rule forcing payout of unused vacation; it becomes owed only when a policy or contract gives the employee a reasonable expectation of being paid. The Industrial Commission of Arizona's Labor Department takes wage claims, and it decides each one on the evidence.</p>`,
  faqs: [
    { q: 'What will the Arizona minimum wage be in 2027?', a: `The Industrial Commission has published ${rate$(next.rate)} an hour, effective ${day(next.from)}, up from ${rate$(now)} in 2026. The increase follows the cost-of-living formula in state law. Tipped employees may be paid ${rate$(credit)} less than the full rate. Flagstaff sets its own higher wage, ${rate$(flag27)} from January 2027, and Tucson adjusts its rate separately.` },
    { q: 'Can restaurants in Flagstaff, AZ pay servers less because of tips?', a: `No. Flagstaff's ordinance requires every employee to receive the full city minimum wage, ${rate$(flag.rate)} an hour in 2026, regardless of tips. Gratuities are paid on top. This is stricter than state law, which lets employers elsewhere in Arizona pay tipped workers up to ${rate$(credit)} below the minimum wage as long as tips cover the difference.` },
    { q: 'How much paid sick time do I get in Arizona?', a: `You earn one hour for every 30 hours worked. At an employer with 15 or more employees you can accrue and use up to ${cap} hours a year; at a smaller employer the cap is 24 hours, unless the employer allows more. The rule has applied to all employers since ${day(S.sickLeave.effective!)}.` },
    { q: 'Is overtime after 8 hours a day required in Arizona?', a: `No. Arizona has no state overtime law for private employers, so only the federal rule applies: time and a half for hours beyond ${F.otWeeklyHours} in a workweek. A long day earns no premium if the weekly total stays at or below ${F.otWeeklyHours}. Some employers pay daily overtime by policy or under a union contract, and such a promise counts as wages under the state definition.` },
  ],
  related: ['state:california', 'state:nevada', 'state:new-mexico', 'state:utah', 'city-minimum-wage', 'tipped-minimum-wage'],
});
