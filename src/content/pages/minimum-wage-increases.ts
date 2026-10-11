import { definePage } from '../../lib/page-types';
import { STATES, F, TODAY, atFederal, mwNow, mw2026, mwMidYear, mw2027, fullTimeAt, locals, rate$, usd, num, day, names } from '../../lib/kit';
import type { StateData } from '../../lib/state-types';
import { stateArg } from '../../lib/mini-args';

/** Every dated change of 2026 after January 1, with the rate it replaced. */
const midRows = STATES.flatMap((s) => mwMidYear(s.slug).map((r) => {
  const prev = mw2026(s.slug).filter((x) => x.area === r.area && x.from < r.from).pop();
  return { s, r, prev: prev?.rate ?? null };
})).sort((a, b) => a.r.from.localeCompare(b.r.from) || a.s.name.localeCompare(b.s.name));
const mid = [...new Map(midRows.map((x) => [x.s.slug, x.s])).values()];
/** One entry per state and date: several regional rows (Oregon) are shown as a range. */
const midStates = [...new Map(midRows.map((x) => [`${x.s.slug}|${x.r.from}`, midRows.filter((y) => y.s === x.s && y.r.from === x.r.from)])).values()].map((g) => {
  const hi = Math.max(...g.map((x) => x.r.rate)), lo = Math.min(...g.map((x) => x.r.rate));
  const step = g.find((x) => x.prev != null);
  return { s: g[0].s, from: g[0].r.from, n: g.length, hi, lo, step: step ? step.r.rate - step.prev! : null, label: g.length > 1 ? `${g.length} regional rates from ${rate$(lo)} to ${rate$(hi)}` : rate$(hi) };
});
const july = midStates.filter((x) => x.from.slice(5) === '07-01');
/** Announced 2027 rates for the headline area. */
const ahead = STATES.map((s) => ({ s, r: mw2027(s.slug), now: mwNow(s.slug) })).filter((x) => x.r) as Array<{ s: StateData; r: NonNullable<ReturnType<typeof mw2027>>; now: number }>;
const up = ahead.filter((x) => x.r.rate > x.now).sort((a, b) => a.r.from.localeCompare(b.r.from) || (b.r.rate - b.now) - (a.r.rate - a.now));
const frozen = ahead.filter((x) => x.r.rate === x.now);
const big = [...up].sort((a, b) => (b.r.rate - b.now) - (a.r.rate - a.now))[0];
const small = [...up].sort((a, b) => (a.r.rate - a.now) - (b.r.rate - b.now))[0];
const notJan = up.filter((x) => !x.r.from.endsWith('-01-01'));
const pctUp = (x: { r: { rate: number }; now: number }) => `${num(((x.r.rate - x.now) / x.now) * 100, 1)}%`;
const top27 = [...up].sort((a, b) => b.r.rate - a.r.rate)[0];
const localMid = STATES.flatMap((s) => locals(s.slug).filter((l) => l.from > '2026-01-01' && l.from <= TODAY).map((l) => ({ s, l }))).sort((a, b) => b.l.rate - a.l.rate);
const still = atFederal();
const quiet = STATES.filter((s) => !still.includes(s) && !mwMidYear(s.slug).length && !(mw2027(s.slug) && mw2027(s.slug)!.rate > mwNow(s.slug)));
const fl = midRows.find((x) => x.s.slug === 'florida');
const tipped27 = STATES.flatMap((s) => s.minWage.rates2027.filter((r) => /tipped/i.test(r.area)).map((r) => ({ s, r })));

export default definePage({
  id: 'minimum-wage-increases',
  group: 'wage',
  kind: 'guide',
  order: 20,
  slug: 'minimum-wage-increases',
  nav: 'Minimum wage increases',
  card: `The raises of 2026 that did not wait for January, and every rate already set for 2027.`,
  title: `Minimum Wage Increases 2026: Mid-Year Raises and 2027 Rates`,
  description: `Minimum wage increases in 2026 and 2027: ${mid.length} state raises after January 1, ${up.length} higher rates already set for 2027, up to ${rate$(top27 ? top27.r.rate : F.minWage)} an hour. Dates and yearly gains.`,
  h1: 'Minimum wage increases: the 2026 changes after January and the 2027 rates',
  intro: 'January 1 is not the only date that matters. This guide follows each raise of 2026 that came later in the year and each 2027 rate a state has already fixed.',
  resume: `${midStates.length ? `After January 1, 2026, ${mid.length} jurisdictions changed their general minimum wage during the year: ${midStates.map((x) => `${x.s.name} on ${day(x.from)} (${x.label})`).join(', ')}.` : 'No general state rate changed after January 1, 2026.'} Looking ahead, ${up.length} jurisdictions have already set a higher general rate for 2027${big ? `, the largest step being in ${big.s.name}, from ${rate$(big.now)} to ${rate$(big.r.rate)}, a rise of ${pctUp(big)}` : ''}${top27 ? `, and the highest announced figure is ${rate$(top27.r.rate)} in ${top27.s.name}` : ''}. ${frozen.length ? `${names(frozen.map((x) => x.s))} published a 2027 rate equal to today's, so pay there stays flat.` : ''} Most 2027 changes start on January 1${notJan.length ? `, but ${names(notJan.map((x) => x.s))} ${notJan.length > 1 ? 'move' : 'moves'} later in the year` : ''}. The federal minimum stays at ${rate$(F.minWage)}, which keeps ${still.length} states on file without any raise. Cities and counties add their own dates: ${localMid.length} local rates on file rose on July 1, 2026 or later. The calculator below turns a state's change into dollars for your weekly hours.`,
  mini: 'raiseTimeline',
  miniArg: stateArg(big?.s.name),
  body: (h) => `
<h2>The raises that came after January 1, 2026</h2>
<p>Most states set their new rate on the first day of the year, which is why January 1 gets the attention. A handful work on a different calendar, either because the statute or the ballot measure that created the wage chose another date, or because the jurisdiction indexes its rate on a fiscal cycle. For a worker in those places the pay stub changes in the middle of the year, and a pay period that straddles the date must be split: hours worked before the effective date at the old rate, hours worked on or after it at the new one.</p>
${midRows.length ? h.table(['Jurisdiction', 'Area', 'Effective', 'New rate', 'Previous rate', 'Rise'], midRows.map((x) => [h.a(`state:${x.s.slug}`, x.s.name), x.r.area, day(x.r.from), rate$(x.r.rate), x.prev != null ? rate$(x.prev) : 'n/a', x.prev != null ? rate$(x.r.rate - x.prev) : 'n/a']), 'General minimum wage changes during 2026 after January 1', ['l', 'l', 'l', 'r', 'r', 'r']) : ''}
<p>${july.length ? `July 1 is the second date of the year. ${names(july.map((x) => x.s))} moved on that day. For a full-time worker who was paid exactly the old rate, the step is worth ${july.filter((x) => x.step != null).map((x) => `${usd(fullTimeAt(x.step!).annual)} a year in ${x.s.name}`).join(', ')}.${july.some((x) => x.n > 1) ? ` ${names(july.filter((x) => x.n > 1).map((x) => x.s))} ${july.filter((x) => x.n > 1).length > 1 ? 'set' : 'sets'} a different rate by region, so the county where you work decides which line applies.` : ''}` : ''} ${fl ? `Florida follows its own schedule, written into the state constitution by voters: the rate steps up each September 30, and on ${day(fl.r.from)} it reached ${rate$(fl.r.rate)}${fl.prev != null ? `, up from ${rate$(fl.prev)}` : ''}. The tipped cash wage in Florida moves on the same day, since it is the minimum wage less a fixed tip credit.` : ''} These changes are easy to miss because payroll systems are often updated only in January. If your hourly rate sat exactly at the old minimum, check the first full pay period after the effective date.</p>
<h2>Rates already set for 2027</h2>
<p>${up.length} jurisdictions on file have published a higher general rate for next year. Some of these figures come from an inflation formula that the agency applies each autumn; others were fixed years ago in a statute that climbs step by step. The table shows the rate in force now, the announced one, the date and the size of the step in dollars and in percent.</p>
${h.table(['State', 'Now', '2027 rate', 'Effective', 'Step', 'Change'], up.map((x) => [h.a(`state:${x.s.slug}`, x.s.name), rate$(x.now), rate$(x.r.rate), day(x.r.from), rate$(x.r.rate - x.now), pctUp(x)]), 'Announced 2027 general minimum wages, headline rate of each state', ['l', 'r', 'r', 'l', 'r', 'r'])}
<p>${big ? `The biggest move is in ${big.s.name}: ${rate$(big.r.rate - big.now)} more an hour, which is ${usd(fullTimeAt(big.r.rate - big.now).annual)} over a full-time year.` : ''} ${small && small !== big ? `The smallest is in ${small.s.name}, at ${rate$(small.r.rate - small.now)} an hour, the kind of step an inflation index produces in a calm year.` : ''} ${notJan.length ? `Not every 2027 rate starts on New Year's Day: ${notJan.map((x) => `${x.s.name} moves on ${day(x.r.from)}`).join(', ')}, so the 2026 rate stays in force for the first months of 2027 there.` : ''} ${frozen.length ? `${names(frozen.map((x) => x.s))} stand${frozen.length > 1 ? '' : 's'} apart: the published 2027 figure equals the current one.${frozen.some((x) => x.s.slug === 'new-york') ? ' In New York the Department of Labor found that an off-ramp written into the indexing law had been triggered, so the general rates were not raised for 2027.' : ''}` : ''}</p>
${tipped27.length ? `<p>Tipped workers get their own schedule in some states. ${tipped27.map((x) => `${x.s.name} has already set a tipped cash wage of ${rate$(x.r.rate)} from ${day(x.r.from)}`).join('; ')}. Where the tipped cash wage is a fixed share of the full minimum, it rises automatically with it; where it is a fixed dollar amount, only a change in the law moves it. ${h.a('tipped-minimum-wage', 'The tipped minimum wage guide')} compares the states.</p>` : ''}
<h2>Cities and counties that do not wait for the state</h2>
<p>Local ordinances often adjust on July 1, half a year away from the state date, which means a worker in one of these places can see two raises in twelve months, or one raise that the state level never gives. ${localMid.length ? `The local rates on file that changed on July 1, 2026 or later are ${localMid.map((x) => `${x.l.name}, ${x.s.abbr}, at ${rate$(x.l.rate)}`).join('; ')}.` : ''} The rate applies to hours worked inside the city or county limits, so a delivery driver or a home care aide who crosses a boundary during the day can be owed two different rates in the same week. ${h.a('city-minimum-wage', 'The city minimum wage guide')} lists every local rate on file with its own state rate.</p>
<h2>States where nothing changes</h2>
<p>The federal rate has not moved since ${day(F.minWageSince)}. In ${names(still)}, it is still the figure that applies, and no change is scheduled. A worker earning ${rate$(F.minWage)} for 40 hours has had the same ${usd(fullTimeAt(F.minWage).annual)} a year in gross pay for well over a decade. ${quiet.length ? `Above the federal floor, ${names(quiet)} have neither a mid-year change in 2026 nor a higher 2027 figure on file yet.` : ''} For some of them the reason is simple: the rate is indexed and the agency announces the next figure late in the year, often in October or November. For others the rate is fixed in statute until the legislature or voters act again. The table on ${h.a('minimum-wage-by-state', 'the minimum wage by state page')} will show the new figure as soon as an agency publishes it.</p>
<h2>What a raise changes on your pay stub</h2>
<p>A higher minimum does more than lift the base rate. Overtime is paid at one and a half times the regular rate, so a worker at the minimum also gets a larger overtime rate the day the raise applies: at ${rate$(F.minWage)} the overtime rate is ${rate$(F.minWage * F.otMultiplier)}${big ? `, while at the ${big.s.name} 2027 rate it becomes ${rate$(big.r.rate * F.otMultiplier)}` : ''}. In states that tie the salary level of exempt employees to the minimum wage, a raise also lifts the salary a manager must earn to stay exempt; ${h.a('salary-exempt-threshold', 'the salary threshold guide')} shows which states do so. Workers paid slightly above the minimum are not owed a raise by law, but employers often adjust their pay scales to keep a gap with new hires.</p>
<p>Check three things after an increase takes effect. First, that the new hourly rate appears from the right date and not from the next full pay period only. Second, that overtime hours use the new rate. Third, for tipped workers, that cash wage plus tips still reaches the new minimum in every workweek; if it falls short, the employer must make up the difference. A missing raise is a wage claim, and the state labor agency decides it on the pay records; ${h.a('minimum-wage-by-state', 'each state page')} names that agency.</p>
<h2>Why the 2027 list keeps growing</h2>
<p>Several states compute next year's rate from a price index measured over the summer and publish the figure between August and November. Others wait for a formal notice in the state register. This page reads the same data files as the calculator, so a newly published rate appears in the table above as soon as its file is updated, along with the agency page it came from. The rate in force on the day you work is the one that counts; an announced figure only becomes owed on its effective date.</p>`,
  faqs: [
    { q: 'Which states raise their minimum wage on July 1?', a: `${july.length ? `In 2026, ${names(july.map((x) => x.s))} raised the general rate on July 1.` : 'No general state rate on file changed on July 1, 2026.'} Many cities and counties also adjust on July 1, including ${localMid.length} local rates on file. ${notJan.length ? `For 2027, ${names(notJan.map((x) => x.s))} ${notJan.length > 1 ? 'have' : 'has'} a raise dated after January 1.` : ''} Hours worked from the effective date earn the new rate.` },
    { q: 'Will the minimum wage go up in 2027?', a: `In ${up.length} jurisdictions on file, yes: a higher general rate is already set${top27 ? `, up to ${rate$(top27.r.rate)} an hour in ${top27.s.name}` : ''}. ${frozen.length ? `${names(frozen.map((x) => x.s))} published an unchanged rate. ` : ''}The federal ${rate$(F.minWage)} has no scheduled increase. Indexed states announce their figure in the autumn, so more 2027 rates are still to come.` },
    { q: 'Do I get the new minimum wage for the whole pay period?', a: 'No. The new rate applies to hours worked on or after the effective date. If a pay period runs from the 25th of one month to the 8th of the next and the raise starts on the 1st, the hours before the 1st are paid at the old rate and the later hours at the new one. Overtime in that week follows the same split.' },
    { q: 'Does a minimum wage increase raise overtime pay too?', a: `Yes. Overtime is at least ${F.otMultiplier} times the regular rate, so when the base rate rises, the overtime rate rises with it from the same date. A worker at ${rate$(F.minWage)} earns ${rate$(F.minWage * F.otMultiplier)} for each overtime hour${big ? `; at the ${big.s.name} 2027 rate of ${rate$(big.r.rate)}, each overtime hour pays ${rate$(big.r.rate * F.otMultiplier)}` : ''}.` },
    { q: 'Why is my state not raising its minimum wage?', a: `There are three usual reasons. The state may still use the federal ${rate$(F.minWage)}, which only Congress can change. Its rate may be fixed in a statute until lawmakers vote again. Or the rate is indexed to inflation and the agency has not yet published next year's figure, which often happens in October or November. Each state page shows the latest notice.` },
  ],
  related: ['minimum-wage-by-state', 'city-minimum-wage', 'tipped-minimum-wage', 'salary-exempt-threshold', 'state:florida', 'state:new-york'],
  sources: ['dolStateMw', 'dolMinWage', 'dolTipped'],
});
