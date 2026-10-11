import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, usdx, day, F, fullTimeAt, otCalc, sickYear } from '../../lib/kit';
import { stateArg, cityArg } from '../../lib/mini-args';

const S = sd('illinois');
const mw = mwNow('illinois');
const tip = S.minWage.tipped.cashWage!;
const chi = S.localMinWages.find((l) => l.name === 'Chicago')!;
const cook = S.localMinWages.find((l) => l.name === 'Cook County')!;
const chiTip = Number(chi.note!.match(/\$([\d.]+)/)![1]);
const teen = Number(S.minWage.other!.match(/\$([\d.]+)/)![1]);
const teenHours = Number(S.minWage.other!.match(/(\d+) hours/)![1]);
const sick = S.sickLeave;
const part = sickYear('illinois', 30);
const full = sickYear('illinois', 40);
const gap = (chi.rate - mw) * 40 * 52;
const ot = otCalc('illinois', 21, 9, 5);
const meal = S.breaks.mealMinutes!;
const mealAt = S.breaks.mealAfterHours!;

export default defineStatePage({
  slug: 'illinois',
  title: `Illinois 2026 Labor Laws: ${rate$(mw)} Wage, No-Reason Paid Leave`,
  description: `Illinois in 2026: ${rate$(mw)} statewide, ${rate$(chi.rate)} in Chicago, ${sick.capHours} hours of paid leave usable for any reason, a ${meal}-minute meal break and vacation owed at exit.`,
  intro: 'Illinois gives almost every worker paid time off with no questions asked, while Chicago and Cook County run their own wage and leave rules.',
  resume: `Illinois is one of the few states where paid leave comes with no reason attached: since ${day(sick.effective!)} the Paid Leave for All Workers Act lets employees earn one hour for every ${sick.accrualPerHours} hours worked, up to ${sick.capHours} hours a year, and the employer may not ask why the time is taken. The statewide minimum wage is ${rate$(mw)} an hour for workers 18 and older, unchanged from 2025, which comes to ${usd(fullTimeAt(mw).annual)} for a 40-hour year. Chicago sets ${rate$(chi.rate)} for employers with four or more employees and Cook County ${rate$(cook.rate)}, both since ${day(chi.from)}. Tipped staff can be paid ${rate$(tip)} in cash if tips fill the gap. Time and a half applies after 40 hours a week, and the exempt salary line follows the federal ${usd(F.exemptWeekly)} a week. Final pay, including earned vacation, is due on the next regularly scheduled payday.`,
  body: (h) => `
<h2>Time off you never have to explain</h2>
<p>Most state sick leave laws list the reasons a worker may use the hours: an illness, a doctor visit, a sick child. The Illinois act drops that list. An employee can take the leave to rest, to handle a car repair or to attend a school play, and the employer is barred from requiring a basis for the request. Accrual starts on the first day of work, use can be delayed until day 90, and the act covers every employer in the state, non-profits included. A barista on 30 hours a week builds about ${Math.floor(part.accrued)} hours over a year; a full-time warehouse clerk reaches the ${sick.capHours}-hour ceiling, since ${full.worked.toLocaleString('en-US')} hours worked would generate more than the cap allows. An employer may instead frontload the full amount at the start of the year.</p>
<p>The hours are not cashed out when the job ends, unless the employer has folded them into a general vacation or PTO bank. That detail matters for the final check, covered further down.</p>
${h.mini('sickAccrual', stateArg('Illinois'))}
<h2>Chicago and Cook County write their own rules</h2>
<p>Inside Chicago, the city ordinance replaces the state act. Workers there earn one hour of paid leave plus one hour of paid sick leave for every 35 hours worked, so two separate balances build at once. Cook County has its own paid leave ordinance as well, and its minimum wage of ${rate$(cook.rate)} applies only in towns that have not opted out. Chicago raises its rate every July 1 by inflation, capped at 2.5%, and its tipped cash wage stands at ${rate$(chiTip)}, well above the statewide ${rate$(tip)}. A full-time cashier paid the Chicago minimum rather than the state rate collects ${usd(gap)} more over a year. The Department of Business Affairs and Consumer Protection publishes the city figures.</p>
${h.mini('cityCompare', cityArg())}
<h2>A long week and a short lunch</h2>
<p>Illinois counts overtime by the week only, after 40 hours, at one and a half times the regular rate; there is no daily trigger. A forklift operator earning $21 an hour who works five 9-hour days is owed ${ot.otHours} overtime hours, worth ${usd(ot.otPay)}, for a gross week of ${usd(ot.total)}. The meal rule is specific: a ${meal}-minute break for every ${mealAt} hours worked, given no later than five hours into the shift, plus a second ${meal} minutes on shifts of 12 hours or more. A nurse aide clocking in at 7 a.m. must therefore be offered a meal by noon. The state meal rule says nothing about short rest breaks.</p>
<h2>Lower rates written into the law</h2>
<p>Workers under 18 may be paid ${rate$(teen)} as long as they work fewer than ${teenHours} hours in a calendar year; past that, the full adult figure applies. Tipped employees receive 60% of the minimum in cash, and tips are expected to carry each hour to the full rate. Licenses that let some employers pay workers with disabilities below the minimum wage are being phased out: the Illinois Department of Labor will stop issuing and recognizing them on ${day('2029-12-31')}.</p>
<h2>Vacation is wages at the end of the job</h2>
<p>Earned vacation under a contract, agreement or policy counts as final compensation, and a former employee can claim its monetary value from the employer. Bonuses and commissions owed are also part of the last check, which is due on the next regular payday whether you resign or are dismissed. The ${h.ext('https://labor.illinois.gov/faqs/vacation-faq.html', 'Department of Labor vacation FAQ')} sets out that claim, and ${h.a('pto-payout-laws', 'the PTO payout comparison')} shows how far Illinois sits from states that leave the matter to the handbook.</p>`,
  faqs: [
    { q: 'Can my Illinois employer ask why I am taking paid leave?', a: `No. Under the Paid Leave for All Workers Act, an employee can use the leave for any reason and the employer may not require documentation or an explanation. Accrual begins on the first day of work, and the employer can delay use until 90 days after hiring. Workers earn one hour per ${sick.accrualPerHours} hours worked, up to ${sick.capHours} hours a year.` },
    { q: 'What is the Chicago, Illinois minimum wage after July 2026?', a: `${rate$(chi.rate)} an hour for employers with four or more employees, in force since ${day(chi.from)}, against ${rate$(mw)} in the rest of Illinois. Tipped workers in the city receive at least ${rate$(chiTip)} in cash. The rate is adjusted each July 1 by inflation, with the increase limited to 2.5%. Cook County suburbs that have not opted out use ${rate$(cook.rate)}.` },
    { q: 'Does an IL employer have to pay out unused vacation when I quit?', a: 'Yes, for vacation earned under a contract, agreement or policy. Illinois treats it as final compensation due on the next regularly scheduled payday, along with bonuses, commissions and wages, and a former employee can claim the cash value of those days. Leave earned only under the Paid Leave for All Workers Act is different: it is not paid out unless the employer has merged it into a vacation or PTO bank.' },
    { q: 'How long is a meal break in Illinois for an 8-hour shift?', a: `At least ${meal} minutes, granted no later than five hours after the shift begins, because the law requires a meal break for every ${mealAt} hours worked. A shift of 12 hours or more carries a second ${meal}-minute break. The rule comes from the One Day Rest in Seven Act, enforced by the Illinois Department of Labor. A shift of exactly ${mealAt} hours already triggers the first break.` },
  ],
  related: ['state:indiana', 'state:wisconsin', 'state:iowa', 'state:missouri', 'paid-sick-leave-by-state', 'city-minimum-wage'],
});
