import { definePage } from '../../lib/page-types';
import { F, STATES, rtwStates, atFederal, mwNow, names, usd, rate$, day, TODAY } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const rtw = rtwStates();
const notRtw = STATES.filter((s) => s.rightToWork === false);
const unknown = STATES.filter((s) => s.rightToWork !== true && s.rightToWork !== false);
const repeal = STATES.map((s) => ({ s, n: s.notes.find((x) => /no longer a right-to-work|repeal/i.test(x.text) && /right.to.work/i.test(x.text)) })).filter((x) => x.n);
const constitution = STATES.map((s) => ({ s, n: s.notes.find((x) => /right.to.work/i.test(x.text) && /constitution/i.test(x.text)) })).filter((x) => x.n);
const avg = (xs: typeof STATES) => (xs.length ? xs.reduce((t, s) => t + mwNow(s.slug), 0) / xs.length : 0);
const fedRtw = atFederal().filter((s) => s.rightToWork === true);
const fedOther = atFederal().filter((s) => s.rightToWork === false);
const janus = 'https://www.supremecourt.gov/opinions/slipopinion/17';
const dues = 45;
const rows = STATES.map((s) => [s.name, s.rightToWork === true ? 'Yes' : s.rightToWork === false ? 'No' : 'Being verified', s.rightToWork && s.rightToWorkSource ? `<a href="${s.rightToWorkSource.url}" target="_blank" rel="nofollow noopener noreferrer">state law</a>` : '']);

export default definePage({
  id: 'right-to-work-states',
  group: 'job',
  kind: 'guide',
  order: 30,
  slug: 'right-to-work-states',
  nav: 'Right-to-work states',
  card: `Which states ban union security clauses, what that changes for your paycheck, and what it does not change.`,
  title: `Right-to-Work States 2026: Where No Union Fee Is Required`,
  description: `Right-to-work states in 2026: ${rtw.length} of the ${STATES.length} jurisdictions on this site ban contracts that make union fees a condition of the job. See the list and the rules.`,
  h1: 'Right-to-work states: the list and what the law really changes',
  intro: 'Right-to-work laws decide one narrow question: whether a union contract can require you to pay the union in order to keep your job.',
  resume: `A right-to-work state is one whose law forbids union contracts that require employees to join a union or pay it dues or fees as a condition of employment. Federal labor law allows those union security clauses in principle, but section 14(b) of the National Labor Relations Act lets each state prohibit them, and that is what a right-to-work law does. Of the ${STATES.length} jurisdictions covered on this site, ${rtw.length} have such a law in 2026: ${names(rtw)}.${repeal.length ? ` ${names(repeal.map((x) => x.s))} repealed ${repeal.length > 1 ? 'their' : 'its'} law and ${repeal.length > 1 ? 'are' : 'is'} no longer on the list.` : ''} In the other states, a private-sector union contract may require every worker it covers to pay a fee to the union, although no one can be forced to become a full member. Right-to-work is unrelated to at-will employment and does not affect wages, overtime or leave. For public employees everywhere, the Supreme Court ruled in 2018 that agency fees cannot be required.`,
  mini: 'rtwState',
  miniArg: stateArg(),
  body: (h) => `
<h2>Section 14(b): the federal permission behind every state law</h2>
<p>The National Labor Relations Act lets a union and an employer agree that employees in the bargaining unit must pay the union, because the union has a legal duty to represent all of them, members or not. Section 14(b), codified at ${h.src('usc164', '29 U.S.C. 164(b)')}, then carves out the states. It says nothing in the federal law authorizes agreements requiring membership in a labor organization as a condition of employment in any state where state law prohibits them. A right-to-work statute or constitutional amendment is the state using that permission. The result is a patchwork: the same national company can have a union security clause at a plant in one state and be barred from it at a plant across the border.</p>
<p>${constitution.length ? `Some states wrote the rule into their constitution rather than an ordinary statute, which makes it harder to repeal: ${constitution.map((x) => `${x.s.name} (${x.n!.text})`).join('; ')}` : 'Some states wrote the rule into their constitution rather than an ordinary statute, which makes it harder to repeal.'}</p>
${h.table(['State', 'Right-to-work law', 'Source'], rows, `Right-to-work status (check date ${day(TODAY)})`, ['l', 'l', 'l'])}
<h2>What changes for a worker covered by a union contract</h2>
<p>In a right-to-work state, a unionized employer cannot fire you for refusing to join the union or to pay it anything. The union still negotiates your wages and still has to represent you fairly in grievances, because it is the exclusive representative of everyone in the unit. Supporters call that freedom of choice; unions call the nonpayers free riders. Either way, the practical effect is on your paycheck: dues of ${usd(dues)} a month come to ${usd(dues * 12)} a year, and in a right-to-work state paying them is optional.</p>
<p>Outside right-to-work states, a contract with a union security clause can require the workers it covers to pay the union. The obligation is financial, and the exact scope of the fee that can be demanded, including what objectors may refuse to fund, is set by federal labor law and the decisions of the National Labor Relations Board rather than by the state. The mini-simulator above shows the yearly cost of dues and whether a fee can be required in the state you pick.</p>
<h2>What right-to-work does not change</h2>
<p>The label is often misunderstood. It does not give you a right to a job, protect you from being fired, or set any wage. It is not the same as ${h.a('at-will-employment', 'at-will employment')}, which concerns how a job can end and applies in nearly every state, right-to-work or not. It has no effect on the ${h.a('minimum-wage-by-state', 'minimum wage')}, overtime, breaks, paid leave or the final paycheck. Your right to join a union, to organize with coworkers and to discuss pay is protected by federal law in every state. And for workers who are not covered by a union contract at all, which is most private-sector employees, right-to-work changes nothing in daily work.</p>
<h2>Right-to-work states and pay rules, side by side</h2>
<p>Because right-to-work laws say nothing about wages, any link with pay comes from the politics of the states that adopted them, not from the law itself. The data on this site makes the pattern visible. The average general minimum wage in force on ${day(TODAY)} is ${rate$(avg(rtw))} across the right-to-work states covered here and ${rate$(avg(notRtw))} across the others. ${fedRtw.length ? `Of the states that still leave workers at the federal ${rate$(F.minWage)}, ${fedRtw.length} ${fedRtw.length > 1 ? 'are' : 'is'} right-to-work (${names(fedRtw)})${fedOther.length ? ` and ${fedOther.length} ${fedOther.length > 1 ? 'are' : 'is'} not` : ''}.` : ''} A statewide paid sick leave law exists in ${rtw.filter((s) => s.sickLeave.mandatory).length} of the ${rtw.length} right-to-work states and in ${notRtw.filter((s) => s.sickLeave.mandatory).length} of the ${notRtw.length} others. None of this follows from section 14(b); a state could adopt right-to-work and a high minimum wage together, and a few have mixed policies.</p>
<p>For an individual worker, the direct money question is only the union fee. A unionized warehouse worker paying ${usd(dues)} a month keeps ${usd(dues * 12)} a year by declining to pay in a right-to-work state, while still receiving the contract wage the union negotiated. Whether that is worth it is a personal and collective choice that the law leaves to you.</p>
<h2>Public employees: the Janus decision</h2>
<p>Government workers are not covered by the National Labor Relations Act; their bargaining rights come from state law. Until 2018, many states allowed public-sector unions to collect agency fees from nonmembers. In Janus v. American Federation of State, County, and Municipal Employees, the ${h.ext(janus, 'Supreme Court held')} that the State of Illinois' extraction of agency fees from nonconsenting public-sector employees violates the First Amendment, overruling its earlier Abood decision. Since then, no public employee anywhere in the country can be required to pay a union as a condition of the job, so public-sector work is effectively right-to-work in every state. The ruling does not reach private employers, where section 14(b) and state law still decide.</p>
<h2>How to tell whether a fee applies to you</h2>
<p>Start with the collective bargaining agreement. A union security clause is usually a short article near the beginning, often titled union security or union membership, that says when new hires must begin paying and what happens if they do not. If there is no such clause, no fee can be required anywhere, whatever the state. If there is one and you work in a right-to-work state, the clause cannot be enforced against you. Then look at your pay stub: dues are normally taken by payroll deduction only with a signed authorization, and that card may limit when you can revoke it, so read it before signing. Questions about a specific contract go to the union, the employer's human resources office or the regional office of the National Labor Relations Board. ${unknown.length ? `The status of ${names(unknown)} is still being verified against the state's own sources and is shown as such in the table.` : ''} ${notRtw.length ? `The ${notRtw.length} jurisdictions marked No in the table allow union security clauses in private-sector contracts.` : ''}</p>`,
  faqs: [
    { q: 'What does right to work mean for employees?', a: 'It means a union contract cannot make you join the union or pay it dues or fees to keep your job. If your workplace is unionized, the union still bargains for you and must represent you, but paying is your choice. It does not mean you cannot be fired, and it has no effect on pay rules, overtime or leave.' },
    { q: 'Which states are right to work in 2026?', a: `Among the ${STATES.length} jurisdictions covered on this site, ${rtw.length} have a right-to-work law: ${names(rtw)}. In the remaining states, a private-sector union contract may require covered workers to pay at least an agency fee.` },
    { q: 'Do I have to join a union if my workplace is unionized?', a: 'Not in a right-to-work state, where you owe the union nothing even when it negotiates your contract. In other states, a contract with a union security clause can require covered workers to pay a fee to the union, and federal labor law, not the state, sets what that fee may cover. Without such a clause, nothing is owed anywhere.' },
    { q: 'Are public employees forced to pay union fees?', a: 'No. In Janus v. AFSCME, decided in 2018, the Supreme Court held that requiring agency fees from nonconsenting public-sector employees violates the First Amendment. Since then, no government employer in any state can require its workers to pay a union. Private-sector workers are not covered by that ruling and depend on state law.' },
  ],
  related: ['at-will-employment', 'final-paycheck-laws', 'minimum-wage-by-state', 'state:texas', 'state:michigan', 'states'],
  sources: ['usc164'],
  extraSources: [{ name: 'Supreme Court of the United States: Janus v. State, County, and Municipal Employees, 585 U.S. 878 (2018), opinions of the 2017 term', url: janus }, ...rtw.filter((s) => s.rightToWorkSource).slice(0, 12).map((s) => ({ name: `${s.name}: right-to-work law`, url: s.rightToWorkSource!.url }))],
});
