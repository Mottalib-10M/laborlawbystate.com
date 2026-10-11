import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, tippedCash, sickYear, otCalc, rate$, usd, usdx, day, FM } from '../../lib/kit';
import { pflArg, stateArg } from '../../lib/mini-args';

const S = sd('connecticut');
const now = mwNow('connecticut');
const fl = S.familyLeave;
const low = 40 * now;
const cap = 60 * now;
const base = 900;
const pay = Math.min(cap, 0.95 * Math.min(base, low) + 0.6 * Math.max(0, base - low));
const wait = tippedCash('connecticut')!;
const bar = Number(S.minWage.tipped.note!.match(/bartenders \$([\d.]+)/)![1]);
const sick = sickYear('connecticut', 25);
const sl = S.sickLeave;
const br = S.breaks;
const ot = otCalc('connecticut', 24, 9, 5);

export default defineStatePage({
  slug: 'connecticut',
  title: `Connecticut Labor Law 2026: ${rate$(now)} Wage, Sick Leave Expands`,
  description: `Connecticut in 2026: ${rate$(now)} an hour, sick leave at firms with 11+ staff and every employer in 2027, CT Paid Leave up to ${usdx(cap)} a week, and meal breaks.`,
  intro: 'Connecticut is halfway through extending paid sick leave to every workplace, and its paid leave benefit is pegged to the minimum wage itself.',
  resume: `Connecticut's paid sick leave law covers employers with 11 or more employees in the state during 2026 and reaches every employer with even one worker on January 1, 2027, the last phase of the 2024 expansion. Workers accrue one hour per 30 worked, up to ${sl.capHours} hours a year. The minimum wage is ${rate$(now)} an hour in 2026, indexed to the federal employment cost index, and the Labor Commissioner announces the next rate each October 15. Restaurant servers can be paid ${rate$(wait)} and bartenders ${rate$(bar)} plus tips. CT Paid Leave replaces most of a modest paycheck for up to ${fl.maxWeeks} weeks, with a weekly cap set by law at 60 times the minimum wage, ${usdx(cap)} at the 2026 rate. Overtime starts after ${S.overtime.weeklyHours} hours a week. Anyone working seven and a half consecutive hours is owed a 30-minute meal period, and a discharged employee must be paid by the next business day.`,
  body: (h) => `
<h2>Sick leave, one phase from universal</h2>
<p>Public Act 24-8 rewrote Connecticut's sick leave statute. The old version was limited to service workers; the new one applies to all employees and is being phased in by headcount: 25 or more workers in 2025, 11 or more since ${day(sl.effective!)}, and any employer with at least one worker from January 1, 2027. Hours accrue at one per 30 worked, capped at ${sl.capHours} a year; up to ${sl.capHours} unused hours carry over, but use stays limited to ${sl.capHours} hours in a year. A new hire can start using the time on the 120th day of employment. Someone on 25 hours a week earns about ${Math.floor(sick.accrued)} hours over a year. The law also lets workers use sick time for a mental health wellness day.</p>
${h.mini('sickAccrual', stateArg('Connecticut'))}
<h2>A paid leave benefit tied to the minimum wage</h2>
<p>CT Paid Leave pays 95 percent of base weekly earnings up to 40 times the minimum wage, which is ${usdx(low)} in 2026, plus 60 percent of earnings above that line, and the total cannot exceed 60 times the minimum wage. Because both figures follow the hourly rate, the benefit moves every January without a separate vote. A nurse aide with base weekly earnings of ${usd(base)} would receive about ${usdx(Math.round(pay * 100) / 100)} a week. Leave runs up to ${fl.maxWeeks} weeks in a 12-month period for a new child, a relative's or your own serious health condition, with 2 more weeks for incapacity during pregnancy. Job protection comes from the Connecticut FMLA, which reaches employers with a single employee, far below the federal threshold of ${FM.employerEmployees}.</p>
${h.mini('pflState', pflArg('Connecticut'))}
<h2>The meal period rule</h2>
<p>Connecticut sets a ${br.mealMinutes}-minute meal break for anyone required to work ${br.mealAfterHours} or more consecutive hours, placed after the first 2 hours and before the last 2. On an 8-hour shift starting at 7 a.m., the break must fall between 9 a.m. and 1 p.m. The statute fixes the window, not the exact minute, so the employer picks the time inside it. No paid rest break is required for adults.</p>
<h2>Overtime, restaurants and the seventh day</h2>
<p>Time and a half applies after ${S.overtime.weeklyHours} hours in a workweek. A machinist earning $24 an hour who works five 9-hour days is owed ${ot.otHours} overtime hours, ${usd(ot.total)} for the week. Restaurant and hotel staff get an extra protection from their wage order: all time worked on the seventh consecutive day is paid at the premium rate. The tipped cash wages of ${rate$(wait)} and ${rate$(bar)} only hold when tips make up the rest of ${rate$(now)}.</p>
<h2>Leaving a job</h2>
<p>A discharged employee is paid in full no later than the business day after the discharge. Someone who quits is paid by the next regular payday. Accrued vacation is owed at termination only if an employer policy or a union contract provides for it, so the handbook decides. Wage claims go to the Wage and Workplace Standards Division of the Department of Labor, which reviews each claim.</p>`,
  faqs: [
    { q: 'Does my Connecticut employer have to give paid sick leave in 2026?', a: `Yes, if it employs 11 or more people in the state. Since January 1, 2026 those employers must let workers accrue one hour of paid sick leave for every 30 hours worked, up to ${sl.capHours} hours a year, usable from the 120th day of employment. From January 1, 2027 the law covers every employer with at least one employee.` },
    { q: 'How is the CT Paid Leave weekly benefit calculated?', a: `It equals 95% of your base weekly earnings up to 40 times the Connecticut minimum wage, plus 60% of earnings above that amount. The weekly benefit cannot exceed 60 times the minimum wage, which gives ${usdx(cap)} at the 2026 rate of ${rate$(now)}. Benefits last up to ${fl.maxWeeks} weeks in 12 months, with 2 extra weeks for incapacity during pregnancy.` },
    { q: 'When will Connecticut announce the 2027 minimum wage?', a: `State law requires the Labor Commissioner to announce the adjustment every October 15, effective the following January 1. The change follows the federal employment cost index. Until the new figure takes effect, the rate is ${rate$(now)} an hour. The CT Paid Leave cap is defined as a multiple of the minimum wage, so it shifts at the same time.` },
    { q: 'Do I get a lunch break if I work 8 hours in CT?', a: 'Yes. Connecticut requires a meal period of at least 30 consecutive minutes for anyone working seven and a half or more consecutive hours. It must come after the first 2 hours of work and before the last 2. On an 8-hour day beginning at 8 a.m., that places the break between 10 a.m. and 2 p.m. Paid rest breaks are not required for adults.' },
  ],
  related: ['state:new-york', 'state:massachusetts', 'state:rhode-island', 'paid-sick-leave-by-state', 'paid-family-leave-by-state', 'break-laws-by-state'],
});
