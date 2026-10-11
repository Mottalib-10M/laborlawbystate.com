import { definePage } from '../../lib/page-types';
import { STATES, rtwStates, names, usd, day, TODAY } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const rtw = rtwStates();
const notRtw = STATES.filter((s) => s.rightToWork === false);
const unknown = STATES.filter((s) => s.rightToWork !== true && s.rightToWork !== false);
const repeal = STATES.map((s) => ({ s, n: s.notes.find((x) => /no longer a right-to-work|repeal/i.test(x.text) && /right.to.work/i.test(x.text)) })).filter((x) => x.n);
const constitution = STATES.map((s) => ({ s, n: s.notes.find((x) => /right.to.work/i.test(x.text) && /constitution/i.test(x.text)) })).filter((x) => x.n);
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
  description: `Right-to-work states in 2026: ${rtw.length} of the ${STATES.length} jurisdictions on this site ban contracts that make union fees a condition of the job. See the list and what it means for you.`,
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
<p>Outside right-to-work states, a contract with a union security clause can require you to pay. Even there, federal law does not make full membership mandatory. Workers who object can choose to pay only the share of dues tied to collective bargaining, contract administration and grievances, and not the share spent on political or other activities. That reduced fee is often called an agency fee. The mini-simulator above shows the yearly cost of dues and whether a fee can be required in the state you pick.</p>
<h2>What right-to-work does not change</h2>
<p>The label is often misunderstood. It does not give you a right to a job, protect you from being fired, or set any wage. It is not the same as ${h.a('at-will-employment', 'at-will employment')}, which concerns how a job can end and applies in nearly every state, right-to-work or not. It has no effect on the ${h.a('minimum-wage-by-state', 'minimum wage')}, overtime, breaks, paid leave or the final paycheck. Your right to join a union, to organize with coworkers and to discuss pay is protected by federal law in every state. And for workers who are not covered by a union contract at all, which is most private-sector employees, right-to-work changes nothing in daily work.</p>
<h2>Public employees: the Janus decision</h2>
<p>Government workers are not covered by the National Labor Relations Act; their bargaining rights come from state law. Until 2018, many states allowed public-sector unions to collect agency fees from nonmembers. In Janus v. American Federation of State, County, and Municipal Employees, the ${h.ext(janus, 'Supreme Court held')} that the State of Illinois' extraction of agency fees from nonconsenting public-sector employees violates the First Amendment, overruling its earlier Abood decision. Since then, no public employee anywhere in the country can be required to pay a union as a condition of the job, so public-sector work is effectively right-to-work in every state. The ruling does not reach private employers, where section 14(b) and state law still decide.</p>
<h2>Railroads, airlines and federal enclaves</h2>
<p>A few groups fall outside state right-to-work laws. Railroad and airline employees are covered by the Railway Labor Act, which allows union security agreements nationwide whatever the state says. Work performed on some federal enclaves, such as certain military bases, can also be governed by federal rather than state law. If you work in one of these sectors, the rules in your collective bargaining agreement and the federal statute govern, not your state's right-to-work law. ${unknown.length ? `The status of ${names(unknown)} is still being verified against the state's own sources and is shown as such in the table.` : ''} ${notRtw.length ? `The ${notRtw.length} jurisdictions marked No in the table allow union security clauses in private-sector contracts.` : ''}</p>`,
  faqs: [
    { q: 'What does right to work mean for employees?', a: 'It means a union contract cannot make you join the union or pay it dues or fees to keep your job. If your workplace is unionized, the union still bargains for you and must represent you, but paying is your choice. It does not mean you cannot be fired, and it has no effect on pay rules, overtime or leave.' },
    { q: 'Which states are right to work in 2026?', a: `Among the ${STATES.length} jurisdictions covered on this site, ${rtw.length} have a right-to-work law: ${names(rtw)}. Each was checked against the state constitution or statute linked in the table. In the remaining states, a private-sector union contract may require covered workers to pay at least an agency fee.` },
    { q: 'Do I have to join a union if my workplace is unionized?', a: 'No, not in any state. Full union membership can never be required by federal law. In a right-to-work state you also owe the union nothing. In other states, a contract with a union security clause can require you to pay a fee covering the cost of bargaining and representation, and objectors can limit it to that share.' },
    { q: 'Are public employees forced to pay union fees?', a: 'No. In Janus v. AFSCME, decided in 2018, the Supreme Court held that requiring agency fees from nonconsenting public-sector employees violates the First Amendment. Since then, no government employer in any state can require its workers to pay a union. Private-sector workers are not covered by that ruling and depend on state law.' },
  ],
  related: ['at-will-employment', 'final-paycheck-laws', 'minimum-wage-by-state', 'state:texas', 'state:michigan', 'states'],
  sources: ['usc164'],
  extraSources: [{ name: 'Supreme Court of the United States: Janus v. State, County, and Municipal Employees, 585 U.S. 878 (2018), opinions of the 2017 term', url: janus }, ...rtw.filter((s) => s.rightToWorkSource).slice(0, 12).map((s) => ({ name: `${s.name}: right-to-work law`, url: s.rightToWorkSource!.url }))],
});
