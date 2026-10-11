import { definePage } from '../../lib/page-types';
import { STATES, names, usd, day, TODAY } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const rule = (s: (typeof STATES)[number]) => s.finalPay.ptoPayout;
const req = STATES.filter((s) => rule(s) === 'required');
const pol = STATES.filter((s) => rule(s) === 'policy');
const nol = STATES.filter((s) => rule(s) !== 'required' && rule(s) !== 'policy');
const label = (r: string) => (r === 'required' ? 'Payout required' : r === 'policy' ? 'Follows the written policy' : 'No state rule');
const rows = STATES.map((s) => [s.name, label(rule(s)), s.finalPay.ptoNote ?? '']);
const hrs = 64;
const rate = 26.5;
const ex = req[0];

export default definePage({
  id: 'pto-payout-laws',
  group: 'leave',
  kind: 'guide',
  order: 50,
  slug: 'pto-payout-laws-by-state',
  nav: 'PTO payout laws',
  card: `Whether unused vacation must be paid when you quit or are fired, state by state, and what your balance is worth.`,
  title: `PTO Payout Laws by State 2026: Is Unused Vacation Paid?`,
  description: `PTO payout laws by state in 2026: ${req.length} of ${STATES.length} jurisdictions require unused vacation to be paid at separation; ${pol.length} follow the employer's policy. Find your rule.`,
  h1: 'PTO payout laws by state: is unused vacation paid when you leave?',
  intro: 'Whether your vacation balance turns into cash on the way out depends almost entirely on the state where you work and on what your handbook says.',
  resume: `Federal law does not require employers to give vacation at all, or to pay out unused vacation when a job ends: the Department of Labor calls it a matter of agreement between employer and employee. State law fills the gap unevenly. Of the ${STATES.length} jurisdictions covered on this site, ${req.length} treat earned vacation as wages that must be paid at separation whatever the policy says: ${names(req)}. In ${pol.length} others the answer follows the employer's written policy or contract, and in several of those a policy that is silent means the vacation is owed. In ${nol.length}, no statute speaks to it and only the policy decides. As a rule of thumb, a balance of ${hrs} hours at ${usd(rate, 2)} an hour is worth ${usd(hrs * rate)} before taxes, which makes the handbook clause worth reading before your last day. Sick leave is treated differently and is rarely paid out.`,
  mini: 'ptoPayout',
  miniArg: stateArg(),
  body: (h) => `
<h2>Three kinds of state rule</h2>
<p>Every state falls into one of three groups. In the first, earned vacation is wages. Once you have accrued it, it belongs to you the same way last week's pay does, the employer cannot take it back through a use-it-or-lose-it clause, and the full balance must be paid with the final wages. ${ex ? `${ex.name} is in this group, along with ${names(req.filter((s) => s !== ex))}.` : ''} In the second group, the employer's written policy controls. A policy can say that unused vacation is forfeited when you leave, but it has to be clear and, in several states, communicated in writing before the vacation was earned. If the policy promises payout, or says nothing, the hours are usually owed. The third group has no statute at all; courts there enforce whatever the employer promised, and nothing more.</p>
<p>This distinction is why two coworkers who move from the same national company can be treated differently: the employee in a payout-required state gets a check for the balance, while the one in a policy state may lose it under a forfeiture clause that would be void a few miles across the border.</p>
${h.table(['State', 'Rule at separation', 'What the state says'], rows, `Payout of accrued, unused vacation when employment ends (check date ${day(TODAY)})`, ['l', 'l', 'l'])}
<h2>The fine print in the payout states</h2>
<p>Even the states that require payout attach conditions, and they are worth reading word for word because they decide edge cases: hours earned before a certain date, small employers, or an employee who quits without notice. Here is what each state in that group says, in the words of its own labor agency or statute as recorded in this site's data:</p>
<ul>${req.map((s) => `<li><strong>${s.name}</strong>: ${s.finalPay.ptoNote ?? 'earned vacation is paid at separation.'}</li>`).join('')}</ul>
<p>Two patterns stand out. First, some states apply the rule only to time earned after the law changed, so an older balance can follow the old policy. Second, a state may let employers impose conditions on a voluntary resignation, such as a notice period, while barring any forfeiture when the employer ends the job. If your situation falls between those lines, the state agency's own guidance, linked under sources, is the place to confirm it.</p>
<h2>PTO banks, sick leave and holidays</h2>
<p>Many employers no longer separate vacation from sick days and give a single bank of paid time off. When they do, most states treat the whole bank like vacation, so a payout rule for vacation covers every hour in it. That is a real difference from a split system, where sick leave is generally not paid out under state sick leave laws, even in states that require vacation payout. Unused floating holidays are usually treated like vacation when they can be taken at the employee's choice, and like ordinary holidays when they are tied to a date. If your employer changed from separate banks to a combined one, read the transition terms: balances earned under the old policy may carry their own rule.</p>
<h2>Caps, accrual limits and use-it-or-lose-it</h2>
<p>A payout requirement does not stop an employer from limiting how much vacation you can accumulate. In payout-required states the usual tool is an accrual cap: once you reach a set balance, you stop earning more until you use some. That is lawful because nothing you earned is taken away. What those states forbid is a rule that wipes out hours already earned, such as a reset to zero on December 31. In policy states, a use-it-or-lose-it clause is often valid if employees were told in advance. The Department of Labor's general page on vacation leave confirms that the federal Fair Labor Standards Act sets no rule here, so these state distinctions are the only ones that matter outside a union contract or a government service contract.</p>
<h2>When the payout is due and how much it should be</h2>
<p>When vacation counts as wages, it is due on the same schedule as the rest of the final pay. That can mean the last day of work in some states and the next regular payday in others, and the ${h.a('final-paycheck-laws', 'final paycheck deadlines')} apply to it in full. The amount is your balance multiplied by your rate of pay at separation, not the rate you earned when the hours accrued. For a salaried employee, the daily or hourly equivalent of salary is used. Commissions and shift differentials can raise the rate where the policy or state law says so. A quick check:</p>
<ul>
<li>A balance of ${hrs} hours at ${usd(rate, 2)} an hour comes to ${usd(hrs * rate)} before taxes.</li>
<li>Ten days for a salaried employee earning ${usd(62400)} a year comes to ${usd((62400 / 260) * 10)}, using 260 workdays.</li>
<li>Twenty hours for a part-time employee at ${usd(17, 2)} an hour comes to ${usd(20 * 17)}.</li>
</ul>
<p>The mini-simulator above multiplies your balance by your rate and shows the rule in the state you pick.</p>
<h2>If the vacation is not paid</h2>
<p>Start with the handbook and any offer letter, then ask payroll in writing for the balance and the policy section they are relying on. If you are in a payout-required state, or in a policy state whose policy promises payout, unpaid vacation is an unpaid wage claim. The state labor agency listed on ${h.a('states', 'your state page')} takes those claims, usually at no cost, and several states add penalties for late final wages. The agency decides the claim on your documents, so keep pay stubs that show your accrued balance; many stubs print it each period. An employment lawyer can look at a contract that is unclear. Where the job ends with a severance agreement, check whether it waives vacation pay, since some states do not allow a release of earned wages; the ${h.a('severance-pay', 'severance guide')} explains what such agreements usually contain.</p>`,
  faqs: [
    { q: 'Is PTO paid out when you quit?', a: `It depends on the state. In ${req.length} of the ${STATES.length} jurisdictions covered here, ${names(req)}, earned vacation must be paid at separation for any reason, quitting included. Elsewhere, the employer's written policy decides: it can usually provide that unused time is forfeited, but if it promises payout or is silent, the balance is often owed. Federal law sets no requirement either way.` },
    { q: 'Can my employer take away my vacation if I get fired?', a: 'Not in states that treat earned vacation as wages, where the reason for leaving does not matter and the balance must be paid with the final check. In states that follow the employer policy, a clause forfeiting vacation on termination for cause can be enforceable if it was written and given to employees beforehand. Check the exact wording of the policy you received.' },
    { q: 'Do I get paid for unused sick days when I leave a job?', a: 'Usually not. State paid sick leave laws generally do not require payout of unused sick hours, because the leave protects against lost wages from illness rather than serving as earned pay. The exception is a combined PTO bank: when sick and vacation time are pooled, most states apply the vacation payout rule to the whole balance. Some employers pay sick leave voluntarily.' },
    { q: 'How is a vacation payout calculated?', a: `Multiply the hours or days in your balance by your rate of pay on your last day, not the rate you had when the time was earned. For example, ${hrs} hours at ${usd(rate, 2)} an hour is ${usd(hrs * rate)} before taxes. Salaried employees use the daily or hourly equivalent of salary. Income and payroll taxes apply as they do to other wages.` },
    { q: 'Are use-it-or-lose-it vacation policies legal?', a: 'In most states, yes, as long as employees know the rule in advance. States that treat earned vacation as wages forbid forfeiting hours already accrued, so employers there use accrual caps instead, which stop new accrual once a balance is reached. Check the table on this page for your state, then read the policy wording.' },
  ],
  related: ['final-paycheck-laws', 'paid-sick-leave-by-state', 'severance-pay', 'at-will-employment', 'state:california', 'state:colorado'],
  sources: ['dolVacation', 'dolLastPay'],
  extraSources: STATES.filter((s) => rule(s) === 'required' && s.finalPay.ptoSource).map((s) => ({ name: `${s.name}: vacation pay at separation`, url: s.finalPay.ptoSource!.url })),
});
