import { defineStatePage } from '../../lib/page-types';
import { mwNow, rate$, usd, usdx, F, FM, fullTimeAt, otCalc } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const mw = mwNow('south-carolina');
const year = fullTimeAt(mw).annual;
const unpaid = 1200;
const treble = unpaid * 3;
const ot = otCalc('south-carolina', 17, 10, 5);

export default defineStatePage({
  slug: 'south-carolina',
  title: `South Carolina Labor Laws 2026: Federal ${rate$(mw)} and Pay Act`,
  description: `South Carolina 2026: no state minimum wage, so the federal ${rate$(mw)} applies, FLSA overtime, final wages within 48 hours or 30 days, triple damages if unpaid.`,
  intro: 'South Carolina leaves the wage floor to Congress and concentrates its own law on when and how wages are paid.',
  resume: `South Carolina has no minimum wage law of its own, so the federal ${rate$(mw)} an hour applies to employers covered by the Fair Labor Standards Act, and the tipped cash wage is the federal ${rate$(F.tippedCash)}. Full time at that rate pays ${usd(year)} a year before taxes. Overtime also comes from federal law: time and a half after ${F.otWeeklyHours} hours in a workweek, and an exemption salary of at least ${usd(F.exemptWeekly)} a week. The state does not require paid sick days and has no paid family leave program. Where South Carolina writes its own rules is the Payment of Wages Act: an employer must tell you in writing at hiring what you will be paid and when, give seven days' written notice before changing those terms, and pay all wages due within 48 hours of separation or by the next regular payday, never more than 30 days later. Wages withheld in breach of that law can cost the employer three times the amount.`,
  body: (h) => `
<h2>A state law about paying wages, not setting them</h2>
<p>The U.S. Department of Labor's state table lists South Carolina among the states with no minimum wage statute, so the federal rate of ${rate$(mw)} is the floor for covered employers. What the legislature did pass is the South Carolina Payment of Wages Act, ${h.ext('https://www.scstatehouse.gov/code/t41c010.php', 'Title 41, Chapter 10 of the state code')}. It governs the mechanics of pay rather than the amount. At hiring, the employer must give each employee written notice of the normal hours, the wage, the time and place of payment and any deductions. A change to any of those terms must be put in writing at least seven calendar days before it takes effect. A pay cut announced on a Monday for the same week does not meet that standard.</p>
<h2>Leaving a job and the triple damages rule</h2>
<p>When employment ends for any reason, the employer must pay all wages due within 48 hours or by the next regular payday, and that payday may not be more than 30 days away. Vacation, holiday and sick pay count as wages only when a policy or employment contract makes them due, so a handbook that promises a payout of unused vacation turns that balance into wages under the Act.</p>
<p>The enforcement clause is what makes the statute matter. An employee who is not paid can sue and recover three times the unpaid wages, plus costs and reasonable attorney's fees. If $${unpaid.toLocaleString('en-US')} in final wages is withheld without a valid reason, the exposure becomes ${usd(treble)} before fees. Courts look at the facts of each case, and an employment lawyer can say whether a claim fits. ${h.a('final-paycheck-laws', 'Final paycheck rules elsewhere')} rarely carry a multiplier this high.</p>
${h.mini('atWillState', stateArg('South Carolina'))}
<h2>Overtime is federal, week by week</h2>
<p>With no state overtime statute, the FLSA decides. A forklift operator paid $17 an hour who works five 10-hour days reaches 50 hours; the week pays ${usdx(ot.regularPay)} for the first ${F.otWeeklyHours} hours and ${usdx(ot.otPay)} for ${ot.otHours} overtime hours, ${usdx(ot.total)} in total. Long days alone do not create overtime, and weeks cannot be averaged. Salaried staff must meet the federal duties test and earn at least ${usd(F.exemptWeekly)} a week to be exempt. ${h.a('overtime-laws-by-state', 'Overtime laws by state')} show where daily rules exist.</p>
<h2>Leave, unions and dismissal</h2>
<p>South Carolina requires no paid sick leave from private employers and has no state paid family leave insurance. Unpaid job-protected leave comes from the federal FMLA: up to ${FM.weeks} weeks for eligible employees at employers with ${FM.employerEmployees} or more workers. The state code also protects the right to work without joining or paying a union, and employment is at will, which means an employer can end it for almost any lawful reason but not for one forbidden by statute.</p>`,
  faqs: [
    { q: 'Does South Carolina have its own minimum wage?', a: `No. South Carolina has no minimum wage statute, so employers covered by the federal Fair Labor Standards Act must pay ${rate$(mw)} an hour. Tipped employees can receive a cash wage of ${rate$(F.tippedCash)} if tips bring them to ${rate$(mw)}. Workers outside federal coverage, a small group, have no wage floor under state law.` },
    { q: 'How soon must an SC employer pay final wages?', a: 'Within 48 hours of the separation or by the next regular payday, and that payday may not be more than 30 days after the job ends. The rule applies whether you quit, are fired or are laid off. Vacation or holiday pay is included only if the employer policy or your contract makes it due. Unpaid wages can lead to a civil action.' },
    { q: 'Can a South Carolina employer cut my pay without notice?', a: 'Not without written warning. The Payment of Wages Act requires employers to notify employees in writing of any change to wages, hours, pay dates or deductions at least seven calendar days before the change takes effect. A change given with less notice can be raised as a wage complaint, and the written notice you received at hiring is the reference point for what was promised.' },
    { q: 'What happens if an employer in South Carolina refuses to pay wages owed?', a: 'The employee can file a civil action and, under the Payment of Wages Act, recover three times the unpaid wages plus court costs and reasonable attorney fees. The outcome turns on the details, which a judge reviews case by case. Keep pay stubs and the written notice of your wage terms.' },
  ],
  related: ['state:north-carolina', 'state:georgia', 'state:tennessee', 'final-paycheck-laws', 'overtime-laws-by-state', 'at-will-employment'],
});
