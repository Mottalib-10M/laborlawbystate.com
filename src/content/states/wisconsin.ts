import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, num, F, FM, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('wisconsin');
const mw = mwNow('wisconsin');
const cash = S.minWage.tipped.cashWage!;
const amt = (s: string | null | undefined, i = 0) => Number([...(s ?? '').matchAll(/\$(\d+(?:\.\d+)?)/g)][i][1]);
const opp = amt(S.minWage.other, 0);
const oppTipped = amt(S.minWage.other, 1);
const caddie9 = amt(S.minWage.other, 2);
const caddie18 = amt(S.minWage.other, 3);
const tips = 4;
const topUp = Math.max(0, mw - cash - tips);
const oppGap = (mw - opp) * 25 * (90 / 7);
const fl = S.familyLeave;
const year = fullTimeAt(mw).annual;

export default defineStatePage({
  slug: 'wisconsin',
  title: `Wisconsin Employment Law 2026: ${rate$(mw)} and Its Own FMLA`,
  description: `Wisconsin in 2026: ${rate$(mw)} an hour, a ${rate$(cash)} cash wage for tipped staff, a ${rate$(opp)} opportunity wage for new hires under 20 and a state family leave law of its own.`,
  intro: 'Wisconsin writes its own minimum wage at the federal level, sets a tipped cash wage above the federal one and keeps a family leave law that runs beside the federal FMLA.',
  resume: `Wisconsin's minimum wage is ${rate$(mw)} an hour in 2026, set by the state itself rather than borrowed from federal law, and tipped employees must receive a cash wage of at least ${rate$(cash)} an hour, above the federal ${rate$(F.tippedCash)}, with tips bringing the average to ${rate$(mw)} over the pay period. Full time at the minimum pays ${usd(year)} a year. New employees under 20 can be paid an opportunity wage of ${rate$(opp)} for their first 90 consecutive days. Overtime is time and a half after ${S.overtime.weeklyHours} hours in a workweek, with no daily rule. There is no state paid sick leave or paid family leave, but the Wisconsin Family and Medical Leave Act gives unpaid, job-protected time at employers with 50 or more permanent employees: up to six weeks for a birth or adoption, two weeks to care for a parent, child or spouse, and two weeks for your own serious health condition each year. Adults have no break requirement, though short breaks must be paid.`,
  body: (h) => `
<h2>A state family leave law beside the FMLA</h2>
<p>Wisconsin has its own family and medical leave statute for private employers, and it works differently from the federal one. It applies to employers with 50 or more permanent employees, and an employee qualifies after 52 consecutive weeks of employment and at least 1,000 hours of work, a lower hours bar than the ${FM.hours.toLocaleString('en-US')} hours the federal FMLA asks for. The weeks are split by reason within a calendar year: up to six for the birth or adoption of a child, up to two to care for a parent, child or spouse with a serious health condition, and up to two for your own. The federal law offers more weeks, ${FM.weeks} in total, and the two run at the same time when both apply. The state law still matters in two places. A worker with 1,100 hours who would fail the federal test can qualify under Wisconsin law, and care for a parent-in-law is covered, which the FMLA does not include. The Department of Workforce Development explains the rules on its ${h.ext(fl.source!.url, 'family and medical leave page')}.</p>
<h2>Tipped pay starts at ${rate$(cash)}</h2>
<p>Wisconsin requires a higher base for tipped work than the federal minimum. A server must receive at least ${rate$(cash)} an hour from the employer, and if that wage plus tips does not average ${rate$(mw)} over the pay period, the employer pays the difference. On a slow shift with $${tips} an hour in tips, the server reaches ${rate$(cash + tips)}, so the employer owes ${rate$(topUp)} for each hour, or ${usd(topUp * 30)} over a 30-hour week. The averaging is over the whole pay period, so a busy Saturday can offset a quiet Tuesday. Tipped employees under 20 in their first 90 days fall to an opportunity cash wage of ${rate$(oppTipped)}.</p>
${h.mini('tipTopUp', stateArg('Wisconsin'))}
<h2>Opportunity wage and golf caddies</h2>
<p>Employers may pay ${rate$(opp)} an hour to a worker under 20 during the first 90 consecutive calendar days on the job. Over that window, a teenager working 25 hours a week earns about ${usd(oppGap)} less than at the full rate. Golf caddies have flat amounts per round instead of an hourly rate: ${rate$(caddie9)} for 9 holes and ${rate$(caddie18)} for 18. The Department of Workforce Development lists both on its ${h.ext(S.minWage.source!.url, 'minimum wage page')}, next to the tipped rates.</p>
<h2>Breaks, vacation and the last paycheck</h2>
<p>Adults in Wisconsin have no right to a break or meal period. What the law does regulate is pay for breaks that are given: any break shorter than 30 consecutive minutes counts as work time and must be paid, and a longer one must be paid too if you are not relieved of duty and free to leave. Workers under 18 must receive a 30-minute duty-free meal period for every six consecutive hours. Employers do not have to offer vacation, holiday or sick pay, but the vacation rule has a twist: when an employer has a written vacation policy and no written forfeiture clause, earned and unused vacation must be paid out. Whether you quit or are fired, final wages follow the regular pay schedule. Employment is at will, and the Equal Rights Division handles wage claims. ${h.a('pto-payout-laws', 'PTO payout rules in other states')} vary from mandatory to silent.</p>
${h.mini('ptoPayout', stateArg('Wisconsin'))}`,
  faqs: [
    { q: 'How much FMLA leave does Wisconsin law give for a new baby?', a: `Up to six weeks a year under the Wisconsin Family and Medical Leave Act, at employers with 50 or more permanent employees, once you have worked 52 consecutive weeks and 1,000 hours. The federal FMLA allows up to ${FM.weeks} weeks for the same purpose if you meet its own test, and the two run together. Both are unpaid, so pay during the leave depends on your employer's policy.` },
    { q: 'What is the tipped minimum wage in Wisconsin?', a: `${rate$(cash)} an hour in cash wages, which is more than the federal ${rate$(F.tippedCash)}. Tips must bring your pay to an average of at least ${rate$(mw)} an hour over the pay period, or the employer has to make up the shortfall. Tipped employees under 20 in their first 90 days can be paid an opportunity cash wage of ${rate$(oppTipped)}.` },
    { q: 'Does a Wisconsin employer have to pay out unused vacation?', a: 'Only in some cases. Wisconsin employers are not required to provide vacation at all, but when an employer has implemented a written vacation policy that contains no written forfeiture provision, it must pay for earned, unused vacation when the job ends. If the policy says in writing that unused days are lost, that clause generally controls. The Equal Rights Division accepts wage claims.' },
    { q: 'Are short breaks paid in Wisconsin?', a: 'Yes. A break of less than 30 consecutive minutes counts as work time, so it must be paid. A meal break of 30 minutes or more can be unpaid only if you are relieved of all duties and free to leave. Adults are not entitled to breaks under Wisconsin law, while workers under 18 must get a 30-minute meal period for every six consecutive hours.' },
  ],
  related: ['state:minnesota', 'state:illinois', 'state:michigan', 'state:iowa', 'fmla', 'tipped-minimum-wage'],
});
