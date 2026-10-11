import { definePage } from '../../lib/page-types';
import { STATES, F, TODAY, mwNow, rate$, usd, day, names } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const noCredit = STATES.filter((s) => !s.minWage.tipped.tipCreditAllowed);
const credit = STATES.filter((s) => s.minWage.tipped.tipCreditAllowed);
const cashOf = (slug: string) => { const s = STATES.find((x) => x.slug === slug)!; return s.minWage.tipped.tipCreditAllowed ? (s.minWage.tipped.cashWage ?? F.tippedCash) : mwNow(slug); };
const atFloor = credit.filter((s) => cashOf(s.slug) <= F.tippedCash);
const ranked = [...credit].sort((a, b) => cashOf(b.slug) - cashOf(a.slug));
const hiCash = ranked[0];
const bigCredit = [...credit].sort((a, b) => (mwNow(b.slug) - cashOf(b.slug)) - (mwNow(a.slug) - cashOf(a.slug)))[0];
const smallCredit = [...credit].filter((s) => mwNow(s.slug) - cashOf(s.slug) > 0).sort((a, b) => (mwNow(a.slug) - cashOf(a.slug)) - (mwNow(b.slug) - cashOf(b.slug)))[0];
const topNo = [...noCredit].sort((a, b) => mwNow(b.slug) - mwNow(a.slug))[0];
const has = (slug: string) => STATES.some((s) => s.slug === slug);
/** Example: $4 an hour in tips at the federal cash wage. */
const tipsEx = 4;
const shortEx = Math.max(0, F.minWage - (F.tippedCash + tipsEx));
const otCash = F.minWage * F.otMultiplier - F.tipCredit;

export default definePage({
  id: 'tipped-minimum-wage',
  group: 'wage',
  kind: 'guide',
  order: 30,
  slug: 'tipped-minimum-wage-by-state',
  nav: 'Tipped minimum wage',
  card: `The cash wage a server or bartender can be paid before tips in each state, and when the employer must top it up.`,
  title: `Tipped Minimum Wage by State 2026: ${rate$(F.tippedCash)} to Full Wage`,
  description: `Tipped minimum wage by state in 2026: ${rate$(F.tippedCash)} federal cash wage, ${noCredit.length} states with no tip credit at all. See your cash wage, the tip credit and the top-up owed.`,
  h1: 'Tipped minimum wage by state: cash wage, tip credit and top-up',
  intro: 'A server can legally receive a few dollars an hour in cash, but never less than the full minimum once tips are counted. The rules and the figures differ widely by state.',
  resume: `Under federal law an employer may pay a tipped employee a cash wage of ${rate$(F.tippedCash)} an hour and count up to ${rate$(F.tipCredit)} of tips per hour toward the ${rate$(F.minWage)} minimum, a deduction called the tip credit. It applies to workers who customarily and regularly receive more than $30 a month in tips, and only if cash wage plus tips reaches the minimum in each workweek; otherwise the employer pays the difference. States go further. ${noCredit.length} states allow no tip credit at all and require the full minimum wage before tips: ${names(noCredit)}${topNo ? `, where the rate reaches ${rate$(mwNow(topNo.slug))} in ${topNo.name}` : ''}. Another ${atFloor.length} on file keep the federal ${rate$(F.tippedCash)} cash wage. In between, cash wages run as high as ${hiCash ? `${rate$(cashOf(hiCash.slug))} in ${hiCash.name}` : 'the full minimum'}. The checker below tells you whether your tips cover the gap.`,
  mini: 'tipTopUp',
  miniArg: stateArg('Texas'),
  body: (h) => `
<h2>How the tip credit works</h2>
<p>The tip credit is not a separate wage; it is permission for the employer to let customers pay part of the minimum. The arithmetic is short. Take the minimum wage that applies, subtract the cash wage the employer pays, and the result is the largest part of your tips the employer may count. Under federal law that is ${rate$(F.minWage)} less ${rate$(F.tippedCash)}, or ${rate$(F.tipCredit)} an hour. If your tips in a workweek average less than the credit, the employer owes the shortfall. A server in a federal-floor state who earns ${rate$(tipsEx)} an hour in tips receives ${rate$(F.tippedCash + tipsEx)} with the cash wage, so the employer must add ${rate$(shortEx)} for every hour of that week, or ${usd(shortEx * 30, 2)} over 30 hours.</p>
<p>The test runs week by week, not over a month or a season. A slow Tuesday is averaged with a busy Saturday within the same workweek, but a strong week cannot carry a weak one. The employer must keep records of the tips you report so the calculation can be checked.</p>
<h2>The cash wage, state by state</h2>
<p>The table lists the general minimum wage on ${day(TODAY)}, the lowest cash wage an employer may pay a tipped worker, and the largest tip credit that leaves. A dash in the credit column means the state requires the full rate before tips.</p>
${h.table(['State', 'Minimum wage', 'Tipped cash wage', 'Largest tip credit'], STATES.map((s) => [s.name, rate$(mwNow(s.slug)), rate$(cashOf(s.slug)), s.minWage.tipped.tipCreditAllowed ? rate$(Math.max(0, mwNow(s.slug) - cashOf(s.slug))) : '-']), `Tipped cash wage and tip credit by state on ${day(TODAY)}`, ['l', 'r', 'r', 'r'])}
<p>Three groups stand out. The no-credit states, ${names(noCredit)}, treat tips as money on top of the full minimum, which makes them the best paid places for servers on an hourly basis. The federal-floor group, ${names(atFloor)}, lets the cash wage sit at ${rate$(F.tippedCash)}, so nearly everything above that depends on customers. Everyone else sets a cash wage in between, often as a share of the full minimum, so it rises each time the general rate does.${bigCredit ? ` The widest gap between cash wage and minimum on file is in ${bigCredit.name}, where tips may cover up to ${rate$(mwNow(bigCredit.slug) - cashOf(bigCredit.slug))} of every hour.` : ''}${smallCredit ? ` The narrowest is in ${smallCredit.name}, at ${rate$(mwNow(smallCredit.slug) - cashOf(smallCredit.slug))}${smallCredit.slug === 'hawaii' ? ', and Hawaii only allows it when wages and tips together clear the minimum by a set margin' : ''}.` : ''}</p>
<h2>What your employer must tell you first</h2>
<p>The federal tip credit is not automatic. Before taking it, the employer has to inform you of the cash wage it pays, the amount of the tip credit it claims, that the credit cannot exceed the tips you actually receive, that you keep all of your tips except through a valid tip pool, and that the credit does not apply unless you were told these points. An employer that skips this notice cannot use the credit and owes the full minimum for the hours worked. Many states add written notice rules of their own, sometimes on each pay stub.</p>
<h2>Tip pools, managers and service charges</h2>
<p>When an employer takes a tip credit, a mandatory tip pool can only include workers who customarily and regularly receive tips, such as servers, bussers, counter staff who serve customers and service bartenders. Cooks and dishwashers can be included only in a pool run by an employer that pays the full minimum wage and takes no credit. Managers and supervisors may never keep any part of employees' tips, whether through a pool or otherwise, although a manager can keep tips from customers he or she served directly. A compulsory service charge added to the bill, such as a fixed percentage for large parties, is not a tip. It belongs to the employer, who may pass it on as wages, but it cannot be counted toward the tip credit.</p>
<p>Dual jobs raise a related question. A server who also spends part of the shift on work that is not part of the tipped job, such as cleaning a kitchen, may be owed the full minimum for that time. The federal rule turns on whether the side work is related to the tipped occupation and how much of it there is, and state rules can be tighter.</p>
<h2>Overtime for tipped workers</h2>
<p>Overtime is computed on the full minimum wage, not on the reduced cash wage. Under federal law a tipped worker's overtime rate is ${F.otMultiplier} times ${rate$(F.minWage)}, which is ${rate$(F.minWage * F.otMultiplier)}, and the employer may still subtract the same ${rate$(F.tipCredit)} tip credit, so the cash paid for each overtime hour must be at least ${rate$(otCash)}. A common payroll error is to apply ${F.otMultiplier} to the ${rate$(F.tippedCash)} cash wage, which gives far too little. In states without a tip credit, overtime is simply ${F.otMultiplier} times the full regular rate. ${h.a('time-and-a-half', 'The time and a half guide')} shows how bonuses and commissions enter the regular rate.</p>
<h2>Local rates and tipped work</h2>
<p>City and county minimum wages bring their own tipped figures. Some local ordinances allow no credit even where the state does${has('arizona') ? ', as in Flagstaff, Arizona' : ''}; others set a local tipped cash wage that tracks the local minimum${has('colorado') ? ', as Denver does in Colorado' : ''}. ${has('district-of-columbia') ? 'The District of Columbia sets its tipped base wage as a share of the full minimum and raises it each July 1. ' : ''}When a local rate applies, the tip credit is measured against the local minimum, not the state one. ${h.a('city-minimum-wage', 'The city minimum wage guide')} lists the local rates on file.</p>
<h2>Credit card tips and tip-outs</h2>
<p>Tips paid by card belong to the employee as much as cash tips do. Under federal rules the employer may deduct only the processing fee charged on the tip portion, and the tip must reach you no later than the regular payday. A tip-out you hand to coworkers under a valid pool counts toward your tips only for the part you keep, so the minimum wage check should use your tips after the pool, not before.</p>
<h2>If your tips do not reach the minimum</h2>
<p>Keep your own log of hours and tips per shift, and compare it with your pay stub each week. If cash wage plus tips fell short, the employer owed a top-up for that week. The state labor agency takes claims under the state rule and the Wage and Hour Division under the federal one; either can order back pay. The agency decides the facts, and an employment lawyer can look at a case involving a tip pool or a dispute about which duties count as tipped work.</p>`,
  faqs: [
    { q: 'What is the lowest hourly wage a server can be paid?', a: `Under federal law, ${rate$(F.tippedCash)} an hour in cash, as long as tips bring the total to at least ${rate$(F.minWage)} each workweek. ${atFloor.length} states on file use that floor. ${noCredit.length} states, including ${names(noCredit.slice(0, 3))}, require the full minimum wage before tips, and the rest set a cash wage in between. Your state's figure is in the table on this page.` },
    { q: 'Which states do not allow a tip credit?', a: `${names(noCredit)} allow no tip credit: tipped employees there get the full state minimum wage in cash, and tips come on top.${has('arizona') ? ' Flagstaff, Arizona, refuses it at the city level too.' : ''} In every other state, the employer may count part of your tips toward the minimum if it follows the notice rules.` },
    { q: 'Does my boss have to pay me more if my tips are low?', a: `Yes. If your cash wage plus tips averages less than the minimum wage for the hours of a workweek, your employer must pay the difference for that week. At the federal ${rate$(F.tippedCash)} cash wage with ${rate$(tipsEx)} an hour in tips, the top-up is ${rate$(shortEx)} an hour. Weeks are checked one at a time, not averaged over a month.` },
    { q: 'Can my manager take part of the tip pool?', a: 'No. Under federal law, employers, managers and supervisors may not keep any portion of an employee’s tips, including through a tip pool. A manager may keep tips received directly from customers he or she personally served. When the employer takes a tip credit, the pool can only include workers who customarily and regularly receive tips, such as servers, bussers and service bartenders.' },
    { q: 'How is overtime paid for tipped employees?', a: `On the full minimum wage. Under federal law the overtime rate is ${rate$(F.minWage * F.otMultiplier)}, and the employer may subtract the same ${rate$(F.tipCredit)} tip credit as for regular hours, so it must pay at least ${rate$(otCash)} in cash for each overtime hour. Multiplying the ${rate$(F.tippedCash)} cash wage by ${F.otMultiplier} is a mistake that underpays every overtime hour.` },
    { q: 'Is a service charge the same as a tip?', a: 'No. A compulsory charge added to the bill, such as an automatic gratuity for a large party, belongs to the employer under federal law. The employer can pass it on to staff as wages, but it is not a tip and cannot be counted toward the tip credit. A tip is a voluntary amount the customer decides. Ask how the charge is shared, and check that the pay stub shows it.' },
  ],
  related: ['minimum-wage-by-state', 'city-minimum-wage', 'time-and-a-half', 'minimum-wage-increases', 'state:california', 'state:texas'],
  sources: ['fs15', 'cfr53150', 'dolTipped', 'dolMinWage'],
});
