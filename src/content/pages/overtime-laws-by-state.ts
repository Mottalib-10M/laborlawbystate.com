import { definePage } from '../../lib/page-types';
import { STATES, F, sd, mwNow, otCalc, otRule, rate$, usd, num, names } from '../../lib/kit';

const has = (slug: string) => STATES.some((s) => s.slug === slug);
const daily = STATES.filter((s) => s.overtime.dailyHours);
const dbl = STATES.filter((s) => s.overtime.doubleTime);
const seventh = STATES.filter((s) => s.overtime.seventhDay);
const longer = STATES.filter((s) => (s.overtime.weeklyHours ?? 0) > F.otWeeklyHours);
const none = STATES.filter((s) => s.overtime.weeklyHours == null && s.overtime.dailyHours == null);
const rate = 20;
const ca4 = has('california') ? otCalc('california', rate, 10, 4) : null;
const fed4 = otCalc('texas', rate, 10, 4);
const ca13 = has('california') ? otCalc('california', rate, 13, 5) : null;
const mnW = has('minnesota') ? sd('minnesota').overtime.weeklyHours : null;
const mn45 = has('minnesota') ? otCalc('minnesota', rate, 9, 5) : null;
const nv = has('nevada') ? sd('nevada') : null;
const nvLine = nv ? 1.5 * mwNow('nevada') : 0;
const ak = has('alaska') ? sd('alaska') : null;
const co = has('colorado') ? sd('colorado') : null;
const otRate = rate * F.otMultiplier;
const caD = has('california') ? sd('california').overtime.dailyHours : null;
const caDD = has('california') ? otRule('california').dailyDouble : null;

export default definePage({
  id: 'overtime-laws-by-state',
  group: 'overtime',
  kind: 'pillar',
  order: 10,
  slug: 'overtime-laws-by-state',
  nav: 'Overtime laws by state',
  card: `Weekly and daily overtime thresholds, double time and the seventh-day rule, state by state.`,
  title: `Overtime Laws by State 2026: Weekly, Daily and Double Time`,
  description: `Overtime laws by state in 2026: time and a half after ${F.otWeeklyHours} hours a week everywhere, daily overtime in ${daily.length} states, double time in ${dbl.length}. Check the rule where you work.`,
  h1: 'Overtime laws by state: when time and a half and double time start',
  intro: 'Federal law sets the weekly rule for the whole country; a few states add daily limits, double time or a seventh-day rule. The calculator applies the stricter rule to your week.',
  resume: `Every covered, non-exempt employee in the United States is owed at least ${F.otMultiplier} times the regular rate for each hour over ${F.otWeeklyHours} in a workweek under the Fair Labor Standards Act, and no state can go below that. What states change is when overtime starts. ${names(daily)} ${daily.length > 1 ? 'add' : 'adds'} a daily threshold, so a long shift earns overtime even in a short week; ${dbl.length ? `${names(dbl)} also ${dbl.length > 1 ? 'require' : 'requires'} double time for the longest days` : 'no state on file requires double time'}. ${longer.length ? `${names(longer)} ${longer.length > 1 ? 'set' : 'sets'} a weekly threshold above ${F.otWeeklyHours} hours for workers outside federal coverage${mnW ? ` (Minnesota: ${mnW} hours)` : ''}, while the federal ${F.otWeeklyHours} hours still bind covered employers there.` : ''} ${none.length} states on file have no overtime rule of their own and rely on the federal one. ${ca4 ? `For a worker paid ${rate$(rate)} an hour on four 10-hour days, California owes ${usd(ca4.total)} for the week, while the federal rule owes ${usd(fed4.total)}.` : ''} When state and federal rules both apply, the worker gets whichever pays more.`,
  tool: 'overtime',
  toolProps: { state: 'california' },
  body: (h) => `
<h2>The federal rule that applies in every state</h2>
<p>The Fair Labor Standards Act measures overtime by the workweek, a fixed and regularly recurring period of 168 hours chosen by the employer. Hours over ${F.otWeeklyHours} in that week are paid at least at ${F.otMultiplier} times the regular rate, which is ${rate$(otRate)} for a worker earning ${rate$(rate)}. Two weeks cannot be averaged: 50 hours one week and 30 the next still means 10 overtime hours in the first. Federal law says nothing about daily hours, weekends or holidays as such, and it puts no cap on the hours an adult may work. Everything beyond that comes from state law. ${h.a('time-and-a-half', 'The time and a half guide')} covers how the regular rate is computed when pay includes bonuses or commissions.</p>
<h2>States that count overtime by the day</h2>
<p>${names(daily)} ${daily.length > 1 ? 'pay' : 'pays'} overtime after a set number of hours in a single workday, regardless of the weekly total. ${ca4 ? `California is the strictest: time and a half after ${caD} hours in a day and double time after ${caDD}. A worker on a four-day schedule of 10-hour days at ${rate$(rate)} has ${num(ca4.otHours)} overtime hours under California law and none under federal law, so the week pays ${usd(ca4.total)} rather than ${usd(fed4.total)}. ${ca13 ? `On five 13-hour days the same worker reaches ${num(ca13.doubleHours)} hours of double time and ${num(ca13.otHours)} of time and a half, for ${usd(ca13.total)}.` : ''} California also has a seventh-day rule: the first 8 hours on the seventh consecutive day of a workweek are paid at time and a half, and the rest at double time.` : ''} ${co ? `Colorado's daily line sits at ${co.overtime.dailyHours} hours, so it mainly reaches long shifts.` : ''} ${ak ? `Alaska applies a daily threshold of ${ak.overtime.dailyHours} hours, but not to employers with three or fewer employees.` : ''}</p>
<p>${nv ? `Nevada's daily rule is conditional. Overtime after ${nv.overtime.dailyHours} hours in a day is owed only to employees paid less than one and a half times the state minimum wage, which is ${rate$(nvLine)} an hour in 2026; above that, only the weekly rule applies. The calculator applies that test from the rate you enter.` : 'Nevada also has a daily rule that only reaches lower-paid employees, those below a pay line tied to the state minimum wage; the calculator applies that test once the Nevada data file is published.'} ${seventh.filter((s) => s.slug !== 'california').length ? `Seventh-day rules exist elsewhere in narrower form: ${names(seventh.filter((s) => s.slug !== 'california'))} ${seventh.filter((s) => s.slug !== 'california').length > 1 ? 'apply' : 'applies'} a premium to the seventh consecutive day in certain industries.` : ''}</p>
<h2>Every state rule on file</h2>
${h.table(['State', 'Weekly threshold', 'Daily threshold', 'Double time', 'Seventh day'], STATES.map((s) => [h.a(`state:${s.slug}`, s.name), s.overtime.weeklyHours != null ? `${s.overtime.weeklyHours} h` : `federal ${F.otWeeklyHours} h`, s.overtime.dailyHours != null ? `${s.overtime.dailyHours} h` : '-', s.overtime.doubleTime ? 'yes' : '-', s.overtime.seventhDay ? 'yes' : '-']), 'State overtime thresholds; the federal 40-hour rule applies wherever the FLSA covers the employer', ['l', 'r', 'r', 'l', 'l'])}
<h2>Thresholds above 40 hours</h2>
<p>${longer.length ? `${names(longer)} ${longer.length > 1 ? 'write' : 'writes'} a weekly threshold above ${F.otWeeklyHours} hours into state law.` : 'A few states write a weekly threshold above 40 hours into state law.'} ${mn45 && mnW ? `Minnesota counts overtime after ${mnW} hours, but that rule only decides the matter for employers outside federal coverage. A worker on five 9-hour days at a business covered by the FLSA is still owed ${num(mn45.otHours)} overtime hours under the federal rule, and the week pays ${usd(mn45.total)}.` : ''} The same logic applies in states with no overtime law at all, such as ${names(none.slice(0, 4))}: the federal ${F.otWeeklyHours}-hour rule binds covered employers, which includes almost any business with interstate activity and most hospitals, schools and public agencies.</p>
<h2>Who is left out</h2>
<p>Overtime rules protect non-exempt employees. Executive, administrative and professional employees who pass both a salary test and a duties test are exempt, and so are some outside salespeople, certain farm workers and a list of specific jobs. A job title or a salary alone does not make anyone exempt. ${h.a('exempt-vs-non-exempt', 'The exempt vs non-exempt guide')} walks through the tests, and ${h.a('salary-exempt-threshold', 'the salary threshold guide')} lists the states that set a higher salary line than the federal ${usd(F.exemptWeekly)} a week.</p>
<p>This page and its calculator apply the legal rule to a regular schedule. For tracking clock-in and clock-out times shift by shift, use a time card tool; the rule here tells you which of those hours must be paid at the higher rate. Unpaid overtime is a wage claim, filed with the state labor agency or the Wage and Hour Division, which decides it on the records.</p>`,
  faqs: [
    { q: 'Which states have daily overtime?', a: `${names(daily)} ${daily.length > 1 ? 'require' : 'requires'} overtime after a set number of hours in a workday, on top of the weekly rule. ${caD ? `California starts at ${caD} hours a day and adds double time after ${caDD}.` : ''} ${nv ? `Nevada's daily rule only applies to workers paid under ${rate$(nvLine)} an hour.` : 'Nevada has a daily rule limited to lower-paid workers.'} Everywhere else, overtime depends only on the hours worked in the week.` },
    { q: 'Do I get overtime for working on a Sunday or a holiday?', a: `Not under federal law. The Fair Labor Standards Act does not require premium pay for weekends, holidays or regular days of rest as such; it only counts hours over ${F.otWeeklyHours} in the workweek. Some employers pay a holiday premium by policy or contract. ${seventh.length ? `${names(seventh)} ${seventh.length > 1 ? 'have' : 'has'} a seventh-consecutive-day rule, which is different from a Sunday rule.` : ''}` },
    { q: 'When is double time required by law?', a: `Federal law never requires double time. ${dbl.length ? `${names(dbl)} ${dbl.length > 1 ? 'do' : 'does'}: in California, hours over ${caDD} in a workday and hours over ${caD} on the seventh consecutive day of a workweek are paid at twice the regular rate.` : 'No state on file requires it.'} Elsewhere, double time only comes from a union contract or an employer policy, never from state law.` },
    { q: 'Can my employer average my hours over two weeks to avoid overtime?', a: `No. Under federal law each workweek stands alone, and averaging hours over two or more weeks is not permitted, even if you are paid every two weeks. If you work 50 hours one week and 30 the next, the first week has ${50 - F.otWeeklyHours} overtime hours. The employer may choose when the workweek starts, but it must stay fixed.` },
    { q: 'Does my state have its own overtime law?', a: `${STATES.length - none.length} states on file have their own overtime rule and ${none.length} do not, including ${names(none.slice(0, 4))}. Where a state has no rule, the federal ${F.otWeeklyHours}-hour threshold still applies to covered employers, which means most workers. The table on this page shows each state's weekly and daily thresholds and any double time or seventh-day rule.` },
    { q: 'Is there a limit on how many hours my employer can make me work?', a: `For adults, federal law sets no limit: an employer can require long hours as long as overtime is paid for those over ${F.otWeeklyHours} in the week. Limits exist for workers under 16, for some transportation and health care jobs, and in a few states for specific industries. A refusal to work mandatory overtime can lead to discipline in an at-will job.` },
    { q: 'Does Minnesota have a different overtime threshold?', a: `${mnW ? `Minnesota's own law sets the threshold at ${mnW} hours a week, but it decides the matter only for employers outside federal coverage.` : 'Minnesota’s own law sets a weekly threshold above 40 hours for employers outside federal coverage.'} Most Minnesota workers are covered by the federal law and are owed time and a half after ${F.otWeeklyHours} hours. The worker always gets the result that pays more.` },
  ],
  related: ['time-and-a-half', 'exempt-vs-non-exempt', 'salary-exempt-threshold', 'minimum-wage-by-state', 'state:california', 'state:minnesota'],
  sources: ['fs23', 'cfr778107', 'dolOvertime', 'cfr778105'],
});
