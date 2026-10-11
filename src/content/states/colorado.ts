import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, otCalc, rate$, usd, usdx, day, F } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('colorado');
const now = mwNow('colorado');
const next = mw2027('colorado')!;
const den = S.localMinWages.find((l) => l.name.startsWith('Denver'))!;
const ex = S.overtime.exemptSalaryWeekly!;
const exYear = Number(S.overtime.exemptSalaryNote!.match(/\$([\d,]+) per year/)![1].replace(/,/g, ''));
const daily = S.overtime.dailyHours!;
const co = otCalc('colorado', 22, 13, 3);
const fed = otCalc('texas', 22, 13, 3);
const fl = S.familyLeave;
const band = Number(fl.replacement!.match(/first \$([\d,.]+)/)![1].replace(/,/g, ''));
const aww = 1200;
const benefit = Math.min(fl.maxWeeklyBenefit2026!, 0.9 * Math.min(aww, band) + 0.5 * Math.max(0, aww - band));
const premium = S.notes.find((n) => n.text.startsWith('FAMLI premiums'))!.text.match(/([\d.]+)% of wages/)![1];
const br = S.breaks;

export default defineStatePage({
  slug: 'colorado',
  title: `Colorado Employment Law 2026: ${rate$(now)}, Vacation Payout, FAMLI`,
  description: `Colorado in 2026: ${rate$(now)} minimum wage, Denver at ${rate$(den.rate)}, overtime after ${daily} hours a day, mandatory vacation payout and FAMLI paying up to ${usd(fl.maxWeeklyBenefit2026!)} a week.`,
  intro: 'In Colorado earned vacation can never be forfeited, overtime can start inside a single long shift, and rest breaks are paid by law.',
  resume: `Colorado treats earned vacation as wages that must be paid when a job ends, for any reason, and voids any policy that says otherwise. The state minimum wage is ${rate$(now)} an hour in 2026 and becomes ${rate$(next.rate)} on ${day(next.from)}; Denver sets a higher local rate of ${rate$(den.rate)}, and Boulder, unincorporated Boulder County and Edgewater have their own. Overtime at time and a half applies after ${S.overtime.weeklyHours} hours a week, after ${daily} hours in a day or after any ${daily} consecutive hours, whichever pays more. A salaried professional must earn at least ${usd(exYear)} a year in 2026 to be exempt. Workers accrue one hour of paid sick leave per 30 hours, up to ${S.sickLeave.capHours} hours a year at any employer. FAMLI, the state insurance program, pays up to ${fl.maxWeeks} weeks of family or medical leave with a weekly maximum of ${usdx(fl.maxWeeklyBenefit2026!)}. A worker who is fired must be paid immediately.`,
  body: (h) => `
<h2>Vacation you earn is vacation you keep</h2>
<p>The Colorado Department of Labor and Employment is blunt about it: unused vacation must be paid when an employee separates, whether fired with or without cause or resigning with or without notice. Any agreement that forfeits earned pay is void and unenforceable, so "use it or lose it" clauses have no effect on time already accrued. A barista who leaves with 32 unused hours at $18 an hour is owed ${usd(32 * 18)} on top of the last wages. The rule reaches every reason for leaving, so a dismissal for misconduct does not cancel the balance either.</p>
${h.mini('ptoPayout', stateArg('Colorado'))}
<h2>Overtime inside a long shift</h2>
<p>The COMPS Order adds a daily trigger at ${daily} hours, rarer than the 8-hour rule of a few western states but still unusual. Imagine a ski lift mechanic paid $22 an hour who works three 13-hour days during a storm. The week totals 39 hours, below the federal line, and federal law alone would pay ${usd(fed.total)}. Colorado counts the thirteenth hour of each day as overtime, ${co.otHours} hours in all, for ${usd(co.total)}. The third test, any ${daily} consecutive hours, catches shifts that cross midnight. On the salary side, the exempt floor of ${usd(exYear)} works out to ${usdx(ex)} a week, well above the federal ${usd(F.exemptWeekly)}, and it is reset every year.</p>
<h2>Paid rest breaks and a meal after ${br.mealAfterHours} hours</h2>
<p>Every worker on a shift of more than ${br.mealAfterHours} consecutive hours is entitled to an uninterrupted, duty-free meal period of ${br.mealMinutes} minutes, paid only when relief from duty is impractical. On top of that, the employer owes a paid ${br.restMinutes}-minute rest period for each ${br.restPerHours} hours worked or major fraction of that time. The tool below counts what one shift carries.</p>
${h.mini('shiftBreaks', stateArg('Colorado'))}
<h2>FAMLI: how the weekly benefit is figured</h2>
<p>FAMLI replaces 90 percent of wages up to ${usdx(band)} a week, half the state average weekly wage, and 50 percent of the part above it, up to ${usdx(fl.maxWeeklyBenefit2026!)} since July 1, 2026. A worker whose average weekly wage is ${usd(aww)} would receive about ${usdx(Math.round(benefit * 100) / 100)} a week. Premiums are ${premium} percent of wages in 2026, split evenly between employer and employee unless the employer covers more. Leave lasts up to ${fl.maxWeeks} weeks a year, with up to 16 when pregnancy or childbirth brings complications. Sick leave under the Healthy Families and Workplaces Act sits beside it, at one hour per 30 worked and up to ${S.sickLeave.capHours} hours, for every employer regardless of size.</p>
<h2>Local wages and the final paycheck</h2>
<p>Denver has already announced ${rate$(Number(den.note!.match(/\$([\d.]+) from 2027/)![1]))} for 2027; ${h.a('city-minimum-wage', 'city minimum wages')} lists the other local rates. Minors who are not emancipated may be paid 15 percent below the state minimum. A fired or laid-off employee must be paid all wages at once, within hours if the payroll unit is closed, and someone who quits is paid by the next regular payday. The Division of Labor Standards and Statistics handles wage complaints and decides them on the records.</p>`,
  faqs: [
    { q: 'Can a Colorado employer refuse to pay out unused vacation?', a: 'No. Colorado requires earned, unused vacation to be paid at separation, whether you are fired, laid off or quit, with or without notice. A policy that forfeits accrued vacation is void. Earned vacation hours are treated as wages, so they belong in the final paycheck at your regular rate.' },
    { q: 'Does Colorado have daily overtime after 12 hours?', a: `Yes. Non-exempt workers in Colorado earn time and a half for hours beyond ${S.overtime.weeklyHours} in a workweek, beyond ${daily} in a workday, or beyond ${daily} consecutive hours, whichever gives more pay. A 13-hour shift therefore includes one overtime hour even if the week ends under ${S.overtime.weeklyHours} hours. There is no general double-time rule in state law.` },
    { q: 'What is the Colorado minimum wage for 2027?', a: `The Colorado Department of Labor and Employment announced ${rate$(next.rate)} an hour from ${day(next.from)}, and a tipped cash wage that rises with it. The 2026 rate is ${rate$(now)}. The change comes from the inflation adjustment written into the state constitution. Denver, Boulder, unincorporated Boulder County and Edgewater set their own higher rates.` },
    { q: 'How much does FAMLI pay per week in CO?', a: `FAMLI replaces 90% of your average weekly wage up to ${usdx(band)} and 50% of the rest, with a maximum of ${usdx(fl.maxWeeklyBenefit2026!)} a week since July 1, 2026. You can receive benefits for up to ${fl.maxWeeks} weeks in a year for family or medical reasons, and up to 16 weeks with pregnancy or childbirth complications. Premiums come from payroll.` },
  ],
  related: ['state:utah', 'state:new-mexico', 'state:kansas', 'state:wyoming', 'pto-payout-laws', 'paid-family-leave-by-state'],
});
