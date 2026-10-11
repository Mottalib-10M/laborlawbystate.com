import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, F, sickYear, finalPayDate, day, num } from '../../lib/kit';
import { stateArg, cityArg } from '../../lib/mini-args';

const S = sd('new-mexico');
const mw = mwNow('new-mexico');
const tip = S.minWage.tipped.cashWage!;
const sf = S.localMinWages.find((l) => l.name === 'City of Santa Fe')!;
const lc = S.localMinWages.find((l) => l.name === 'Las Cruces')!;
const sick = sickYear('new-mexico', 40);
const due = finalPayDate('new-mexico', '2026-10-05')!;

export default defineStatePage({
  slug: 'new-mexico',
  title: `New Mexico Labor Laws 2026: ${rate$(mw)} State, ${rate$(sf.rate)} Santa Fe`,
  description: `New Mexico labor laws in 2026: ${rate$(mw)} state minimum, ${rate$(sf.rate)} in Santa Fe, ${rate$(tip)} tipped cash wage, ${S.sickLeave.capHours} h paid sick leave at every employer, pay in 5 days.`,
  intro: 'A modest state rate, much higher city rates, and a sick leave law that covers every private employer from the first worker.',
  resume: `New Mexico's minimum wage is ${rate$(mw)} an hour, unchanged since January 1, 2023, with a tipped cash wage of ${rate$(tip)}. The real variation is local: the City of Santa Fe and unincorporated Santa Fe County pay ${rate$(sf.rate)} since March 1, 2026, Las Cruces pays ${rate$(lc.rate)}, and Albuquerque and Santa Fe County set higher tipped wages than the state. Every private employer, whatever its size, must provide paid sick leave under the Healthy Workplaces Act: one hour for every 30 hours worked, up to ${S.sickLeave.capHours} hours a year, or the full amount at once. Overtime is time and a half after 40 hours a week, and New Mexico does not allow comp time in place of overtime pay in the private sector. A dismissed worker must be paid within 5 days, a worker who quits on the next payday. There is no paid family leave program yet.`,
  body: (h) => `
<h2>City rates far above the state</h2>
<p>New Mexico lets cities and counties set their own minimum wage, and the two largest local rates sit well above ${rate$(mw)}. Santa Fe ties its living wage to a formula, which produced ${rate$(sf.rate)} from March 1, 2026, and the city has already scheduled a much larger step on January 1, 2027. Las Cruces pays ${rate$(lc.rate)}. Albuquerque's own ordinance figure has fallen below the state rate, so the state ${rate$(mw)} applies there, but the city keeps a tipped cash wage well above the state's ${rate$(tip)}. If you work in more than one place, each local rate applies to the hours worked inside its limits.</p>
${h.mini('cityCompare', cityArg())}
<h2>Sick leave from the first employee</h2>
<p>The Healthy Workplaces Act has applied since July 1, 2022, to every private employer, including businesses with a single worker. A full-time employee earning one hour per 30 reaches the ${S.sickLeave.capHours}-hour annual limit before the year is out (the raw accrual would be about ${num(Math.floor(sick.raw ?? 0))} hours). Employers may instead give all ${S.sickLeave.capHours} hours at the start of the year.</p>
<h2>Tipped workers: three different cash wages</h2>
<p>The state lets restaurants pay tipped staff a cash wage of ${rate$(tip)} an hour, provided tips bring every hour to at least ${rate$(mw)} over the workweek. Several local ordinances set a higher cash wage for tipped work, Albuquerque, Las Cruces and Santa Fe County among them, and in those places the local figure applies. A server who averages less in tips than the gap between the cash wage and the minimum is owed a top-up from the employer for that pay period.</p>
${h.mini('tipTopUp', stateArg('New Mexico'))}
${h.mini('sickAccrual', stateArg('New Mexico'))}
<h2>Overtime without comp time</h2>
<p>Private employers must pay time and a half in cash for hours over 40 in a week; offering time off later instead of overtime pay is not allowed, and an employee cannot waive the premium. Salaried employees are exempt only under the federal duties tests and the federal salary level of ${usd(F.exemptWeekly)} a week.</p>
<h2>Final pay</h2>
<p>An employer that discharges a worker has 5 days to pay all wages, or 10 days when pay is based on tasks, pieces or commission. A dismissal on ${day('2026-10-05')} means pay by ${day(due)}. Someone who quits is paid on the next regular payday. No statute requires vacation, holiday or severance pay, so the employer's policy decides whether unused vacation is paid. New Mexico is not a right-to-work state, and employment is at will.</p>`,
  faqs: [
    { q: 'What is the minimum wage in Santa Fe, New Mexico?', a: `${rate$(sf.rate)} an hour since March 1, 2026, in the City of Santa Fe and in unincorporated Santa Fe County, against ${rate$(mw)} for the rest of the state. The city has scheduled a larger increase for January 1, 2027, and from 2028 its rate follows a formula that blends inflation and local rents.` },
    { q: 'Do small businesses in New Mexico have to give paid sick leave?', a: `Yes. The Healthy Workplaces Act covers every private employer in New Mexico, regardless of the number of employees. Workers earn one hour for every 30 hours worked, up to ${S.sickLeave.capHours} hours a year, or receive the ${S.sickLeave.capHours} hours at the start of the year. The law has been in force since July 1, 2022.` },
    { q: 'How fast must a New Mexico employer pay a fired worker?', a: 'Within 5 days of the discharge, or within 10 days if the wages are based on tasks, pieces or commission. A worker who quits is paid on the next regular payday. Unused vacation is owed only if the employer policy promises it, since no New Mexico statute requires vacation pay.' },
  ],
  related: ['state:texas', 'state:arizona', 'state:colorado', 'city-minimum-wage', 'paid-sick-leave-by-state', 'final-paycheck-laws'],
});
