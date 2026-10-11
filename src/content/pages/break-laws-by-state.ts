import { definePage } from '../../lib/page-types';
import { F, STATES, breakShift, names, num, day, TODAY } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

type S = (typeof STATES)[number];
const b = (s: S) => s.breaks;
const meal = STATES.filter((s) => b(s).meal || b(s).mealMinutes);
const rest = STATES.filter((s) => b(s).rest || b(s).restMinutes);
const adult = STATES.filter((s) => meal.includes(s) || rest.includes(s));
const minorsOnly = STATES.filter((s) => !adult.includes(s) && b(s).minorsOnly);
const nothing = STATES.filter((s) => !adult.includes(s));
const restTimed = rest.filter((s) => b(s).restMinutes && b(s).restPerHours);
const early = meal.filter((s) => b(s).mealAfterHours != null).sort((x, y) => b(x).mealAfterHours! - b(y).mealAfterHours!);
const firstAfter = early.length ? b(early[0]).mealAfterHours! : null;
const earliest = early.filter((s) => b(s).mealAfterHours === firstAfter);
const late = early.filter((s) => b(s).mealAfterHours! > 6);
const ex = restTimed[0];
const ten = ex ? breakShift(ex.slug, 10) : null;
const six = ex ? breakShift(ex.slug, 6) : null;
const second = meal.filter((s) => /second/i.test(b(s).meal ?? ''));
const toilet = adult.filter((s) => /toilet|restroom/i.test(`${b(s).meal ?? ''} ${b(s).rest ?? ''}`));
const onlySome = meal.filter((s) => /only/i.test(b(s).meal ?? ''));
const rows = adult.map((s) => [s.name, b(s).meal ?? 'no adult meal rule', b(s).rest ?? 'no adult rest rule']);

export default definePage({
  id: 'break-laws-by-state',
  group: 'hours',
  kind: 'guide',
  order: 30,
  slug: 'break-laws-by-state',
  nav: 'Break laws by state',
  card: `Which states require a lunch break or paid rest breaks for adults, after how many hours, and the federal pay rule.`,
  title: `Break Laws by State 2026: Meal Periods and Rest Breaks`,
  description: `Break laws by state in 2026: ${meal.length} of ${STATES.length} jurisdictions here require an adult meal period and ${rest.length} a rest break. Federal law requires neither. Check your shift.`,
  h1: 'Break laws by state: when you are owed a meal period or a rest break',
  intro: 'Federal law never requires a lunch break. Whether you get one, and whether short breaks are paid, depends on your state and your shift length.',
  resume: `No federal law requires employers to give adult workers a meal period or rest breaks. The federal rule only governs pay: short breaks of about 5 to 20 minutes, when an employer offers them, count as paid work time, while a real meal period of usually 30 minutes or more can be unpaid if you are fully relieved of duty. State law adds the actual requirements. Of the ${STATES.length} jurisdictions covered on this site, ${meal.length} require some form of meal period for adults and ${rest.length} require rest breaks: ${names(adult)}. ${firstAfter != null ? `The earliest meal trigger is a shift of more than ${num(firstAfter, firstAfter % 1 ? 1 : 0)} hours, in ${names(earliest)}.` : ''} ${restTimed.length ? `Where paid rest breaks exist, the usual pattern is ${b(restTimed[0]).restMinutes} minutes for every ${b(restTimed[0]).restPerHours} hours worked.` : ''} In the other ${nothing.length}, adults have no break right under state law, and ${minorsOnly.length} of them set rules for minors only. Your employer's policy can always give more.`,
  mini: 'shiftBreaks',
  miniArg: stateArg(),
  body: (h) => `
<h2>The federal rule is about pay, not time off</h2>
<p>The ${h.src('dolBreaks', 'Department of Labor page on breaks and meal periods')} sets out the whole federal position in two sentences of regulation. Short rest breaks, usually 5 to 20 minutes, are compensable work time: if your employer gives them, they must be paid and counted toward the ${F.otWeeklyHours} hours that trigger overtime. Bona fide meal periods, typically 30 minutes or more, are not work time and can be unpaid, but only if you are completely relieved of duty. A receptionist who eats at the desk while answering the phone is working, and that time must be paid. Nothing in federal law obliges the employer to schedule either kind of break for adults.</p>
<p>One federal exception does require time off. Under the PUMP for Nursing Mothers Act, most nursing employees are entitled to reasonable break time to express breast milk, each time they need it, for one year after the child's birth, and to a private place other than a bathroom, as the ${h.ext('https://www.dol.gov/agencies/whd/pump-at-work', 'Wage and Hour Division explains')}. It is a targeted right, not a general break rule.</p>
<h2>Meal periods: when the clock starts</h2>
<p>State meal rules are triggered by shift length. ${early.length ? `In the data, the trigger ranges from more than ${num(firstAfter!, firstAfter! % 1 ? 1 : 0)} hours in ${names(earliest)} to longer thresholds${late.length ? ` such as ${names(late.slice(0, 4))}` : ''}.` : ''} The required break is most often 30 minutes, uninterrupted and unpaid when you are fully off duty. Several states also say when the meal has to fall: not in the first or last hours of the shift, or within a window around midday, as New York does with its 11 a.m. to 2 p.m. rule. Many allow a written waiver for short shifts, and some allow an on-duty meal that is paid when the nature of the job makes relief impossible, such as a lone overnight clerk.</p>
<p>The details in the table below come from each state's labor agency or statute, as recorded in this site's data. Some rules cover only certain employers, such as large retailers or mechanical workshops, and the text says so where it applies.</p>
${h.table(['State', 'Meal period (adults)', 'Rest breaks (adults)'], rows, `States with a meal or rest break rule for adult employees (check date ${day(TODAY)})`, ['l', 'l', 'l'])}
<h2>Paid rest breaks, shift by shift</h2>
<p>Rest breaks are rarer than meal periods. ${restTimed.length ? `They are written as a number of paid minutes per block of hours worked in ${names(restTimed)}.` : ''} Many of those states give an extra break for a remaining major fraction of a block, meaning more than half of it. ${ex && ten && six ? `In ${ex.name}, for example, a 10-hour shift carries ${ten.rests} paid rest breaks of ${b(ex).restMinutes} minutes and ${ten.meals ? `a ${ten.mealMinutes}-minute meal period` : 'no meal period'}, while a 6-hour shift carries ${six.rests} rest breaks and ${six.meals ? 'a meal period' : 'no meal period'}.` : ''} Rest breaks are paid time and cannot be added together to leave early or to lengthen lunch unless state rules allow it. The mini-simulator applies the rule of the state you pick to any shift length.</p>
${h.mini('shiftBreaks', stateArg(ex?.name))}
<h2>Long shifts, restrooms and rules limited to some workplaces</h2>
<p>Double shifts are where the state rules diverge most. ${second.length ? `A second meal period for very long days is written into the rule in ${names(second)}, so a 12-hour shift there can carry two meals as well as several rest breaks.` : 'Few states in the data add a second meal period for very long days.'} In states with a single meal rule, a 12-hour day earns the same one meal as a 7-hour day, and any further pause is up to the employer. Nurses, security guards and factory crews on rotating 12-hour schedules should check whether their employer has a written break schedule, because that document, not the statute, will usually govern the second half of the shift.</p>
<p>Restroom access is treated separately. ${toilet.length ? `The break rules of ${names(toilet)} mention restroom access in their own wording.` : ''} Federal workplace safety rules cover the rest: an ${h.ext('https://www.osha.gov/laws-regs/standardinterpretations/1998-04-06-0', 'OSHA interpretation of its sanitation standard')} says employers must allow prompt access to toilet facilities and may not impose unreasonable restrictions, so a strict break schedule cannot be used to deny it. That obligation exists even in the states with no break law at all.</p>
<p>Finally, some state rules reach only part of the workforce. ${onlySome.length ? `The wording of the meal rule in ${names(onlySome)} limits it to certain employers or situations, such as large retailers, factories and workshops, or shifts where a single employee is on duty.` : 'Read each rule for limits by industry or employer size.'} Wage orders for specific industries, such as health care or agriculture, can also replace the general rule. If your job sits at the edge of a category, the state labor agency is the one that decides which rule applies.</p>
<h2>States with no break law for adults</h2>
<p>In ${nothing.length} of the ${STATES.length} jurisdictions covered here, an adult can lawfully work a full shift without a scheduled break, and the employer decides by policy. ${minorsOnly.length ? `Of those, ${names(minorsOnly)} set break rules for workers under 18 only, usually a meal break after a set number of hours for younger teens.` : ''} The federal pay rule still applies everywhere: if a short break is given, it is paid, and an unpaid lunch must be genuinely free of work. Many employers in these states give breaks anyway, and once a policy promises them, a written policy or contract can be enforced like any other term of employment.</p>
<h2>When breaks are missed or interrupted</h2>
<p>The remedy depends on the state. Some state laws attach a pay premium or a penalty to a missed break, and the state agency's guidance says how it is calculated. In most places, the first remedy is simply to pay for the time: a meal break that was interrupted by work becomes paid time and may push the week past ${F.otWeeklyHours} hours, creating overtime. Keep a note of the dates and how long you actually got, because time records often show an automatic 30-minute deduction that does not match reality. Automatic deductions are allowed only if the break was really taken. Complaints go to the state labor agency, which decides whether the break rule applies to your employer and job; the agency for each state is on ${h.a('states', 'its state page')}. The ${h.a('overtime-laws-by-state', 'overtime rules')} explain how unpaid break time feeds into weekly hours.</p>`,
  faqs: [
    { q: 'How long can you work without a break by law?', a: `Under federal law, there is no limit for adults: no break is required. State law sets the limit where it exists. ${firstAfter != null ? `The earliest meal trigger in the data is a shift of more than ${num(firstAfter, firstAfter % 1 ? 1 : 0)} hours, in ${names(earliest)}, and other states start at six to eight hours.` : ''} Minors often have stricter rules. Check your state in the table or the mini-simulator.` },
    { q: 'Are 15 minute breaks paid?', a: 'Yes. Under federal law, short breaks of about 5 to 20 minutes are counted as hours worked and must be paid whenever the employer offers them, whatever the state. They also count toward overtime. Only a bona fide meal period, usually 30 minutes or more with no duties at all, can be unpaid. Your employer is not required to offer short breaks unless state law says so.' },
    { q: 'Can my employer make me eat lunch at my desk unpaid?', a: 'No. A meal period can be unpaid only if you are completely relieved of duty. If you must answer phones, watch a counter or stay available to customers while you eat, the time is work time under federal law and must be paid, which can also create overtime. Some states allow paid on-duty meals only with a written agreement.' },
    { q: 'Which states require paid rest breaks for adults?', a: `In the data on this site, ${restTimed.length ? names(restTimed) : 'few states'} set a paid rest break per block of hours worked${rest.length > restTimed.length ? `, and ${names(rest.filter((s) => !restTimed.includes(s)))} set a looser rest rule` : ''}. The common pattern is ${restTimed.length ? `${b(restTimed[0]).restMinutes} minutes for every ${b(restTimed[0]).restPerHours} hours` : 'a short paid break every few hours'}. Elsewhere, short breaks are optional, but they must be paid when given.` },
  ],
  related: ['overtime-laws-by-state', 'full-time-hours', 'part-time-hours', 'state:california', 'state:new-york', 'states'],
  sources: ['dolBreaks', 'dolMeal', 'dolRest'],
  extraSources: [{ name: 'U.S. Department of Labor, Wage and Hour Division: FLSA protections to pump at work', url: 'https://www.dol.gov/agencies/whd/pump-at-work' }, { name: 'OSHA: interpretation of 29 CFR 1910.141(c)(1)(i), access to toilet facilities (April 6, 1998)', url: 'https://www.osha.gov/laws-regs/standardinterpretations/1998-04-06-0' }],
});
