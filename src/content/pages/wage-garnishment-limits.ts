import { definePage } from '../../lib/page-types';
import { F, garnish, usd, pct, rate$ } from '../../lib/kit';

const floor = F.minWage * F.garnishMultiple;
const top = floor / (1 - F.garnishPct / 100);
const periods: Array<[string, number]> = [['Weekly', 1], ['Every two weeks', 2], ['Twice a month', 52 / 24], ['Monthly', 52 / 12]];
const prow = periods.map(([n, k]) => [n, usd(floor * k, 2), `${usd(floor * k, 2)} to ${usd(top * k, 2)}`, usd(top * k, 2)]);
const wrow = [200, 250, 290, 400, 600, 1000].map((w) => { const g = garnish(w); return [usd(w), usd(g.byPct, 2), usd(g.byFloor, 2), usd(g.max, 2), usd(w - g.max, 2)]; });
const ex = garnish(600);
const small = garnish(250);
const loanPct = 15;

export default definePage({
  id: 'wage-garnishment-limits',
  group: 'job',
  kind: 'guide',
  order: 50,
  slug: 'wage-garnishment-limits',
  nav: 'Wage garnishment limits',
  card: `How much of a paycheck a creditor can take, the ${pct(F.garnishPct)} federal cap, the protected floor and the debts with other limits.`,
  title: `Wage Garnishment Limits 2026: The ${pct(F.garnishPct)} Cap and State Rules`,
  description: `Wage garnishment limits in 2026: at most ${pct(F.garnishPct)} of disposable pay, and nothing if you earn ${usd(floor, 2)} a week or less. Child support, taxes and states differ.`,
  h1: 'Wage garnishment limits: how much of your pay can be taken',
  intro: 'A court order can send part of your paycheck to a creditor, but federal law caps the share and protects a minimum. Some debts and some states follow different rules.',
  resume: `For ordinary debts such as credit cards, medical bills or personal loans, federal law caps a wage garnishment at the lesser of two amounts: ${pct(F.garnishPct)} of your disposable earnings for the week, or the amount by which those earnings exceed ${F.garnishMultiple} times the federal minimum wage. With the minimum at ${rate$(F.minWage)}, that protected floor is ${usd(floor, 2)} a week: if your disposable earnings are at or below it, nothing can be garnished. Between ${usd(floor, 2)} and ${usd(top, 2)} a week, only the part above the floor can be taken, and above ${usd(top, 2)} the ${pct(F.garnishPct)} limit applies. Disposable earnings are what remains after legally required deductions such as taxes. Different limits apply to child support, which can take ${pct(F.supportPctWithFamily)} to ${pct(F.supportPctNoFamily)}, to federal student loans and other federal debts, and to tax levies. When a state law protects more of your pay, the state limit applies, and your employer cannot fire you over a garnishment for any one debt.`,
  mini: 'garnish',
  body: (h) => `
<h2>The two-part federal test</h2>
<p>Title III of the Consumer Credit Protection Act sets the national ceiling, and ${h.src('fs30', 'Fact Sheet #30')} of the Wage and Hour Division explains how it works. Each pay period, two numbers are compared. The first is ${pct(F.garnishPct)} of disposable earnings. The second is whatever is left after setting aside ${F.garnishMultiple} times the federal minimum wage, ${usd(floor, 2)} for a weekly pay period. The creditor gets the smaller of the two. For low earners the floor does the protecting; for higher earners the percentage does. ${`On ${usd(250)} of weekly disposable earnings, ${pct(F.garnishPct)} would be ${usd(small.byPct, 2)}, but only ${usd(small.byFloor, 2)} lies above the floor, so ${usd(small.max, 2)} is the most that can be taken. On ${usd(600)}, the floor would leave ${usd(ex.byFloor, 2)} available, but the ${pct(F.garnishPct)} cap stops the garnishment at ${usd(ex.max, 2)}.`}</p>
${h.table(['Disposable earnings per week', `${pct(F.garnishPct)} of earnings`, `Amount above ${usd(floor, 2)}`, 'Most that can be garnished', 'You keep at least'], wrow, 'Federal limit for ordinary debts, weekly pay period', ['r', 'r', 'r', 'r', 'r'])}
<h2>What counts as disposable earnings</h2>
<p>Earnings include wages, salaries, commissions, bonuses and periodic payments from a pension or retirement program, and lump sums such as commissions, bonuses, profit sharing and sign-on or referral bonuses can be reached too. Disposable earnings are what is left after deductions required by law: federal, state and local income taxes, the employee share of Social Security and Medicare, unemployment insurance contributions where employees pay them, and withholdings for a mandatory retirement system. Voluntary deductions are not subtracted. Health or life insurance premiums, voluntary retirement contributions, union dues, charitable gifts and payroll advances stay in the base, so the garnishment is figured on a larger number than your take-home pay. That surprises many people when they first see the order applied to a pay stub.</p>
<h2>The same limits for every pay schedule</h2>
<p>The floor is set per week, so it is converted for other pay periods. The Department of Labor publishes the equivalents, which follow directly from ${F.garnishMultiple} times ${rate$(F.minWage)}. In the middle band, only the amount above the floor can be taken; at or above the upper figure, the ${pct(F.garnishPct)} limit applies.</p>
${h.table(['Pay period', 'Nothing garnished at or below', 'Only the excess can be taken', 'Percentage cap applies from'], prow, `Protected amounts at the federal minimum wage of ${rate$(F.minWage)}`, ['l', 'r', 'r', 'r'])}
<h2>Debts with their own limits</h2>
<p>The ${pct(F.garnishPct)} ceiling covers ordinary creditors. Other debts follow other rules, all described in the same fact sheet:</p>
<ul>
<li><strong>Child support and alimony.</strong> Up to ${pct(F.supportPctWithFamily)} of disposable earnings can be taken if you support another spouse or child, and up to ${pct(F.supportPctNoFamily)} if you do not, plus an extra ${pct(F.supportArrearsExtra)} when the payments are more than 12 weeks behind.</li>
<li><strong>Federal student loans.</strong> The Department of Education's guaranty agencies can garnish up to ${pct(loanPct)} of disposable earnings for defaulted federal student loans.</li>
<li><strong>Other federal debts.</strong> Federal agencies can garnish up to ${pct(loanPct)} of disposable earnings to recover defaulted non-tax debts owed to the United States.</li>
<li><strong>Taxes and bankruptcy.</strong> Federal and state tax levies and orders of a bankruptcy court are not subject to these limits at all.</li>
</ul>
<p>When several orders hit the same paycheck, the federal limits apply regardless of the number of garnishment orders received. The federal law itself does not decide which order is paid first: that priority is set by state law or other federal laws.</p>
<h2>How a garnishment reaches your paycheck</h2>
<p>For most consumer debts, a creditor cannot simply call your employer. It first has to sue and win a judgment, or obtain one by default when the debtor does not answer the lawsuit. The court then issues a garnishment order, sometimes called a writ or an income withholding order, which is served on the employer. From that point the employer is legally bound: it must calculate the allowed amount each payday, withhold it and send it to the court officer or the creditor, and it can be held liable if it ignores the order. You should receive a copy with a notice explaining the exemptions you can claim.</p>
<p>Some debts skip the lawsuit. Child support withholding is usually ordered by a family court or a state child support agency and starts automatically. The IRS and state tax agencies can levy wages after their own notice process, and federal agencies collecting defaulted student loans or other federal debts use an administrative procedure with a chance to request a hearing. Because these orders bypass the ordinary court case, they can appear on a pay stub with little warning, so open every letter from a court or agency promptly.</p>
<p>A garnishment for an ordinary debt usually continues until the judgment, interest and allowed costs are paid, or until you leave the employer. Paying the creditor directly, negotiating a settlement or filing for bankruptcy can stop it, and each route has consequences that a legal aid office or a lawyer can explain.</p>
<h2>Where state law protects more</h2>
<p>The federal rule is a ceiling, not a target. When a state law allows a smaller garnishment, or protects a bigger part of earnings, the employer must follow the state rule. Some states set a lower percentage, tie the protected floor to the state's higher minimum wage, or exempt the wages of a head of household who supports a family. A few prohibit wage garnishment for ordinary consumer debts altogether. This site does not yet list each state's garnishment statute, so check the court papers you received: they normally cite the state exemption law and include a form to claim it. The state court that issued the order decides an exemption claim, and legal aid offices help with these forms at no cost. Deadlines to claim an exemption are short, so act as soon as you receive the notice.</p>
<h2>Your job is protected for one debt</h2>
<p>Federal law forbids an employer from firing you because your earnings are subject to garnishment for any one debt, no matter how many times that single creditor sends an order. The protection does not extend to garnishments for two or more separate debts, though some states go further. Questions about the federal limits go to the Wage and Hour Division, which enforces them. The ${h.a('final-paycheck-laws', 'final paycheck rules')} still apply if a job ends while an order is in place, and the ${h.a('minimum-wage-by-state', 'minimum wage page')} shows the state rates that some state garnishment laws use for their own floors. For what severance and other end-of-job payments look like, see the ${h.a('severance-pay', 'severance guide')}.</p>`,
  faqs: [
    { q: 'How much can be garnished from my paycheck?', a: `For ordinary debts, the lesser of ${pct(F.garnishPct)} of your weekly disposable earnings or the amount above ${usd(floor, 2)}, which is ${F.garnishMultiple} times the federal minimum wage. On ${usd(600)} a week, that is ${usd(ex.max, 2)}. Child support, student loans, other federal debts and taxes follow other limits, and a state law that protects more of your pay takes priority.` },
    { q: 'Can my wages be garnished if I make minimum wage?', a: `For ordinary debts, a full-time worker at the federal ${rate$(F.minWage)} usually keeps everything, because disposable earnings of ${usd(floor, 2)} a week or less are fully protected. Higher state minimum wages can push earnings above that floor, so part of the excess may be reachable. Child support orders and tax levies are not limited by the same floor.` },
    { q: 'Can I be fired for having my wages garnished?', a: 'Not for a garnishment for one debt. Federal law bars an employer from firing you because your wages are garnished for any single debt, even if that creditor sends several orders over time. If garnishments for two or more separate debts arrive, the federal protection ends, though some states protect workers further. The Wage and Hour Division enforces the federal rule.' },
    { q: 'How much can be garnished for child support?', a: `Up to ${pct(F.supportPctWithFamily)} of disposable earnings if you support another spouse or child, and up to ${pct(F.supportPctNoFamily)} if you do not. An extra ${pct(F.supportArrearsExtra)} can be added when payments are more than 12 weeks in arrears. These limits are higher than the ${pct(F.garnishPct)} cap for ordinary debts, and state law may set lower ones.` },
    { q: 'Are 401k contributions subtracted before a wage garnishment?', a: 'No. Disposable earnings are what remains after deductions required by law, such as income taxes, Social Security and Medicare. Voluntary deductions, including retirement contributions, health insurance premiums and union dues, are not subtracted, so the garnishment is calculated on a larger figure than your take-home pay. A state exemption law may treat some deductions differently.' },
  ],
  related: ['final-paycheck-laws', 'severance-pay', 'minimum-wage-by-state', 'at-will-employment', 'states'],
  sources: ['fs30', 'dolMinWage'],
});
