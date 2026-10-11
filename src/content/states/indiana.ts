import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, F, fullTimeAt, otCalc } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('indiana');
const mw = mwNow('indiana');
const tip = S.minWage.tipped.cashWage!;
const year = fullTimeAt(mw).annual;
const youth = F.youthWage;
const youthGap = (mw - youth) * 25;
const ot = otCalc('indiana', 19, 10, 5);
const owed = 1200;

export default defineStatePage({
  slug: 'indiana',
  title: `Indiana Labor Laws 2026: ${rate$(mw)} Wage, Double Damages, Breaks`,
  description: `Indiana labor laws for 2026: ${rate$(mw)} an hour, or ${usd(year)} for a full-time year, a ${rate$(youth)} training wage, double damages on late pay and no adult break law.`,
  intro: 'Indiana keeps the federal wage floor, adds a sharp penalty for late wages and leaves breaks and leave to the employer.',
  resume: `Indiana pays the federal floor, ${rate$(mw)} an hour in 2026, and has no raise scheduled for 2027, so a 40-hour job at the minimum comes to ${usd(year)} a year before taxes. The state law reaches employers with two or more workers that the federal Fair Labor Standards Act does not cover, and it uses the same figure. Tipped staff can be paid ${rate$(tip)} in cash as long as tips lift each hour to ${rate$(mw)}. Workers under ${F.youthAgeUnder} may receive a ${rate$(youth)} training wage during their first ${F.youthDays} consecutive calendar days. Time and a half is owed past 40 hours in a workweek, with the federal ${usd(F.exemptWeekly)} weekly salary line for exempt staff. Final wages are due on the next regularly scheduled payday, whether you quit or are let go, and an employer that pays late without good faith can be ordered to pay liquidated damages of twice the wages due.`,
  body: (h) => `
<h2>When a late paycheck costs the employer twice over</h2>
<p>What sets Indiana apart is not its wage rate but what happens when wages arrive late. Under the state wage payment rules, an employer that misses a payday owes the unpaid amount plus the worker's attorney fees and court costs. If a court finds the failure was not in good faith, it must add liquidated damages equal to two times the wages due. Take a warehouse picker shorted ${usd(owed)} on a final check: liquidated damages alone would reach ${usd(owed * 2)}, before fees. The Indiana Department of Labor's Wage and Hour Division handles wage questions, and a court decides whether good faith existed, so the outcome of a given claim depends on its facts.</p>
<p>The deadline itself is plain: the last wages are due on or before the next regularly scheduled payday on which you would have been paid had you stayed. Quitting and being fired follow the same clock.</p>
${h.mini('atWillState', stateArg('Indiana'))}
<h2>Teenagers on the payroll</h2>
<p>Indiana allows employers to start workers younger than ${F.youthAgeUnder} at ${rate$(youth)} an hour for their first ${F.youthDays} consecutive calendar days. A 17-year-old working 25 hours a week at a pizza counter earns ${usd(youthGap)} less per week than at ${rate$(mw)} during that period, and the full minimum applies from day ${F.youthDays + 1}. Minors also get the only break rule in Indiana law: a worker under 18 scheduled for at least six consecutive hours must receive one or two rest breaks adding up to at least 30 minutes. Adults have no such right; the Department of Labor states that Indiana law generally does not require lunch or other breaks for adult employees, so the handbook sets them.</p>
<h2>Overtime for a long week</h2>
<p>Indiana writes the 40-hour overtime rule into its own code for employers outside the FLSA, with exceptions listed in Indiana Code 22-2-2-3, and federal law covers everyone else on the same terms. A forklift driver earning $19 an hour who works five 10-hour days has ${ot.otHours} overtime hours and a gross week of ${usd(ot.total)}, of which ${usd(ot.otPay)} is the overtime portion. There is no state salary threshold above the federal ${usd(F.exemptWeekly)} a week, so a salaried supervisor paid less than that is owed overtime regardless of title. ${h.a('exempt-vs-non-exempt', 'The duties tests')} decide the rest.</p>
<h2>Vacation days at the end of the job</h2>
<p>The Department of Labor treats accrued vacation as a form of compensation, owed on a pro rata basis when you leave. The catch is the policy: if a handbook or contract sets conditions, such as two weeks' notice or a minimum length of service, those conditions must be met before the payout is owed. A worker leaving with 32 unused hours at $19 would be looking at ${usd(32 * 19)} if no condition blocks it. Read the written policy before giving notice. ${h.a('pto-payout-laws', 'Vacation payout rules elsewhere')} vary widely, and the tipped worker rules are covered on ${h.a('tipped-minimum-wage', 'the tipped minimum wage page')}.</p>`,
  faqs: [
    { q: 'What happens if an Indiana employer pays my wages late?', a: `The employer owes the unpaid wages plus your attorney fees and court costs. When a court finds the late payment was not made in good faith, it orders liquidated damages equal to two times the wages due. On a ${usd(owed)} shortfall that means ${usd(owed * 2)} in damages. The Indiana Department of Labor's Wage and Hour Division can explain the claim process.` },
    { q: 'Can a teenager be paid less than minimum wage in Indiana?', a: `Yes, for a limited time. Indiana employers may pay ${rate$(youth)} an hour to employees under ${F.youthAgeUnder} during their first ${F.youthDays} consecutive calendar days on the job. After that window the regular ${rate$(mw)} minimum applies. Workers under 18 on shifts of six consecutive hours or more must also receive rest breaks totaling at least 30 minutes.` },
    { q: 'Is unused vacation paid out when I leave a job in Indiana?', a: 'Generally yes, on a pro rata basis, because the Indiana Department of Labor treats accrued vacation as compensation. An employer may attach conditions in a written policy or contract, for example a notice period or a minimum tenure, and those conditions must be met for the payout to be owed. The last pay is due by the next regularly scheduled payday.' },
  ],
  related: ['state:illinois', 'state:ohio', 'state:michigan', 'state:kentucky', 'final-paycheck-laws', 'pto-payout-laws'],
});
