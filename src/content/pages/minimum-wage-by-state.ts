import { definePage } from '../../lib/page-types';
import { STATES, F, TODAY, atFederal, highest, mwNow, mwState, mwMidYear, mw2027, fullTimeAt, locals, rate$, usd, num, day, names } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const fed = atFederal();
const top = highest(3);
const peak = top[0];
const peakRate = mwNow(peak.slug);
const nm = (x: { slug: string; name: string }, cap = false) => (x.slug === 'district-of-columbia' ? `${cap ? 'The' : 'the'} District of Columbia` : x.name);
const above = STATES.filter((s) => mwNow(s.slug) > F.minWage);
const fifteen = STATES.filter((s) => mwNow(s.slug) >= 15);
const below = STATES.filter((s) => mwState(s.slug) < F.minWage);
const mid = STATES.filter((s) => mwMidYear(s.slug).length);
const next = STATES.filter((s) => { const r = mw2027(s.slug); return r && r.rate > mwNow(s.slug); });
const multi = STATES.filter((s) => new Set(s.minWage.rates2026.filter((r) => r.from <= TODAY).map((r) => r.area)).size > 1);
const withLocal = STATES.filter((s) => locals(s.slug).some((l) => l.from <= TODAY));
const yearFed = fullTimeAt(F.minWage).annual;
const yearTop = fullTimeAt(peakRate).annual;
const ny = STATES.find((s) => s.slug === 'new-york');
const nyAreas = ny ? [...ny.minWage.rates2026].filter((r) => r.from <= TODAY).sort((a, b) => b.rate - a.rate) : [];

export default definePage({
  id: 'minimum-wage-by-state',
  group: 'wage',
  kind: 'pillar',
  order: 10,
  slug: 'minimum-wage-by-state',
  nav: 'Minimum wage by state',
  card: `Every state rate in force today, the states stuck at the federal floor and what a full-time year pays.`,
  title: `Minimum Wage by State 2026: ${rate$(F.minWage)} to ${rate$(peakRate)} an Hour`,
  description: `Minimum wage by state in 2026: ${rate$(F.minWage)} federal floor, ${rate$(peakRate)} in ${nm(peak)}, ${above.length} jurisdictions above it. Rates, 2027 raises and the yearly pay.`,
  h1: 'Minimum wage by state: the rate that applies where you work',
  intro: 'The state rate, the federal floor and the city rate can all differ; you are owed the highest one. The calculator applies the rate of your state to your own hours.',
  resume: `${nm(peak, true)} has the highest general minimum wage on this site's check date of ${day(TODAY)}, ${rate$(peakRate)} an hour, followed by ${top[1].name} at ${rate$(mwNow(top[1].slug))} and ${top[2].name} at ${rate$(mwNow(top[2].slug))}. The federal minimum wage is still ${rate$(F.minWage)}, unchanged since ${day(F.minWageSince)}, and it remains the working figure in ${fed.length} states: ${names(fed)}. Everywhere else the state sets a higher number, and ${fifteen.length} jurisdictions on file now pay ${rate$(15)} or more. When the federal, state and local rates differ, an employee covered by more than one law is owed the highest. A full-time year of 2,080 hours pays ${usd(yearFed)} at the federal rate and ${usd(yearTop)} at the ${peak.name} rate, before taxes. Rates do not all move on January 1: ${mid.length} jurisdictions changed theirs later in 2026, and ${next.length} have already set a higher figure for 2027. Cities and counties in ${withLocal.length} states add their own rate on top.`,
  tool: 'minwage',
  toolProps: { state: 'california' },
  body: (h) => `
<h2>The general rate in every state on file</h2>
<p>The table gives the general hourly minimum for adult, non-tipped workers on ${day(TODAY)}, the cash wage a tipped employee can be paid before tips, and the next rate where a state has published one. A state below the federal figure is shown at ${rate$(F.minWage)}, because that is what a worker covered by the Fair Labor Standards Act receives. Each state name leads to a page with the dates, regional rates and exceptions, and every figure carries the agency page it was read on.</p>
${h.table(['State', 'Rate now', 'Tipped cash wage', 'Next rate'], STATES.map((s) => { const r = mw2027(s.slug); return [s.name, rate$(mwNow(s.slug)), s.minWage.tipped.tipCreditAllowed ? rate$(s.minWage.tipped.cashWage ?? F.tippedCash) : 'no tip credit', r && r.rate !== mwNow(s.slug) ? `${rate$(r.rate)} from ${day(r.from)}` : 'none set']; }), `General minimum wage by state on ${day(TODAY)}`, ['l', 'r', 'r', 'l'])}
<h2>Where the federal ${rate$(F.minWage)} is still the rule</h2>
<p>Congress last raised the federal minimum on ${day(F.minWageSince)}. In ${names(fed)}, nothing higher has replaced it, either because the state has no minimum wage law of its own or because its law simply follows the federal figure. ${below.length ? `${names(below)} ${below.length > 1 ? 'have' : 'has'} a state rate written below the federal one; covered employers there must still pay ${rate$(F.minWage)}, and the lower state figure only reaches the few jobs outside federal coverage.` : 'Where a state figure is written below the federal one, covered employers must still pay the federal rate.'} Federal coverage is wide: it reaches employees of businesses engaged in interstate commerce and of hospitals, schools and public agencies, which in practice covers most private jobs.</p>
<p>The federal law also allows a youth wage of ${rate$(F.youthWage)} an hour for workers under ${F.youthAgeUnder} during their first ${F.youthDays} consecutive calendar days with an employer. A state law can be stricter and refuse any youth rate; where it is, the state rule wins, so the state page is the place to check before accepting a lower starting wage.</p>
<h2>One state, more than one rate</h2>
<p>A single statewide figure is the usual pattern, not the only one. ${multi.length ? `${names(multi)} ${multi.length > 1 ? 'publish' : 'publishes'} several rates in force at once, split by region, by employer size or by industry.` : ''} ${nyAreas.length > 1 ? `New York is the clearest case: ${rate$(nyAreas[0].rate)} in ${nyAreas[0].area} and ${rate$(nyAreas[nyAreas.length - 1].rate)} elsewhere in the state, so the same job pays ${usd(fullTimeAt(nyAreas[0].rate - nyAreas[nyAreas.length - 1].rate).annual)} more a year in Yonkers than in Syracuse.` : ''} Some states keep a lower rate for small businesses or seasonal employers, which federal coverage often overrides. Then there are local ordinances: cities and counties in ${names(withLocal)} set their own minimum, owed for work done inside their limits. ${h.a('city-minimum-wage', 'The city minimum wage guide')} lists them.</p>
<h2>What the rate pays over a week and a year</h2>
<p>An hourly minimum turns into very different incomes. At ${rate$(F.minWage)}, a 40-hour week pays ${usd(fullTimeAt(F.minWage).weekly, 2)} and a year ${usd(yearFed)}. At ${rate$(peakRate)} in ${nm(peak)}, the same schedule pays ${usd(fullTimeAt(peakRate).weekly, 2)} a week and ${usd(yearTop)} a year, a gap of ${usd(yearTop - yearFed)}. Part-time work scales down in proportion: 25 hours a week at the federal rate is ${usd(fullTimeAt(F.minWage, 25).annual)} a year. The comparison below puts two states side by side for a full-time job and shows which of them adds paid sick leave or a paid family leave program.</p>
${h.mini('stateCompare', stateArg())}
<p>Salaried and commission-paid employees are covered too, unless an exemption applies: pay for the week divided by the hours worked must reach the minimum. A salaried assistant paid ${usd(600)} for a 60-hour week in a ${rate$(15)} state earns ${rate$(600 / 60)} an hour, which is short. ${h.a('exempt-vs-non-exempt', 'Exempt and non-exempt jobs')} explains when the salary test removes that protection.</p>
<h2>Raises during the year and in 2027</h2>
<p>January 1 is the common date, but ${mid.length ? `${names(mid)} changed ${mid.length > 1 ? 'their rates' : 'its rate'} later in 2026` : 'some states change their rate later in the year'}, and ${next.length} jurisdictions have already announced a higher figure for 2027. Indexed states publish the next rate in the autumn, so the column above fills in as the agencies post their notices. ${h.a('minimum-wage-increases', 'The 2026 and 2027 increases guide')} lists each change with its date.</p>
<h2>Who decides a minimum wage claim</h2>
<p>An unpaid difference is a wage claim. The state labor agency named on each state page takes claims under the state rate, usually at no cost, and the Wage and Hour Division of the U.S. Department of Labor takes claims under the federal rate. Keep pay stubs and a record of your hours. The agency decides the claim on its facts, and an employment lawyer can look at a situation where the employer disputes your hours or your status.</p>`,
  faqs: [
    { q: 'Has the federal minimum wage gone up in 2026?', a: `No. The federal minimum wage is still ${rate$(F.minWage)} an hour, the figure in force since ${day(F.minWageSince)}. Only Congress can change it, and no increase has passed. Raises in 2026 came from states and cities: ${above.length} jurisdictions on file pay more than the federal rate, and a worker covered by both laws receives the higher one.` },
    { q: 'What happens if my state minimum wage is lower than the federal one?', a: `If your employer is covered by the Fair Labor Standards Act, you are owed the federal ${rate$(F.minWage)}, whatever the state figure says. Coverage reaches most businesses that deal across state lines, plus hospitals, schools and public agencies. The lower state rate only matters for the small number of jobs outside federal coverage. A complaint goes to the Wage and Hour Division.` },
    { q: 'How much does a minimum wage job pay a year in 2026?', a: `At the federal ${rate$(F.minWage)}, a 40-hour week for 52 weeks pays ${usd(yearFed)} before taxes. In ${nm(peak)}, at ${rate$(peakRate)}, the same schedule pays ${usd(yearTop)}. The calculator on this page applies your state rate to your own weekly hours and shows the weekly, monthly and yearly figures, along with any raise already set for 2027.` },
    { q: 'Can teenagers be paid less than the minimum wage?', a: `Under federal law, workers under ${F.youthAgeUnder} can be paid ${rate$(F.youthWage)} an hour during their first ${F.youthDays} consecutive calendar days with an employer. After that, or once they turn ${F.youthAgeUnder}, the full minimum applies. A state law can refuse that lower rate or limit it further, and the stricter rule wins. Your state page says which applies.` },
    { q: 'Do salaried employees have to make minimum wage?', a: `Yes, unless an exemption applies. For a non-exempt salaried employee, the weekly salary divided by the hours worked must reach the minimum wage, and overtime is owed past ${F.otWeeklyHours} hours. Exempt executive, administrative and professional employees must instead receive at least ${usd(F.exemptWeekly)} a week under federal law, and more in some states.` },
    { q: 'Is the minimum wage the same across a whole state?', a: `Not always. ${multi.length ? `${names(multi)} ${multi.length > 1 ? 'publish' : 'publishes'} more than one rate at once, by region, employer size or industry.` : 'Some states publish more than one rate at once.'} Cities and counties in ${withLocal.length} states also set a higher local rate for work done inside their limits. Your employer must pay the highest rate that applies where you actually work.` },
    { q: 'Who do I contact if I am paid below the minimum wage?', a: `File a wage claim with your state labor agency, which enforces the state rate, or with the U.S. Department of Labor's Wage and Hour Division for the federal ${rate$(F.minWage)}. Both take claims without a fee. Bring pay stubs and a log of your hours. Retaliating against a worker who complains about pay is unlawful under federal law and most state laws.` },
  ],
  related: ['minimum-wage-increases', 'city-minimum-wage', 'tipped-minimum-wage', 'overtime-laws-by-state', 'states', 'state:california'],
  sources: ['dolStateMw', 'dolMinWage', 'fs32', 'dolTipped'],
});
