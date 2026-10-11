import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, otCalc, rate$, usd, num, day, F, FM, fullTimeAt } from '../../lib/kit';
import { stateArg, pflArg } from '../../lib/mini-args';

const S = sd('virginia');
const mw = mwNow('virginia');
const next = mw2027('virginia')!;
const amt = (s: string | null | undefined, i = 0) => Number([...(s ?? '').matchAll(/\$(\d+(?:\.\d+)?)/g)][i][1]);
const r28 = amt(next.note);
const y26 = fullTimeAt(mw).annual;
const y28 = fullTimeAt(r28).annual;
const gain27 = (next.rate - mw) * 30 * 52;
const gain28 = (r28 - next.rate) * 30 * 52;
const sl = S.sickLeave;
const per = sl.accrualPerHours!;
const cap = sl.capHours!;
const partSick = Math.floor((20 * 52) / per);
const capWeeks = Math.ceil((cap * per) / 40);
const fl = S.familyLeave;
const rep = Number(fl.replacement!.match(/(\d+)%/)![1]);
const floorBenefit = amt(fl.replacement);
const avgWeek = 1000;
const ot = otCalc('virginia', 18, 10, 5);

export default defineStatePage({
  slug: 'virginia',
  title: `Virginia Labor Laws 2026: ${rate$(mw)} Now, Sick Leave in 2027`,
  description: `Virginia in 2026: ${rate$(mw)} an hour, ${rate$(next.rate)} from ${day(next.from)}, paid sick leave from ${day(sl.effective!)} and paid family leave benefits from ${day(fl.benefitsStart!)}.`,
  intro: 'Virginia passed a wage schedule, a general sick leave law and a paid family leave program in 2026, and each one starts on its own date.',
  resume: `Virginia is in a waiting year: laws passed in 2026 reshape pay and leave for private workers, but most of the change lands later. The minimum wage is ${rate$(mw)} an hour now, rises to ${rate$(next.rate)} on ${day(next.from)} and to ${rate$(r28)} on January 1, 2028, with inflation adjustments from 2029. Full time at today's rate pays ${usd(y26)} a year; at the 2028 rate the same schedule pays ${usd(y28)}. General paid sick leave begins on ${day(sl.effective!)} for employers with 50 or more employees and reaches every employer by 2029; until then only certain home health workers earn it under state law. A state Paid Family and Medical Leave Insurance Program will pay ${rep} percent of average weekly wages for up to ${fl.maxWeeks} weeks, with benefits payable from ${day(fl.benefitsStart!)}. Overtime follows the federal ${F.otWeeklyHours}-hour week, enforceable in state court. Final wages are due on the next regular payday, and adults have no state break rule.`,
  body: (h) => `
<h2>The calendar matters more than today's rate</h2>
<p>Most of what is new in Virginia labor law has not started yet, and the order of the dates decides who benefits first. The milestones written into the Code of Virginia line up as follows.</p>
${h.table(['Date', 'What changes', 'Detail'], [
    [day(next.from), 'Minimum wage', rate$(next.rate)],
    [day(sl.effective!), 'Paid sick leave', 'employers with 50+ employees'],
    ['January 1, 2028', 'Minimum wage', rate$(r28)],
    ['January 1, 2028', 'Paid sick leave', 'employers with 25+ employees'],
    ['April 1, 2028', 'Paid family and medical leave', 'payroll contributions begin'],
    [day(fl.benefitsStart!), 'Paid family and medical leave', 'claims and benefits begin'],
    ['January 1, 2029', 'Paid sick leave', 'every employer'],
    ['January 1, 2029', 'Minimum wage', 'indexed to inflation'],
  ], 'Virginia rules enacted in 2026 that take effect after this page was checked.', ['l', 'l', 'l'])}
<p>The wage steps come from 2026 Acts chapters 350 and 351, now in section 40.1-28.10 of the ${h.ext(S.minWage.source!.url, 'Code of Virginia')}. Someone on 30 hours a week gains ${usd(gain27)} a year at the 2027 rate and a further ${usd(gain28)} once the 2028 step arrives. Two groups stand apart: trainees in an approved on-the-job program may be paid 75 percent of the state rate for up to 90 days, and the state act excludes farm workers, children under 16 and full-time students under 18, among others.</p>
${h.mini('raiseTimeline', stateArg('Virginia'))}
<h2>Paid sick leave from July 2027</h2>
<p>Today the state sick leave statute covers a narrow group: home health workers providing consumer-directed Medicaid services who average at least 20 hours a week, with up to ${cap} hours a year. That changes on ${day(sl.effective!)}, when the definition of ${h.ext(sl.source!.url, 'employer')} grows to every business with 50 or more employees, then 25 or more in 2028 and at least one employee in 2029. The accrual rule stays the same: one hour of paid sick leave for every ${per} hours worked, up to ${cap} hours a year. A part-timer on 20 hours a week would build about ${partSick} hours over a full year, while a full-time employee reaches the ${cap}-hour limit after roughly ${capWeeks} weeks. Until the phase-in reaches your employer, sick days remain a matter of company policy.</p>
<h2>Paid family and medical leave, from December 2028</h2>
<p>The Virginia Paid Family and Medical Leave Insurance Program, in Title 60.2 of the Code, starts collecting contributions by April 1, 2028 and pays claims from ${day(fl.benefitsStart!)}. It will replace ${rep} percent of average weekly wages in the base period, with a minimum of ${usd(floorBenefit)} a week and a maximum equal to the state average weekly net earnings, for up to ${fl.maxWeeks} weeks of family and medical leave combined in a benefit year. A worker averaging ${usd(avgWeek)} a week would draw ${usd((avgWeek * rep) / 100)}, subject to the ceiling, which had not been set when this page was checked. Until then, the federal FMLA offers ${FM.weeks} weeks of unpaid, job-protected leave to eligible employees.</p>
${h.mini('pflState', pflArg('Virginia'))}
<h2>Overtime, the last check and breaks today</h2>
<p>Virginia adopts the federal overtime rule and adds its own remedies: an employer that breaks the FLSA overtime requirements is liable under state law, so a worker can sue in a Virginia court. A forklift operator at $18 an hour working five ten-hour days is owed ${usd(ot.total)}, including ${usd(ot.otPay)} for ${ot.otHours} overtime hours. Fired or not, final wages are due on or before the date they would normally have been paid. No Virginia statute requires a payout of unused vacation, so the employer's policy or contract decides. Adults have no state meal or rest break rule; children under 16 get a 30-minute lunch after five hours of continuous work. Virginia is a right-to-work state and employment is at will. ${h.a('minimum-wage-increases', 'Other scheduled raises')} show how the state's path compares.</p>`,
  faqs: [
    { q: 'When does Virginia paid sick leave start for most workers?', a: `On ${day(sl.effective!)} for employees of businesses with 50 or more workers, on January 1, 2028 for those with 25 or more, and on January 1, 2029 for every employer. Workers will earn one hour of paid sick leave for every ${per} hours worked, up to ${cap} hours a year. In 2026 the state law covers only certain home health workers, so other employees depend on their employer's policy.` },
    { q: 'What will the Virginia minimum wage be in 2027 and 2028?', a: `${rate$(next.rate)} an hour from ${day(next.from)} and ${rate$(r28)} from January 1, 2028, under legislation passed in 2026. From January 1, 2029 the rate will follow inflation. The current rate is ${rate$(mw)}. Employees in an approved on-the-job training program can be paid 75 percent of the state rate, or the federal minimum if higher, for up to 90 days.` },
    { q: 'When can I collect Virginia paid family leave benefits?', a: `Not before ${day(fl.benefitsStart!)}, the date the program starts receiving claims and paying benefits. Payroll contributions begin by April 1, 2028. The benefit will be ${rep} percent of your average weekly wages, at least ${usd(floorBenefit)} a week, for up to ${fl.maxWeeks} weeks a year. Until then, only the unpaid federal FMLA protects leave for a new child or a serious illness.` },
    { q: 'Do Virginia employers have to pay out unused vacation?', a: 'No Virginia statute requires it. Whether unused vacation is paid at the end of a job depends on the employer\'s written policy or your contract, so read the handbook before your last week. The wages you earned must be paid on or before the next regular payday, whether you quit or were let go. The Department of Labor and Industry takes claims for unpaid wages.' },
  ],
  related: ['state:maryland', 'state:north-carolina', 'state:west-virginia', 'state:district-of-columbia', 'minimum-wage-increases', 'paid-family-leave-by-state'],
});
