import { definePage } from '../../lib/page-types';
import { STATES, finalPayDate, names, day, TODAY } from '../../lib/kit';

type S = (typeof STATES)[number];
const fp = (s: S) => s.finalPay;
const sameDay = STATES.filter((s) => fp(s).firedDays === 0);
const fewDays = STATES.filter((s) => fp(s).firedDays != null && fp(s).firedDays! > 0);
const noLaw = STATES.filter((s) => /no state (law|statute)/i.test(fp(s).fired));
const payday = STATES.filter((s) => fp(s).firedDays == null && !noLaw.includes(s) && /payday/i.test(fp(s).fired));
const quitNotice = STATES.filter((s) => fp(s).quitNotice);
const required = STATES.filter((s) => fp(s).ptoPayout === 'required');
const sample = '2026-11-13';
const ex = fewDays.length ? [...fewDays].sort((a, b) => fp(b).firedDays! - fp(a).firedDays!)[0] : null;
const exDue = ex ? finalPayDate(ex.slug, sample) : null;
const rows = STATES.map((s) => [s.name, fp(s).fired, fp(s).quit]);

export default definePage({
  id: 'final-paycheck-laws',
  group: 'job',
  kind: 'pillar',
  order: 10,
  slug: 'final-paycheck-laws-by-state',
  nav: 'Final paycheck laws',
  card: `When your last paycheck is due after you quit or are let go, in every state, with the date calculated for you.`,
  title: `Final Paycheck Laws by State 2026: Deadlines When You Leave`,
  description: `Final paycheck laws by state in 2026: ${sameDay.length} jurisdictions here require pay on the day you are let go, others by the next payday. Get your state's exact due date.`,
  h1: 'Final paycheck laws by state: when your last wages are due',
  intro: 'Federal law sets no deadline for a last paycheck. Your state decides, and the answer changes depending on whether you quit or were let go.',
  resume: `Your final paycheck deadline is set by the state where you worked, because federal law does not require employers to pay former employees immediately. Of the ${STATES.length} jurisdictions covered on this site, ${sameDay.length} require the final wages on the last day when the employer ends the job: ${names(sameDay)}. ${fewDays.length} others give the employer a short fixed window of one to a few days, ${payday.length} allow payment by the next regular payday, and ${noLaw.length} have no final pay statute at all, so the normal payday applies in practice. Quitting often moves the deadline: many states allow the next regular payday after a resignation, while a few pay on the last day if you gave enough notice, as ${quitNotice.length ? names(quitNotice.slice(0, 3)) : 'some states'} do. The final check must include every hour worked and, in ${required.length} jurisdictions, accrued vacation. The calculator below gives the date for your state and the way the job ended.`,
  tool: 'finalpay',
  toolProps: { state: 'california' },
  body: (h) => `
<h2>Being let go and quitting are two different clocks</h2>
<p>Almost every state with a final pay law writes separate rules for an employee the employer lets go and for one who resigns. The logic is simple: an employer who decides to end a job can prepare the check, while a resignation can come without warning. That is why the strictest rules apply to discharge. ${sameDay.length ? `In ${names(sameDay)}, the final wages are due on the day the job ends when the employer makes the decision, with narrow exceptions written into some of those laws.` : ''} ${ex && exDue ? `At the other end of the fixed windows, ${ex.name} allows ${fp(ex).firedDays} days: an employee let go on ${day(sample)} must be paid by ${day(exDue)}.` : ''} For resignations, the next regular payday is the most common rule, and a handful of states reward notice by moving the deadline earlier.</p>
<h2>Layoffs, reductions and the end of a contract</h2>
<p>A layoff is treated as a discharge in most final pay laws: the employer chose to end the job, so the stricter clock applies, even when the separation is described as temporary or comes with a promise of recall. Montana's labor agency, for example, writes that wages are due immediately when an employee is laid off or discharged. The end of a fixed-term contract or a seasonal job usually follows the same rule. If you are unsure which category your departure falls into, look at who made the decision and when it was announced, then compare the two columns of the table below.</p>
<h2>What the final check must include</h2>
<p>The last paycheck covers every hour worked up to the end, at your regular rate and with overtime for hours past the weekly limit. Earned commissions and nondiscretionary bonuses already calculable are wages too, although their timing may follow the commission plan. Accrued vacation is owed with the final wages where state law treats it as wages, which is the case in ${names(required)}, and elsewhere when the employer's policy promises it; the ${h.a('pto-payout-laws', 'PTO payout guide')} sorts each state. Employers may deduct the usual taxes and the deductions you authorized in writing, but many states forbid keeping wages to cover unreturned equipment or a cash shortage without a signed authorization, and under the federal ${h.ext('https://www.ecfr.gov/current/title-29/section-531.35', '"free and clear" rule')} no deduction made for the employer's benefit may cut into the minimum wage or overtime owed.</p>
${h.table(['State', 'If you are let go', 'If you quit'], rows, `Final paycheck deadlines (state labor agencies and statutes, check date ${day(TODAY)})`, ['l', 'l', 'l'])}
<h2>Paying by check, direct deposit or pay card</h2>
<p>The method usually follows your normal pay arrangement. If you were paid by direct deposit, the final wages can arrive the same way on the due date. Some states require the employer to mail the check if you ask, or to hold it at the workplace, and a few let the employee choose. An employer cannot delay a final paycheck because you have not returned a laptop, signed a separation agreement or completed an exit interview; those are separate matters. Severance, if offered, comes under the terms of the agreement, while the wages you have already earned are due by the state deadline whatever you decide about it, as the ${h.a('severance-pay', 'severance guide')} explains.</p>
<h2>When the final paycheck is late</h2>
<p>Start with a written request to payroll or human resources that names your last day and the amount you expect. If the deadline passes, file a wage claim with the state labor agency, which investigates without a fee, or with the ${h.src('dolLastPay', 'Wage and Hour Division')} when the problem is unpaid minimum wage or overtime. Several states add waiting-time penalties: the employer owes extra pay for each day the final wages are late. The agency for your state is listed on ${h.a('states', 'its state page')}. When large sums or a contract dispute are involved, an employment lawyer can look at your documents.</p>`,
  faqs: [
    { q: 'When is my final paycheck due if I am fired?', a: `It depends on the state. ${sameDay.length} jurisdictions on this site require payment on the day of discharge, ${fewDays.length} allow a short window of one to a few days, and ${payday.length} allow the next regular payday. In ${noLaw.length} there is no statute, and the normal payday applies in practice. Use the calculator above for the exact date in your state.` },
    { q: 'Can my employer hold my last paycheck until I return equipment?', a: 'Generally no. Final wages are due by the state deadline whether or not you have returned a laptop, uniform or badge. Many states allow a deduction for unreturned property only with your written authorization, and federal law forbids any such deduction that cuts into the minimum wage or overtime owed for the week. It can pursue the property separately.' },
    { q: 'Does my final paycheck include unused vacation?', a: `In ${required.length} jurisdictions on this site, ${names(required)}, yes: earned vacation is wages and must be paid with the last check. Elsewhere it depends on the written policy, which may say unused time is forfeited. Federal law requires no payout. Sick leave is usually not paid out unless it is pooled into a single PTO bank.` },
    { q: 'What can I do if my employer never sends my final paycheck?', a: 'Send a dated written request first and keep a copy. If nothing arrives by the state deadline, file a wage claim with the state labor agency, which handles these claims at no cost and can order payment and penalties. Small claims court is another route for modest amounts. Unpaid minimum wage or overtime can also be reported to the federal Wage and Hour Division.' },
    { q: 'Do I get my final paycheck sooner if I give two weeks notice?', a: `In a few states, yes. ${quitNotice.length ? `The data shows a notice rule in ${names(quitNotice)}, where enough notice moves the deadline to your last day or close to it.` : ''} In most states, notice changes nothing: the final wages of an employee who resigns are due on the next regular payday whatever the notice. Federal law requires no notice from either side.` },
    { q: 'Can an employer pay my final paycheck on a pay card?', a: 'Usually only if you agreed to be paid that way during the job, and the state rules on pay cards, which often require a way to withdraw the full amount without fees, still apply. Many states also allow the final wages to be mailed at your request. If your employer switches you to a payment method you never accepted, the state labor agency can tell you whether that is allowed.' },
  ],
  related: ['pto-payout-laws', 'severance-pay', 'at-will-employment', 'wage-garnishment-limits', 'state:california', 'state:texas'],
  sources: ['dolLastPay', 'dolVacation', 'dolSeverance'],
  extraSources: [{ name: '29 CFR 531.35: wages paid free and clear, no kickbacks', url: 'https://www.ecfr.gov/current/title-29/section-531.35' }, ...STATES.filter((s) => fp(s).source && fp(s).firedDays === 0).map((s) => ({ name: `${s.name}: final pay rule`, url: fp(s).source!.url }))],
});
