import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, usdx, F, FM, fullTimeAt, otCalc, tippedCash } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('pennsylvania');
const mw = mwNow('pennsylvania');
const cash = tippedCash('pennsylvania')!;
const credit = mw - cash;
const year = fullTimeAt(mw).annual;
const hrs = 30;
const tips = 100;
const owed = hrs * mw;
const paid = hrs * cash + tips;
const topUp = Math.max(0, owed - paid);
const ot = otCalc('pennsylvania', 19, 9, 5);

export default defineStatePage({
  slug: 'pennsylvania',
  title: `Pennsylvania Labor Law 2026: ${rate$(mw)}, ${rate$(cash)} Tipped, Overtime`,
  description: `Pennsylvania labor law 2026: ${rate$(mw)} minimum, a ${rate$(cash)} tipped cash wage with a $135 tip test, overtime past 40 hours and final pay by the next regular payday.`,
  intro: `Pennsylvania writes its own ${rate$(mw)} into state law but sets tighter rules than federal law for tipped staff.`,
  resume: `Pennsylvania's minimum wage is ${rate$(mw)} an hour in 2026, set by the state Minimum Wage Act at the same level as federal law and unchanged since 2009. The state's real departures from federal law concern tipped work: the cash wage is ${rate$(cash)} an hour instead of the federal ${rate$(F.tippedCash)}, a tip credit is allowed only for staff who receive more than $135 a month in tips, and tip-credited workers may spend no more than 20% of their weekly hours on duties that bring no tips. Card processing fees cannot be taken out of tips. A full-time job at the minimum pays ${usd(year)} a year before taxes. Overtime is owed after ${S.overtime.weeklyHours} hours a week, and the exemption salary level is the federal ${usd(F.exemptWeekly)}. There is no statewide paid sick leave and no paid family leave insurance. Final wages are due by the next regular payday.`,
  body: (h) => `
<h2>The tip rules that set Pennsylvania apart</h2>
<p>On paper Pennsylvania and federal law share one wage. In a restaurant the picture changes. The Department of Labor & Industry (L&I) requires a cash wage of at least ${rate$(cash)} an hour, so the employer can credit at most ${rate$(credit)} of tips toward the ${rate$(mw)} floor. The credit is available only for employees who customarily receive more than $135 a month in tips, against $30 under federal rules, and only while side work such as rolling silverware or cleaning stays at or under 20% of the week. Above that share, the hours must be paid at the full minimum. Since 2022, employers have also been barred from deducting credit card or payment processing fees from tips.</p>
<p>A worked case shows how the guarantee works. A server logs ${hrs} hours and earns ${usd(tips)} in tips. The law requires ${usdx(owed)} for the week; cash wages of ${usdx(hrs * cash)} plus tips reach ${usdx(paid)}, so the employer must add ${usdx(topUp)}. The calculator below runs the same check for your own week.</p>
${h.mini('tipTopUp', stateArg('Pennsylvania'))}
<h2>Overtime, with a hospital exception</h2>
<p>Time and a half applies after ${S.overtime.weeklyHours} hours in a workweek, with no daily trigger. A warehouse worker paid $19 an hour who works five 9-hour shifts earns ${usdx(ot.total)} for the 45-hour week, including ${usdx(ot.otPay)} of overtime. L&I follows the federal duties tests for salaried exempt staff and the federal salary level of ${usd(F.exemptWeekly)} a week. Hospitals and residential care facilities may instead use the federal 8-and-80 system, which counts overtime after 8 hours in a day or 80 hours in a 14-day period. ${h.a('exempt-vs-non-exempt', 'The exemption guide')} covers the duties side.</p>
<h2>No state leave mandate</h2>
<p>Pennsylvania has no statewide law requiring paid sick days from private employers and runs no paid family leave insurance program. For longer absences, the federal FMLA gives up to ${FM.weeks} weeks of unpaid leave with your job protected, provided the employer has ${FM.employerEmployees} or more employees nearby and you have worked ${FM.hours.toLocaleString('en-US')} hours in the past year. ${h.a('fmla-eligibility', 'The FMLA eligibility check')} walks through each test.</p>
<h2>Breaks are owed to teenagers only</h2>
<p>Adults have no right to a meal or rest break under Pennsylvania law. Workers aged 14 through 17 must get at least 30 minutes after five consecutive hours. When an employer chooses to give a short break, under 20 minutes, to anyone, that time is paid.</p>
<h2>When the job ends</h2>
<p>Whether you quit, are laid off or are fired, everything earned is due by the next scheduled payday. Vacation, sick and severance pay are owed only if a policy or contract promises them, so the handbook settles that question. L&I's Bureau of Labor Law Compliance takes wage complaints, and an employment lawyer can look at your facts if the amount is large.</p>`,
  faqs: [
    { q: 'What is the tipped minimum wage in Pennsylvania in 2026?', a: `It is ${rate$(cash)} an hour in cash wages, higher than the federal ${rate$(F.tippedCash)}. The employer may count up to ${rate$(credit)} of tips toward the ${rate$(mw)} minimum, but only for employees who regularly receive more than $135 a month in tips. If cash wages plus tips fall short of ${rate$(mw)} an hour in a week, the employer must pay the difference.` },
    { q: 'Can my PA employer take card fees out of my tips?', a: 'No. Since August 5, 2022, Pennsylvania rules forbid employers from deducting credit card or other payment processing fees from employee tips. The full tip left on a card belongs to the worker, subject to a valid tip pool. If fees are being withheld, the Department of Labor & Industry accepts complaints through its Bureau of Labor Law Compliance.' },
    { q: 'Am I entitled to a lunch break in Pennsylvania as an adult?', a: 'No state law requires meal or rest breaks for workers aged 18 and over in Pennsylvania. Only minors aged 14 through 17 must receive a break of at least 30 minutes after five consecutive hours. If your employer does offer a break shorter than 20 minutes, that time must be paid. Many employers provide meals by policy or union contract.' },
    { q: 'Does Pennsylvania require payout of unused vacation days?', a: 'Only when the employer has a policy or a contract that promises it. Pennsylvania treats vacation, sick and severance pay as wages owed at separation if such a promise exists, and in that case they are due with the final wages by the next scheduled payday. Without a written policy or agreement, unused days can be forfeited when the job ends.' },
  ],
  related: ['state:new-york', 'state:new-jersey', 'state:ohio', 'state:maryland', 'tipped-minimum-wage', 'overtime-laws-by-state'],
});
