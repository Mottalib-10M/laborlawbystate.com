import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, rate$, usd, F, FM, fullTimeAt, otCalc, finalPayDate, day } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('texas');
const mw = mwNow('texas');
const year = fullTimeAt(mw).annual;
const ot = otCalc('texas', 15, 9, 5);
const lastDay = '2026-10-02';
const due = finalPayDate('texas', lastDay)!;

export default defineStatePage({
  slug: 'texas',
  title: `Texas Labor Laws 2026: ${rate$(mw)} Minimum Wage, Overtime, Breaks`,
  description: `Texas labor laws in 2026: the minimum wage stays at the federal ${rate$(mw)}, overtime follows the federal FLSA, and a final paycheck is due ${S.finalPay.firedDays} days after a firing.`,
  intro: 'Texas leaves most pay rules to federal law, forbids cities from raising wages and adds one firm deadline of its own: the sixth day after a dismissal.',
  resume: `Texas has the same minimum wage as federal law, ${rate$(mw)} an hour, because the Texas Minimum Wage Act adopts the federal figure instead of setting its own. A full-time job at that rate pays ${usd(year)} a year before taxes. Tipped employees can be paid a cash wage of ${rate$(F.tippedCash)} as long as tips bring them to the minimum. Texas has no overtime statute for private employers, so the federal rule applies: time and a half after ${F.otWeeklyHours} hours in a workweek, with no daily overtime. There is no state paid sick leave, no paid family leave program and no meal or rest break law for adults. What Texas does regulate is the last paycheck: a worker who is fired must be paid in full no later than the sixth day after the discharge, and one who quits by the next regular payday.`,
  body: (h) => `
<h2>A state rate that follows Washington</h2>
<p>The Texas Labor Code does not name a dollar figure. It says the state minimum wage is the federal one, so when the federal rate last changed, on ${day(F.minWageSince)}, Texas moved with it, and it will move again only if Congress acts. Cities have no way around that: the same chapter says the state minimum overrides any city ordinance or charter on private-sector wages, except on public contracts. Austin, Dallas, Houston and San Antonio can pay their own employees more, and many large private employers in the state pay well above the floor, but no local law can require it. The practical effect is that a worker in Texas compares offers on pay alone; the law guarantees ${rate$(mw)} and nothing above it.</p>
${h.mini('stateCompare', stateArg())}
<h2>Overtime: the federal rule, week by week</h2>
<p>With no state overtime statute, the Fair Labor Standards Act decides. Hours count by workweek, a fixed run of seven days that the employer chooses, and a long day does not trigger overtime by itself. A cook earning $15 an hour who works five 9-hour shifts reaches 45 hours, so the week pays 40 straight hours and 5 at time and a half, ${usd(ot.total)} in all. Two weeks cannot be averaged, so 50 hours one week and 30 the next still means 10 overtime hours in the first. Salaried staff are exempt only if they pass the federal duties test and earn at least ${usd(F.exemptWeekly)} a week; there is no higher Texas level. ${h.a('exempt-vs-non-exempt', 'The exemption guide')} explains the duties side.</p>
<h2>The sixth-day rule for final pay</h2>
<p>This is where Texas is stricter than federal law, which sets no deadline at all. If you are let go, the employer must pay everything you are owed within six days of the discharge: a dismissal on ${day(lastDay)} means pay by ${day(due)} at the latest. If you resign, the deadline is the next regular payday. Vacation, sick or severance pay counts as wages only if a written policy or agreement promises it, so the handbook decides whether unused days are paid out. Unpaid wages can be claimed with the Texas Workforce Commission, which handles wage claims without a lawyer.</p>
<h2>Leave and breaks are up to the employer</h2>
<p>Texas law requires neither paid sick days nor lunch breaks for adults. Leave rights come from federal law: the FMLA gives up to ${FM.weeks} weeks of unpaid, job-protected leave if your employer has ${FM.employerEmployees} or more employees and you meet the service and hours tests. Breaks, when given, follow the federal rule that short rest breaks are paid time and a real meal period of 30 minutes or more can be unpaid. ${h.a('fmla', 'The FMLA calculator')} checks your eligibility.</p>
<h2>Unions and dismissal</h2>
<p>Texas is a right-to-work state: no one can be required to join a union or pay dues to keep a job, and dues can be taken from a paycheck only with the worker's written consent. Employment is at will, so an employer may end it without giving a reason, but not for a reason the law forbids, such as discrimination or retaliation for a wage claim.</p>`,
  faqs: [
    { q: 'What is the minimum wage in Texas in 2026?', a: `It is ${rate$(mw)} an hour, the same as the federal minimum wage, because Texas law adopts the federal rate. Tipped employees may be paid ${rate$(F.tippedCash)} in cash if tips bring them to ${rate$(mw)}. No Texas city can set a higher private-sector minimum, and no increase is scheduled unless Congress raises the federal rate.` },
    { q: 'Does Texas have daily overtime?', a: `No. Texas has no overtime law of its own for private employers, so the federal Fair Labor Standards Act applies: time and a half for hours over ${F.otWeeklyHours} in a workweek. A 12-hour day does not create overtime unless the weekly total passes ${F.otWeeklyHours}. Some public employees and workers under a union contract may have different terms.` },
    { q: 'How long does a Texas employer have to give a final paycheck?', a: `If you are fired or laid off, the employer must pay all wages owed within ${S.finalPay.firedDays} days of the discharge. If you quit, payment is due by the next regularly scheduled payday. Unused vacation is owed only if a written policy or agreement says so. A late payment can be claimed through the Texas Workforce Commission wage claim process.` },
    { q: 'Are Texas employers required to give lunch breaks?', a: 'No state law requires meal or rest breaks for adult employees in Texas. When an employer offers a short break of about 5 to 20 minutes, federal law treats it as paid work time. A meal period of 30 minutes or more can be unpaid if you are fully relieved of duty. Many employers set breaks by policy.' },
  ],
  related: ['state:oklahoma', 'state:louisiana', 'state:new-mexico', 'overtime-laws-by-state', 'final-paycheck-laws', 'right-to-work-states'],
});
