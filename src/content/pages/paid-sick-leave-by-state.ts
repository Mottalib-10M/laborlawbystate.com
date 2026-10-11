import { definePage } from '../../lib/page-types';
import { FM, STATES, sickStates, sickYear, names, num, day, TODAY } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const sick = sickStates();
const sl = (s: (typeof sick)[number]) => s.sickLeave;
const count = new Map<number, number>();
for (const s of sick) if (sl(s).accrualPerHours) count.set(sl(s).accrualPerHours!, (count.get(sl(s).accrualPerHours!) ?? 0) + 1);
const usual = [...count.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0;
const usualStates = sick.filter((s) => sl(s).accrualPerHours === usual);
const slower = sick.filter((s) => sl(s).accrualPerHours && sl(s).accrualPerHours !== usual);
const caps = sick.filter((s) => sl(s).capHours != null);
const bigCap = [...caps].sort((a, b) => sl(b).capHours! - sl(a).capHours!);
const capMax = bigCap.length ? sl(bigCap[0]).capHours! : 0;
const capTop = bigCap.filter((s) => sl(s).capHours === capMax);
const recent = sick.filter((s) => (sl(s).effective ?? '') >= '2024-01-01').sort((a, b) => (sl(a).effective ?? '').localeCompare(sl(b).effective ?? ''));
const none = STATES.filter((s) => !s.sickLeave.mandatory);
const ex = usualStates[0];
const yr40 = ex ? sickYear(ex.slug, 40) : null;
const yr20 = ex ? sickYear(ex.slug, 20) : null;
const raw40 = usual ? (40 * 52) / usual : 0;
const rows = sick.map((s) => [s.name, sl(s).accrualPerHours ? `1 hour per ${sl(s).accrualPerHours} worked` : 'see law', sl(s).capHours != null ? `${sl(s).capHours} hours` : 'none stated', sl(s).employerThreshold ?? 'see law', sl(s).effective ? day(sl(s).effective!) : 'see law']);

export default definePage({
  id: 'paid-sick-leave-by-state',
  group: 'leave',
  kind: 'guide',
  order: 40,
  slug: 'paid-sick-leave-by-state',
  nav: 'Paid sick leave by state',
  card: `Where paid sick leave is the law, how fast you earn it and the yearly cap your employer may set.`,
  title: `Paid Sick Leave by State 2026: Accrual Rates and Caps`,
  description: `Paid sick leave by state in 2026: ${sick.length} laws, most earning 1 hour per ${usual} worked, caps up to ${capMax} hours a year. Check what your hours earn and who is covered.`,
  h1: 'Paid sick leave by state: how much you earn and how you can use it',
  intro: 'Federal law gives private-sector workers no paid sick days. A state law, or a city ordinance, is what turns sick time into a right.',
  resume: `No federal law requires a private employer to give paid sick leave, so the answer depends on where you work. Of the ${STATES.length} jurisdictions covered on this site, ${sick.length} have a statewide paid sick leave law in 2026: ${names(sick)}. The usual accrual rate is one hour of paid leave for every ${usual} hours worked, which is the rule in ${usualStates.length} of them${slower.length ? `, while ${names(slower)} use a slower rate` : ''}. Employers may cap how much you earn or use each year, typically at 40 hours, and the highest cap in the data is ${capMax} hours in ${names(capTop)}. A full-time employee on 40 hours a week at one hour per ${usual} would earn ${num(raw40, 1)} hours over a year before any cap applies, so the cap is what usually binds. Part-time workers earn on the same hourly basis. The leave covers your own illness or medical care, care of a family member and, in most states, absences linked to domestic violence.`,
  mini: 'sickAccrual',
  miniArg: stateArg(),
  body: (h) => `
<h2>The accrual formula, explained with real hours</h2>
<p>Sick leave laws almost never give a block of days on January 1. Instead you earn time as you work, one hour at a time, and the pace is written as a ratio. Under one hour per ${usual}, every ${usual} hours on the clock add one paid hour to your bank. ${ex && yr40 && yr20 ? `In ${ex.name}, a full-time employee working 40 hours a week for 52 weeks would earn ${num(raw40, 1)} hours on paper, but the ${sl(ex).capHours}-hour cap there stops the counter at ${num(yr40.accrued)} hours. A part-time colleague on 20 hours a week earns ${num(yr20.accrued, 1)} hours in the same year, ${yr20.capped ? 'also capped' : 'below the cap'}, so the cap matters far less for short schedules.` : ''} The mini-simulator does the same arithmetic for any state and schedule.</p>
<p>Several laws let employers skip accrual and front-load the full yearly amount at the start of the year or of employment. That is often simpler for payroll and better for a new hire who falls ill in the first month. Many laws allow a waiting period of a few months before new employees can use accrued time, though the leave keeps accruing from the first day. The exact limits, including any carryover of unused hours into the next year, are in the cap column and on each ${h.a('states', 'state page')}.</p>
${h.table(['State', 'Accrual', 'Yearly cap', 'Employers covered', 'In force since'], rows, `Statewide paid sick leave laws (check date ${day(TODAY)})`, ['l', 'l', 'r', 'l', 'l'])}
<h2>Why the ratio changes the answer for the same schedule</h2>
<p>The ratio and the cap pull in different directions, so two workers on identical hours can end the year with very different balances. ${slower.length ? `Take a 30-hour schedule. At one hour per ${usual}, it earns ${num((30 * 52) / usual, 1)} hours over 52 weeks. ${slower.map((s) => `In ${s.name}, at one hour per ${sl(s).accrualPerHours}, the same schedule earns ${num(sickYear(s.slug, 30).accrued, 1)} hours${sickYear(s.slug, 30).capped ? ' once the cap is applied' : ''}`).join('; ')}.` : `Every law in the data uses one hour per ${usual}, so the cap is the only real difference.`} For a full-time employee, the cap is almost always reached before December; for someone working 15 or 20 hours a week, it rarely is, and the ratio decides everything.</p>
<p>Pay for a sick hour is normally your regular hourly rate for the time you would have worked. Laws that cover tipped, commissioned or piece-rate workers often set a formula, such as the average hourly pay over a recent period or at least the full state minimum wage, so a server paid a low cash wage is not left with a few dollars for a lost shift. Salaried non-exempt staff convert their salary to an hourly figure. The state page links to the agency guidance that spells out the formula where you work.</p>
<h2>Sick leave next to the other leave laws</h2>
<p>Three different laws can apply to the same illness, and they answer different questions. Paid sick leave pays for short absences from the first day, with no medical threshold. A ${h.a('paid-family-leave-by-state', 'state paid family and medical leave program')} replaces part of your wages for longer absences, usually after a claim and sometimes a waiting week. The FMLA keeps your job and health plan for up to ${FM.weeks} weeks of serious health conditions, without pay. An employer can often require that accrued sick time run at the same time as FMLA leave, which shortens the period you are fully paid but does not reduce the protection.</p>
<h2>Small employers are where the rules split</h2>
<p>Read the employers column closely. Some states cover every employer from the first worker. Others make leave paid only above a headcount and unpaid below it, or set a lower yearly cap for small firms. The same accrual ratio can therefore produce paid hours at a chain store and unpaid but job-protected hours at a family business next door. A handful of laws also set a minimum number of hours or days worked in the state before an employee is covered, which matters for traveling and seasonal staff. If you work for a small company, the note under each state explains which tier applies.</p>
<h2>What you can use the hours for</h2>
<p>The purposes are similar from state to state: your own illness, injury or medical appointment; caring for a family member who is sick or needs preventive care; and, in most of these laws, time off related to domestic violence, sexual assault or stalking. Many also cover a public health closure of your workplace or your child's school. Family member is defined broadly in most statutes, often including grandparents, siblings, domestic partners and sometimes anyone whose close association is the equivalent of family. Employers can usually ask for documentation only after an absence of several consecutive days, and they cannot require you to find a replacement as a condition of using your leave.</p>
<p>Using sick leave cannot be counted against you. Every state law listed here bars retaliation, such as discipline under an attendance point system for protected absences. When the employer does not pay the hours, or refuses a protected use, the complaint goes to the state labor agency named on your state page, which decides claims without a fee.</p>
<h2>Recent arrivals and what is still unpaid</h2>
<p>${recent.length ? `The newest laws in the data took effect in ${recent.map((s) => `${s.name} (${day(sl(s).effective!)})`).join(', ')}. Several were phased in by employer size, so coverage keeps widening each January.` : 'No law in the data took effect after 2023.'} Where there is no state law, which is the case in ${none.length} of the ${STATES.length} jurisdictions covered here, paid sick time exists only if your employer offers it or a city or county ordinance requires it. A few large cities have their own sick leave rules that apply even when the state has none, and some states have passed laws that forbid local governments from adopting them. The ${h.a('fmla', 'FMLA')} still protects longer absences for a serious health condition, but without pay.</p>
<h2>Sick leave when the job ends</h2>
<p>Unused sick leave is usually not paid out when you leave, unlike vacation in some states, because the laws treat it as protection against lost wages, not as earned compensation. Many statutes require that the balance be restored if you are rehired within a set period. If your employer folds sick days into a general PTO bank, the payout rules for vacation may apply to the whole balance instead, which the ${h.a('pto-payout-laws', 'PTO payout guide')} covers state by state. Check your handbook for the label the employer uses, because that label can decide whether the hours are owed with your ${h.a('final-paycheck-laws', 'final paycheck')}.</p>`,
  faqs: [
    { q: 'How many paid sick days do I get in a year?', a: `It depends on your state and your hours. Most state laws give one hour of paid leave for every ${usual} hours worked, and let the employer cap annual use or accrual, often at 40 hours, which is five 8-hour days. Some caps are higher, up to ${capMax} hours in the data. Without a state or city law, the number is whatever your employer offers.` },
    { q: 'Do part-time employees earn paid sick leave?', a: `Yes, in every state with a law listed here, though a few require a minimum amount of work in the state first. Part-timers earn at the same hourly rate as full-timers. At one hour per ${usual} hours, someone working 20 hours a week earns about ${num((20 * 52) / (usual || 1), 1)} hours over a full year, usually below any cap.` },
    { q: 'Can my employer ask for a doctor note for one sick day?', a: 'In most states with a sick leave law, not for a short absence. Employers are generally allowed to ask for reasonable documentation only after an absence of several consecutive workdays, and some laws forbid requiring that the note explain the medical condition. Where no state law applies, the employer policy decides, subject to the FMLA certification rules for serious conditions.' },
    { q: 'Does unused sick leave carry over to next year?', a: 'Under most state laws, yes, at least in part. Unused accrued hours roll into the next year, but the employer may limit how much can be used in one year or cap the total balance. An employer that front-loads the full yearly amount on the first day of the year can often skip the carryover. The state table shows each cap.' },
    { q: 'Is my employer allowed to count sick days as attendance points?', a: 'Not for absences protected by a state sick leave law. Every statute listed on this page forbids retaliation, which includes counting a protected absence as an occurrence that leads to discipline or termination. Absences beyond your accrued balance, or for reasons the law does not cover, can still fall under the attendance policy. The state labor agency decides complaints.' },
  ],
  related: ['paid-family-leave-by-state', 'fmla', 'pto-payout-laws', 'part-time-hours', 'state:california', 'state:michigan'],
  sources: ['dolSickLeave', 'dolFmla'],
  extraSources: sick.filter((s) => sl(s).source).map((s) => ({ name: `${s.name}: paid sick leave law`, url: sl(s).source!.url })),
});
