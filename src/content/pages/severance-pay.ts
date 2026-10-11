import { definePage } from '../../lib/page-types';
import { F, STATES, sev, usd, num, names } from '../../lib/kit';

const salary = 65000;
const weekly = salary / 52;
const years = 8;
const one = sev(weekly, years, 1);
const two = sev(weekly, years, 2);
const capped = sev(weekly, years, 2, 4, 12);
const floor = sev(weekly, 1, 1, 4, 26);
const required = STATES.filter((s) => s.finalPay.ptoPayout === 'required');
const rows = [
  ['1 week per year of service', num(one.weeks), usd(one.amount)],
  ['2 weeks per year of service', num(two.weeks), usd(two.amount)],
  ['2 weeks per year, minimum 4, maximum 12', num(capped.weeks), usd(capped.amount)],
  ['1 week per year, minimum 4 (after 1 year)', num(floor.weeks), usd(floor.amount)],
  [`${F.warnDays} days of pay in lieu of WARN notice`, num(F.warnDays / 7, 1), usd((weekly * F.warnDays) / 7)],
];

export default definePage({
  id: 'severance-pay',
  group: 'job',
  kind: 'guide',
  order: 40,
  slug: 'severance-pay',
  nav: 'Severance pay',
  card: `No law requires severance in general. How employer formulas work, what WARN notice adds, and what to check before signing.`,
  title: `Severance Pay 2026: Formulas, WARN Notice and Your Rights`,
  description: `Severance pay in 2026: no federal law requires it, but ${F.warnDays} days of WARN notice apply to layoffs at employers with ${F.warnEmployees}+ workers. Estimate your own package.`,
  h1: 'Severance pay: when it is owed and how much to expect',
  intro: 'Severance is a promise, not a statutory right. What you receive depends on your employer’s policy, your contract and, for large layoffs, federal notice rules.',
  resume: `No federal law requires severance pay. The Department of Labor says the Fair Labor Standards Act contains no severance requirement and that severance is a matter of agreement between an employer and an employee, usually based on length of service. States generally do not require it for an ordinary termination either. You are owed severance only if a written policy, an employment contract, a union agreement or a separation agreement promises it. The common formula is one or two weeks of pay per year of service, often with a minimum and a cap: at ${usd(salary)} a year and ${years} years of service, one week per year comes to ${usd(one.amount)} and two weeks to ${usd(two.amount)}, before taxes. Separately, the federal WARN Act requires employers with ${F.warnEmployees} or more employees to give ${F.warnDays} calendar days of notice before a plant closing or mass layoff, and pay in place of that notice often appears in layoff packages. Most severance offers come with a release of legal claims, so read the agreement before signing.`,
  mini: 'severance',
  body: (h) => `
<h2>Where a right to severance comes from</h2>
<p>Because the ${h.src('dolSeverance', 'Department of Labor')} treats severance as a matter of agreement, the first job is to find the document that creates it. Four sources are common. A written severance plan or policy, often in the benefits section of the handbook, promises a formula to employees who are laid off. An employment contract or offer letter, usually for managers, may promise a set number of months. A collective bargaining agreement can set severance for union members. And a separation agreement, offered at the time of the layoff, creates the payment in exchange for something from you. If none of these exists, the employer can lawfully pay nothing beyond your final wages.</p>
<p>A formal severance plan that the employer maintains for a group of employees can be an employee benefit plan under federal law. In that case the Employee Benefits Security Administration, which the Department of Labor points to, can help if promised benefits are not paid, and the plan must follow its written terms and claims procedure. A one-off payment negotiated with a single employee is a contract question instead.</p>
<h2>How the usual formulas work</h2>
<p>Most plans multiply a number of weeks of pay by years of service, then apply a floor and a ceiling. Partial years may be rounded, prorated or ignored, depending on the plan. Weekly pay normally means base salary divided by 52, without bonuses or overtime unless the plan says otherwise. The table applies common formulas to a salary of ${usd(salary)} and ${years} years of service; the mini-simulator above runs any salary, tenure and weeks per year.</p>
${h.table(['Formula', 'Weeks of pay', 'Amount before taxes'], rows, `Severance at ${usd(salary)} a year (weekly pay ${usd(weekly)}) with ${years} years of service`, ['l', 'r', 'r'])}
<p>Executives and senior staff often negotiate a fixed number of months instead, sometimes with continued health coverage paid by the employer and accelerated vesting of stock. Hourly employees in a broad layoff more commonly receive a flat number of weeks. Severance is paid either as a lump sum or as salary continuation on the regular payroll schedule, and the agreement says which.</p>
<p>The rounding rule for partial years can matter more than people expect. With ${years} years and six months of service at two weeks per year, a plan that prorates pays ${num(sev(weekly, years + 0.5, 2).weeks)} weeks, ${usd(sev(weekly, years + 0.5, 2).amount)}, while a plan that counts only completed years pays ${num(two.weeks)} weeks, ${usd(two.amount)}. Ask for the plan document, not just the summary, and check the definition of pay and of a year of service before you compare an offer with what the policy promises.</p>
<h2>The WARN Act: notice before large layoffs</h2>
<p>The Worker Adjustment and Retraining Notification Act does not create severance, but it often shapes layoff packages. Under ${h.src('cfr6391', '20 CFR 639.1')}, covered employers must give ${F.warnDays} calendar days of advance notice of a plant closing or a mass layoff. The definitions in ${h.src('cfr6393', '20 CFR 639.3')} set the thresholds: an employer is covered with ${F.warnEmployees} or more employees, not counting part-time staff, or ${F.warnEmployees} or more counting part-timers who together work at least 4,000 hours a week. A plant closing is a shutdown that causes employment losses for 50 or more full-time employees at one site within 30 days. A mass layoff is a reduction at one site within 30 days that hits at least 33 percent of active full-time employees and at least 50 people, or 500 or more people whatever the percentage.</p>
<p>An employer that orders a covered closing or layoff without the required notice is liable, under ${h.ext('https://www.govinfo.gov/content/pkg/USCODE-2023-title29/html/USCODE-2023-title29-chap23-sec2104.htm', '29 U.S.C. 2104')}, for back pay and benefits for each day of the violation, up to ${F.warnDays} days. Employers planning a layoff therefore often pay wages through the notice period instead of keeping people at work, which is why many layoff packages include ${F.warnDays} days of pay labeled as WARN pay, separate from any severance formula. Several states have their own mini-WARN laws with lower thresholds or longer notice. If a large layoff left you without notice, the state dislocated worker unit and an employment lawyer can tell you whether the act applied.</p>
<h2>Before you sign a separation agreement</h2>
<p>Severance offered at the time of a layoff almost always comes with a release: you give up the right to sue the employer over the job and its end in exchange for the payment. Read what is released, whether the agreement includes a non-disparagement, confidentiality or non-compete clause, and whether you must return company property first. If you are 40 or older and the release covers age discrimination claims, the ${h.ext('https://www.eeoc.gov/laws/guidance/qa-understanding-waivers-discrimination-claims-employee-severance-agreements', 'EEOC explains')} that the waiver must give you at least 21 days to consider the offer, 45 days in a group layoff, and seven days to revoke your signature after signing. No agreement can stop you from filing a charge with the EEOC or taking part in its investigation, and wages already earned are owed whatever you sign.</p>
<p>Severance does not replace your final wages. Earned pay and, in ${names(required)}, accrued vacation are due under the state ${h.a('final-paycheck-laws', 'final paycheck rules')} whether or not you sign. An employer that holds your last paycheck until you accept a release is mixing two separate obligations, and the state labor agency can address the wage part.</p>
<h2>Severance, unemployment and health coverage</h2>
<p>Whether severance delays unemployment benefits depends on the state: some treat it as wages that postpone benefits for the weeks it covers, others ignore a lump sum paid for past service. File your claim promptly and report the payment as the state asks; the state agency decides. For health insurance, ${h.ext('https://www.dol.gov/general/topic/health-plans/cobra', 'COBRA')} lets you continue the group health plan of an employer with 20 or more employees for a limited time, but you can be charged up to 102% of the full premium unless the agreement subsidizes it. Ask whether the employer will pay part of the premium, because that subsidy is one of the more common items to negotiate. Your ${h.a('states', 'state page')} links the labor agency for wage questions, and the ${h.a('at-will-employment', 'at-will guide')} explains why most jobs can end without notice in the first place.</p>`,
  faqs: [
    { q: 'Is severance pay required by law?', a: `No, not in general. Federal law does not require severance for an ordinary termination, and states generally do not either. It is owed only when a written policy, a contract, a union agreement or a separation agreement promises it. The federal WARN Act can require ${F.warnDays} days of notice, or back pay for missing notice, before a large layoff, which is a different obligation.` },
    { q: 'How much severance is normal for 10 years of service?', a: `It depends entirely on the employer's formula. At one week of pay per year, 10 years gives 10 weeks; at two weeks per year, 20 weeks, often capped at a set number. For someone earning ${usd(salary)} a year, that is ${usd(sev(weekly, 10, 1).amount)} or ${usd(sev(weekly, 10, 2).amount)} before taxes. Senior roles often negotiate months of pay instead.` },
    { q: 'Can I negotiate a severance package?', a: 'Often, yes. The employer wants the release of claims that comes with the payment, which gives you some leverage, especially if you have a plausible legal claim or long service. Common points to negotiate are the number of weeks, a subsidy for COBRA health coverage, the reference and the wording of confidentiality or non-compete clauses. An employment lawyer can review the agreement.' },
    { q: 'Does severance pay affect unemployment benefits?', a: 'In some states it does. A state may treat severance as wages that delay unemployment benefits for the weeks it covers, while others ignore a lump sum paid for past service. Apply as soon as the job ends, report the severance exactly as the claim form asks, and let the state agency decide. Not reporting it can lead to repayment and penalties.' },
    { q: 'Does an employer have to pay severance after a mass layoff?', a: `Not as such. The WARN Act requires employers with ${F.warnEmployees} or more employees to give ${F.warnDays} calendar days of notice before a plant closing or mass layoff. If they do not, they owe back pay and benefits for each day of the violation, up to ${F.warnDays} days. That is often included in layoff packages as WARN pay, alongside any severance the employer's own policy provides.` },
  ],
  related: ['final-paycheck-laws', 'at-will-employment', 'pto-payout-laws', 'wage-garnishment-limits', 'states'],
  sources: ['dolSeverance', 'cfr6391', 'cfr6393', 'dolLastPay'],
  extraSources: [
    { name: '29 U.S.C. 2104: WARN Act remedies (back pay and benefits up to 60 days)', url: 'https://www.govinfo.gov/content/pkg/USCODE-2023-title29/html/USCODE-2023-title29-chap23-sec2104.htm' },
    { name: 'EEOC: Understanding waivers of discrimination claims in employee severance agreements', url: 'https://www.eeoc.gov/laws/guidance/qa-understanding-waivers-discrimination-claims-employee-severance-agreements' },
    { name: 'U.S. Department of Labor: Continuation of health coverage (COBRA)', url: 'https://www.dol.gov/general/topic/health-plans/cobra' },
  ],
});
