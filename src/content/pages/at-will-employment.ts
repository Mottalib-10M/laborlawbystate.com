import { definePage } from '../../lib/page-types';
import { FM, STATES, names } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const mt = STATES.find((s) => s.slug === 'montana');
const atWill = STATES.filter((s) => /^at-will/i.test(s.atWill.trim()));
const other = STATES.filter((s) => !atWill.includes(s));
const mtNote = mt?.notes.find((n) => /good cause/i.test(n.text));
const mtSpeech = mt?.notes.find((n) => /free speech/i.test(n.text));
const bls = 'https://www.bls.gov/opub/mlr/2001/01/art1full.pdf';

export default definePage({
  id: 'at-will-employment',
  group: 'job',
  kind: 'guide',
  order: 20,
  slug: 'at-will-employment',
  nav: 'At-will employment',
  card: `What at-will means, the exceptions courts and statutes recognize, and the one state that requires good cause.`,
  title: `At-Will Employment 2026: What It Means and the Exceptions`,
  description: `At-will employment in 2026: ${atWill.length} of the ${STATES.length} jurisdictions on this site follow it, ${other.length ? `${names(other)} requires good cause after probation` : 'with exceptions'}. See when a firing becomes illegal.`,
  h1: 'At-will employment: what it allows and where it stops',
  intro: 'Most American jobs can end at any moment, for almost any reason, on either side. The exceptions are narrower than many people think, but they are real.',
  resume: `At-will employment means that either you or your employer can end the job at any time, with or without a reason and without notice, as long as the reason is not one the law forbids. It is the default rule for private-sector jobs in the United States. Of the ${STATES.length} jurisdictions covered on this site, ${atWill.length} follow it. ${mt ? `${mt.name} is the exception: under its Wrongful Discharge from Employment Act, once an employee finishes the employer's probationary period, a discharge without good cause is wrongful.` : ''} Everywhere, the at-will rule gives way to federal and state statutes that forbid firing for discrimination, for taking protected leave such as the FMLA, or in retaliation for complaints. Courts in many states add three judge-made exceptions: a firing that violates public policy, an implied contract created by a handbook or promises, and, in a smaller group of states, a breach of an implied covenant of good faith. A written contract or a union agreement can also require cause.`,
  mini: 'atWillState',
  miniArg: stateArg(mt?.name),
  body: (h) => `
<h2>The rule itself, and what it does not say</h2>
<p>At will is a default, not a license. It means the employment relationship has no fixed term and no built-in requirement of a reason to end it. The employer can let you go because the business is slowing, because a manager prefers someone else, or for no stated reason; you can leave the same day without notice. A two-week notice is a custom, not a legal duty, unless a contract says otherwise. What the rule does not allow is a firing for a reason that a statute or court decision specifically forbids. That is the whole structure: freedom by default, with a list of prohibited reasons. A ${h.ext(bls, 'Monthly Labor Review article from the Bureau of Labor Statistics')} describes the doctrine as letting an employer terminate for good cause, bad cause or no cause at all, and traces how courts carved out the exceptions below starting in the late 1950s.</p>
<h2>Reasons no employer may use</h2>
<p>Federal statutes enforced by the ${h.ext('https://www.eeoc.gov/prohibited-employment-policiespractices', 'Equal Employment Opportunity Commission')} forbid firing because of race, color, religion, sex, including pregnancy, national origin, age for workers 40 or older, disability or genetic information, and state laws usually add more grounds. Retaliation is forbidden in many specific settings. An employer may not fire you for taking FMLA leave you were entitled to, up to ${FM.weeks} weeks, or for asking about it, as the ${h.src('dolFmla', 'Department of Labor')} explains. Under the federal garnishment law, it may not fire you because your wages are garnished for any one debt, as ${h.src('fs30', 'Fact Sheet #30')} states. Complaining about unpaid wages, reporting a safety hazard, serving on a jury, military service, joining with coworkers to discuss pay, and filing a workers' compensation claim are all protected in one law or another. The timing of a firing right after such an act is often the first sign of retaliation that an agency or a lawyer will look at.</p>
<h2>The three judge-made exceptions</h2>
<p>State courts have recognized exceptions of their own, described in general terms in the BLS article. They vary a great deal from one state to the next, so treat this as a map rather than a rule.</p>
<ul>
<li><strong>Public policy.</strong> A firing is wrongful when it punishes an employee for doing what the law requires or encourages, or for refusing to break the law. Refusing to falsify records, testifying truthfully or reporting illegal conduct are classic examples. Most states recognize some version of it.</li>
<li><strong>Implied contract.</strong> Promises can change at-will status. A handbook that lists a disciplinary process, an offer letter that speaks of permanent employment, or repeated assurances that people are fired only for cause can create an implied contract in some states. Employers respond with disclaimers stating that employment remains at will, and courts often give those disclaimers effect.</li>
<li><strong>Good faith and fair dealing.</strong> A smaller group of states reads into every employment relationship a duty not to act in bad faith, such as firing someone just before a commission or a pension vests in order to avoid paying it. This is the narrowest of the three.</li>
</ul>
${mt ? `<h2>${mt.name}: good cause after probation</h2>
<p>${mtNote ? mtNote.text : `${mt.name} departs from the at-will rule.`} The Wrongful Discharge from Employment Act lists the grounds that make a discharge wrongful: it was not for good cause after the probationary period, it was retaliation for refusing to violate public policy or for reporting a violation, or it broke the employer's own written personnel policy. ${mtSpeech ? mtSpeech.text : ''} During the probationary period, either side can still end the job for any reason, and the law gives employers more room with managers and supervisors. ${h.a('state:montana', 'The Montana page')} has the details and the link to the statute.</p>` : ''}
<h2>Probation periods in an at-will state</h2>
<p>Many employers announce a 90-day or six-month probationary period for new hires. Outside ${mt ? mt.name : 'the one good-cause state'}, that label rarely changes your legal position, because an at-will employee can be let go before and after probation on the same terms. What probation usually affects is the employer's own package: eligibility for benefits, paid time off or a performance review. Be careful with a handbook that says employees become permanent after probation, since that wording is the kind of promise that can support an implied contract claim in some states. ${mt ? `In ${mt.name}, by contrast, the end of probation is the moment the good-cause protection begins, so the length written in the offer letter or handbook matters a great deal.` : ''}</p>
<h2>What at will means for your last day</h2>
<p>Because notice is not required in an at-will state, a firing can take effect immediately. The state rules on the final paycheck still apply in full, as do the rules on accrued vacation, and the mini-simulator above shows both for the state you pick. Severance is not owed unless a policy or agreement promises it; the ${h.a('severance-pay', 'severance guide')} covers that, and the ${h.a('final-paycheck-laws', 'final paycheck calculator')} gives the date. If a large layoff is involved, the federal WARN Act can require advance notice even in an at-will state. Unemployment insurance is a separate system: being fired without cause usually leaves you eligible, while misconduct can disqualify you, and the state agency decides.</p>
<h2>Contracts and union agreements</h2>
<p>Employees with a written contract for a fixed term, or one that lists the reasons for termination, are not at will for the length of that contract. Most collective bargaining agreements require just cause for discipline and provide a grievance procedure that ends in arbitration, so union-represented workers are rarely at will in practice. Public employees often have civil service protection and constitutional due process rights that private employees do not. If you think a firing crossed one of these lines, write down the dates, the reasons you were given and the names of witnesses while they are fresh. A state civil rights agency, the federal Equal Employment Opportunity Commission or an employment lawyer can review the facts, and deadlines to file can be short.</p>`,
  faqs: [
    { q: 'Can I be fired for no reason in an at-will state?', a: 'Yes. In an at-will state, an employer can end your job without giving any reason and without notice. What it cannot do is fire you for a reason the law forbids, such as discrimination, taking protected leave, a wage complaint or other protected activity. If the stated reason looks like a cover for a forbidden one, an agency or court can look behind it.' },
    { q: 'Do I have to give two weeks notice in an at-will job?', a: 'No law requires it in an at-will job, and the employer is equally free to end the job without notice. Two weeks is a custom that keeps references good. A written contract can require notice, and in a few states giving notice changes when your final paycheck is due. Some employers pay out notice periods or end the job on the day you resign.' },
    { q: 'Is Montana the only state that is not at will?', a: `${mt ? `Yes, among the states. ${mt.name}'s Wrongful Discharge from Employment Act requires good cause to fire an employee who has completed the employer's probationary period, and it also bars retaliation and violations of written personnel policies. All other states start from at-will employment, with exceptions created by statutes, court decisions, contracts and union agreements.` : 'Montana is the one state whose statute requires good cause after a probationary period. All other states start from at-will employment, with exceptions created by statutes, court decisions, contracts and union agreements.'}` },
    { q: 'Can an employee handbook change at-will status?', a: 'Sometimes. In states that recognize the implied contract exception, a handbook that promises termination only for cause or lays out a mandatory disciplinary process can limit the employer. Most handbooks include a disclaimer saying employment remains at will and that the handbook is not a contract, and courts often enforce that wording. Specific written promises carry more weight than general statements.' },
    { q: 'What is the difference between at-will and right-to-work?', a: 'They are unrelated rules that are often confused. At-will concerns how a job can end: without a reason or notice. Right-to-work concerns union fees: in a right-to-work state, a union contract cannot require you to pay dues or fees to keep your job. A state can be at will and right-to-work, or at will without a right-to-work law.' },
  ],
  related: ['right-to-work-states', 'final-paycheck-laws', 'severance-pay', 'state:montana', 'pto-payout-laws'],
  sources: ['dolFmla', 'fs30', 'dolLastPay'],
  extraSources: [
    { name: 'EEOC: prohibited employment policies and practices', url: 'https://www.eeoc.gov/prohibited-employment-policiespractices' },
    { name: 'Bureau of Labor Statistics, Monthly Labor Review (January 2001): The employment-at-will doctrine, three major exceptions', url: bls },
    ...(mtNote ? [{ name: 'Montana Code Annotated 39-2-904: elements of wrongful discharge', url: mtNote.source.url }] : []),
  ],
});
