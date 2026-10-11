import { definePage } from '../../lib/page-types';
import { STATES, F, TODAY, mwNow, fullTimeAt, rate$, usd, day, names, listOf } from '../../lib/kit';
import { cityArg } from '../../lib/mini-args';

const all = STATES.flatMap((s) => s.localMinWages.filter((l) => l.from <= TODAY).map((l) => ({ s, l, gap: l.rate - mwNow(s.slug) }))).sort((a, b) => b.l.rate - a.l.rate);
const withLocal = [...new Map(all.map((x) => [x.s.slug, x.s])).values()].sort((a, b) => a.name.localeCompare(b.name));
const top = all[0];
const widest = [...all].sort((a, b) => b.gap - a.gap)[0];
const above20 = all.filter((x) => x.l.rate >= 20);
const counties = all.filter((x) => /county/i.test(x.l.name));
const julyLocal = all.filter((x) => x.l.from.slice(5) === '07-01' && x.l.from.startsWith('2026'));
const byState = withLocal.map((s) => ({ s, n: all.filter((x) => x.s === s).length })).sort((a, b) => b.n - a.n);
const busiest = byState[0];
const announced = STATES.flatMap((s) => s.localMinWages.filter((l) => l.from > TODAY).map((l) => ({ s, l })));
const fed = STATES.filter((s) => mwNow(s.slug) <= F.minWage);
const short = (n: string) => n.replace(/\s*\(.*\)$/, '');
/** First suffix that brings a description into 150 to 160 characters. */
const fit = (base: string, tails: string[]) => tails.map((t) => base + t).find((d) => d.length >= 150 && d.length <= 160) ?? base + tails[0];
const topGapYear = widest ? fullTimeAt(widest.gap).annual : 0;

export default definePage({
  id: 'city-minimum-wage',
  group: 'wage',
  kind: 'guide',
  order: 40,
  slug: 'city-minimum-wage',
  nav: 'City minimum wage',
  card: `Cities and counties that pay more than their state, and how much the local rate adds over a year.`,
  title: `City Minimum Wage 2026: Local Rates Up to ${rate$(top ? top.l.rate : F.minWage)} an Hour`,
  description: fit(`City minimum wage in 2026: ${all.length} local rates on file in ${withLocal.length} states, up to ${rate$(top ? top.l.rate : F.minWage)} an hour in ${top ? `${short(top.l.name)}, ${top.s.abbr}` : 'a city'}.`, [' Compare each city with its state rate and the yearly gain.', ' Compare each city with its state rate and yearly gain.', ' Compare each city with its state rate.', ' Compare cities with their state.']),
  h1: 'City and county minimum wages: where the local rate beats the state',
  intro: 'A city or county can set a minimum wage above its state, and the higher local figure is owed for every hour worked inside its limits.',
  resume: `${top ? `${short(top.l.name)}, ${top.s.name}, has the highest local minimum wage on file, ${rate$(top.l.rate)} an hour, against a state rate of ${rate$(mwNow(top.s.slug))}.` : ''} In all, this site lists ${all.length} city and county rates in force on ${day(TODAY)}, spread across ${names(withLocal)}${above20.length ? `, and ${above20.length} of them have passed ${rate$(20)} an hour` : ''}. A local rate binds employers for the hours their staff work inside the city or county limits, whatever the address of the company, and when it is higher than the state and federal figures, it is the one owed. ${widest ? `The widest gap is in ${short(widest.l.name)}, where the local rate adds ${rate$(widest.gap)} an hour, or ${usd(topGapYear)} over a full-time year.` : ''} Many local rates move on July 1 rather than January 1, and most are indexed to inflation. Cities can only do this where state law lets them: none of the ${fed.length} states still at the federal ${rate$(F.minWage)} has a local rate on file. Pick a city below to compare it with its state.`,
  mini: 'cityCompare',
  miniArg: cityArg(),
  body: (h) => `
<h2>Every local rate on file</h2>
<p>The table gives each city or county rate in force on ${day(TODAY)}, the date it took effect, the general rate of its state and the difference per hour. Where an ordinance has tiers by employer size or a separate hotel or tipped wage, the general rate for most employers is shown and the state page gives the other tiers.</p>
${h.table(['City or county', 'State', 'Local rate', 'In force since', 'State rate', 'Extra per hour'], all.map((x) => [x.l.name, h.a(`state:${x.s.slug}`, x.s.abbr), rate$(x.l.rate), day(x.l.from), rate$(mwNow(x.s.slug)), rate$(x.gap)]), `Local minimum wages in force on ${day(TODAY)}`, ['l', 'l', 'r', 'l', 'r', 'r'])}
<h2>Why some cities pay more than their state</h2>
<p>A local minimum wage is a response to local prices. A state rate is set for an average place, and in a metro area where rent takes most of a paycheck, a state figure that works in a rural county leaves full-time workers short. Cities with high housing costs were the first to act, and the pattern still shows in the data: ${busiest ? `${busiest.s.name} alone has ${busiest.n} local rates on file` : 'a few states hold most local rates'}, concentrated in its most expensive metro areas. ${counties.length ? `Counties take part too: ${listOf(counties.map((x) => `${short(x.l.name)} in ${x.s.name}`))} set rates that apply in their territory.` : ''} Some county ordinances cover only unincorporated areas, the land outside any city, so a worker in a town inside the county may fall back on the state rate or on the town's own figure.</p>
<p>The power to do this comes from the state. A city has no minimum wage authority of its own unless state law grants it or at least does not take it away, and many states have passed laws that forbid local wage ordinances. That is why local rates cluster in a few states and are absent from the ${fed.length} states still at ${rate$(F.minWage)}.</p>
<h2>Which rate applies to your hours</h2>
<p>What counts is where the work is done, not where the employer is based or where you live. A cashier at a store inside city limits earns the city rate. A delivery driver, a home care aide or a cleaner who works in several places in one week can be owed the city rate for the hours inside the city and the state rate for the hours outside it. Some ordinances add a minimum, for example covering only employees who work at least two hours in a week within the city, so a short visit may not trigger the local rate. When two local rates overlap, as with a city inside a county that has its own ordinance, the higher one generally applies.</p>
${widest ? `<p>The sums are real. In ${short(widest.l.name)}, the local rate adds ${rate$(widest.gap)} an hour to the ${widest.s.name} figure. A full-time worker earns ${usd(fullTimeAt(widest.l.rate).annual)} a year at the local rate against ${usd(fullTimeAt(mwNow(widest.s.slug)).annual)} at the state rate. Someone working 25 hours a week gains ${usd(fullTimeAt(widest.gap, 25).annual)} a year from the ordinance.</p>` : ''}
<h2>Dates, indexing and the July 1 cycle</h2>
<p>Local rates rarely move in step with their state. Many ordinances adjust on July 1, the start of a city's fiscal year${julyLocal.length ? `, and ${julyLocal.length} rates on file changed on July 1, 2026: ${listOf(julyLocal.map((x) => short(x.l.name)))}` : ''}. Others follow January 1 like most states. Most are indexed to a regional consumer price index, sometimes with a cap on the yearly increase, so the city announces the next figure a few months before it takes effect. ${announced.length ? `A few later figures are already on file: ${announced.map((x) => `${short(x.l.name)} at ${rate$(x.l.rate)} from ${day(x.l.from)}`).join(', ')}.` : 'Announced later figures are added to the state pages as cities publish them.'} Workers on the edge of a city should check both calendars: a July raise from the city and a January raise from the state can land in the same year.</p>
<p>Local ordinances also carry their own rules beyond the hourly figure. Several set separate rates for hotel workers or for large employers, some allow a smaller tip credit than the state or none at all, and many come with a local paid sick leave law and an office that enforces it. The state page lists those details for each city on file. ${h.a('tipped-minimum-wage', 'The tipped minimum wage guide')} covers how a local rate changes the tip credit.</p>
<h2>Checking a paycheck against the local rate</h2>
<p>Start with the address where you actually work each day, then find out whether that spot sits inside the city limits or in an unincorporated part of the county; a mailing address with the city's name does not always mean the city ordinance applies. Compare the hourly rate on your pay stub with the local figure in force on each day of the pay period, remembering that a rate that changed on July 1 splits the period in two. If you are paid a salary or by the piece, divide the week's pay by the hours you worked inside the city and compare the result with the local rate. For overtime, the regular rate cannot be lower than the local minimum, so the overtime rate rises with it. Keep a note of the hours spent outside the city if your job moves around, because only those hours can be paid at the lower state figure. Employers inside these cities must usually display a poster with the local rate; if it is missing or out of date, that is worth raising too.</p>
<h2>Who enforces a city minimum wage</h2>
<p>Larger cities run their own labor standards office, which takes complaints, audits employers and can order back pay. Smaller ones rely on the state agency or on a private lawsuit. If you work inside a city with its own rate and are paid only the state figure, start with the city office named in the ordinance or on the state page; the state labor agency can usually tell you where to file. The office decides the claim, and an employment lawyer can look at cases involving hours split between several cities.</p>
<p>For the state rates that apply everywhere else, see ${h.a('minimum-wage-by-state', 'the minimum wage by state page')}, and for the raises scheduled for next year, ${h.a('minimum-wage-increases', 'the increases guide')}.</p>`,
  faqs: [
    { q: 'Which city has the highest minimum wage in 2026?', a: `${top ? `${short(top.l.name)}, ${top.s.name}, at ${rate$(top.l.rate)} an hour on ${day(TODAY)}, among the ${all.length} local rates on file.` : 'The local rates on file are listed in the table on this page.'} ${all[1] ? `It is followed by ${short(all[1].l.name)} at ${rate$(all[1].l.rate)}${all[2] ? ` and ${short(all[2].l.name)} at ${rate$(all[2].l.rate)}` : ''}.` : ''} City rates often change on July 1 or January 1, so check the effective date before comparing two places.` },
    { q: 'Does the city minimum wage apply if my employer is based outside the city?', a: 'Yes, for the hours you work inside the city. Local ordinances follow the place of work, not the address of the company. A worker who spends part of the week inside the city and part outside is owed the city rate for the city hours and the state rate for the rest. Some ordinances only cover employees who work a minimum number of hours a week in the city.' },
    { q: 'Can a city set a lower minimum wage than the state?', a: `No. A city or county rate only matters when it is higher. If a local figure were lower, the state rate would still be owed, and the federal ${rate$(F.minWage)} sets the floor under both. Local ordinances exist to add to the state rate, typically in metro areas where living costs are higher than the state average.` },
    { q: 'Why does my state not have any city minimum wages?', a: `Usually because state law forbids them. A city can only set a minimum wage if the state lets it, and many states have passed laws that reserve wage rules to the state. None of the ${fed.length} states still at ${rate$(F.minWage)} has a local rate on file. Local rates on file exist in ${withLocal.length} states, listed in the table on this page.` },
    { q: 'When do city minimum wages go up?', a: `Many on July 1, others on January 1. ${julyLocal.length ? `In 2026, ${julyLocal.length} local rates on file changed on July 1.` : ''} Most local rates are indexed to a regional price index, and the city announces the next figure a few months ahead, sometimes with a cap on the yearly increase. Hours worked from the effective date earn the new rate.` },
  ],
  related: ['minimum-wage-by-state', 'minimum-wage-increases', 'tipped-minimum-wage', 'state:california', 'state:washington', 'state:colorado'],
  sources: ['dolStateMw', 'dolMinWage'],
});
