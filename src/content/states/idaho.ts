import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, F, fullTimeAt, otCalc } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('idaho');
const mw = mwNow('idaho');
const tip = S.minWage.tipped.cashWage!;
const credit = mw - tip;
const youth = F.youthWage;
const days = F.youthDays;
const under = F.youthAgeUnder;
const year = fullTimeAt(mw).annual;
const trainGap = (mw - youth) * 30 * 13;
const ot = otCalc('idaho', 18, 10, 5);
const fedCredit = F.minWage - F.tippedCash;

export default defineStatePage({
  slug: 'idaho',
  title: `Idaho Minimum Wage 2026: ${rate$(mw)}, 48-Hour Final Pay Request`,
  description: `Idaho in 2026: ${rate$(mw)} an hour, or ${usd(year)} a full-time year, a ${rate$(tip)} tipped cash wage, no city minimum allowed and final pay in 48 hours on written request.`,
  intro: 'Idaho matches the federal wage floor, bars cities from going higher and gives departing workers a written shortcut to their last paycheck.',
  resume: `Idaho's minimum wage is ${rate$(mw)} an hour in 2026, the same as the federal floor, and no increase has been announced for 2027, so a 40-hour job at that rate grosses ${usd(year)} a year. Boise, Coeur d'Alene and every other city or county are barred by statute from setting a higher rate. Tipped employees must receive at least ${rate$(tip)} in cash, which limits the tip credit to ${rate$(credit)} an hour, and the employer owes the difference whenever tips fall short. Workers under ${under} can be paid ${rate$(youth)} during their first ${days} consecutive calendar days. When a job ends, wages are due by the next regular payday or within 10 days, weekends and holidays excluded, whichever comes first, and a written request shortens that to 48 hours. Federal rules govern overtime, and Idaho is a right-to-work state, so union membership cannot be a condition of employment.`,
  body: (h) => `
<h2>A letter that speeds up the last paycheck</h2>
<p>Idaho Code 45-606 sets two clocks for the final wages of someone laid off, fired or leaving. The default is the earlier of the next regularly scheduled payday or ten days after the separation, not counting weekends and holidays. The second clock is in the worker's hands: a written request for earlier payment obliges the employer to pay everything then due within 48 hours, again leaving out weekends and holidays. A line cook whose last shift falls on a Thursday and who hands in a dated note that afternoon should see the money by Monday afternoon, later if a holiday intervenes, rather than waiting for a payday two weeks out. Keep a copy of the note, since the date it reached the employer starts the count.</p>
<p>Unused vacation is a different matter. No Idaho statute requires it to be paid out, so the employer's written policy or your agreement decides whether those hours appear on the final check.</p>
${h.mini('ptoPayout', stateArg('Idaho'))}
<h2>One wage for the whole state</h2>
<p>The minimum wage statute forbids any political subdivision from setting a higher rate by ordinance or other action, so ${rate$(mw)} holds in Ketchum as it does in Pocatello. Tipped workers fare better than the federal minimum would give them: the cash wage of ${rate$(tip)} means the employer may count ${rate$(credit)} of tips per hour, against ${rate$(fedCredit)} under federal law. A server averaging $3 an hour in tips falls short of ${rate$(mw)}, and the restaurant must add ${rate$(Math.max(0, mw - tip - 3))} for each hour worked.</p>
<p>Idaho writes its own training wage into the code: employees younger than ${under} can start at ${rate$(youth)} for their first ${days} consecutive calendar days, and an employer may not let go of other staff to make room for them. A 17-year-old stocking shelves 30 hours a week earns about ${usd(trainGap)} less over those ${days} days than at the full rate.</p>
${h.mini('tipTopUp', stateArg('Idaho'))}
<h2>Overtime and breaks follow federal law</h2>
<p>We found no overtime rule in the Idaho wage statutes, so the Fair Labor Standards Act sets the terms for covered employers: time and a half after 40 hours in a workweek, nothing for long single days. A warehouse loader at $18 an hour working five 10-hour days is owed ${ot.otHours} overtime hours, worth ${usd(ot.otPay)}, for a gross week of ${usd(ot.total)}. Salaried staff paid less than ${usd(F.exemptWeekly)} a week are not exempt. Idaho does not appear in the U.S. Department of Labor table of state meal period laws, and the statutes read here contain no break mandate for adults, so lunch and rest time come from the employer. ${h.a('break-laws-by-state', 'Break laws in other states')} shows where that differs.</p>
<h2>Unions, dismissal and leave</h2>
<p>Under Idaho Code 44-2003, no one can be required to join or remain in a labor organization to get or keep a job, which places Idaho among ${h.a('right-to-work-states', 'the right-to-work states')}. Employment is at-will. We found no state paid family leave program and no statewide paid sick leave requirement for private employers, so time off for illness depends on the employer, with the federal ${h.a('fmla', 'FMLA')} protecting the job of eligible workers at larger firms. The Idaho Department of Labor handles wage claims.</p>`,
  faqs: [
    { q: 'How do I get my final paycheck faster in Idaho?', a: 'Make a written request to your employer. Idaho Code 45-606 says that once the employer receives a written request for earlier payment, all wages then due must be paid within 48 hours, weekends and holidays excluded. Without a request, the deadline is the next regularly scheduled payday or 10 days after the job ends, excluding weekends and holidays, whichever comes first.' },
    { q: 'Can Boise, Idaho set its own minimum wage?', a: `No. The Idaho minimum wage statute bars every political subdivision, cities and counties included, from setting a minimum wage above the state rate by ordinance or any other action. Boise, Meridian and Idaho Falls therefore all use ${rate$(mw)} an hour in 2026. Higher pay in those cities comes from the labor market or a contract, never from a local ordinance.` },
    { q: 'What is the tipped minimum wage in Idaho in 2026?', a: `${rate$(tip)} an hour in cash, which is higher than the federal ${rate$(F.tippedCash)}. Tips must bring each hour to at least ${rate$(mw)}; if a slow shift leaves the total below that, the employer pays the difference. The maximum tip credit an Idaho employer can claim is therefore ${rate$(credit)} an hour.` },
    { q: 'Is a training wage legal in ID for teenage workers?', a: `Yes. Idaho lets employers pay a worker under ${under} at least ${rate$(youth)} an hour during the first ${days} consecutive calendar days of the job. After that period the regular ${rate$(mw)} applies. The statute forbids an employer from displacing other employees in order to hire workers at the lower rate.` },
  ],
  related: ['state:washington', 'state:oregon', 'state:montana', 'state:utah', 'state:nevada', 'final-paycheck-laws'],
});
