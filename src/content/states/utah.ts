import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, otCalc, rate$, usd, F, FM, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('utah');
const mw = mwNow('utah');
const cash = S.minWage.tipped.cashWage!;
const amt = (s: string | null | undefined, i = 0) => Number([...(s ?? '').matchAll(/\$(\d+(?:\.\d+)?)/g)][i][1]);
const trainee = amt(S.minWage.other);
const year = fullTimeAt(mw).annual;
const techRate = 22;
const wk = otCalc('utah', techRate, 9, 5);
const daily = techRate * 8;
const demandCap = daily * 60;

export default defineStatePage({
  slug: 'utah',
  title: `Utah Labor Laws 2026: ${rate$(mw)} Cap, Final Pay in 24 Hours`,
  description: `Utah in 2026: a ${rate$(mw)} wage the state may not exceed (${usd(year)} a year full time), ${rate$(cash)} for tipped staff, federal overtime, pay 24 hours after a firing.`,
  intro: 'Utah binds its own minimum wage to the federal one, forbids local wage ordinances and counts a fired worker\'s deadline in hours rather than paydays.',
  resume: `Utah's minimum wage is ${rate$(mw)} an hour in 2026, and state law keeps it there: the Labor Commission sets the rate by rule, but the statute says it may not exceed the federal minimum, and cities, towns and counties are barred from setting a higher one. Full time at that rate comes to ${usd(year)} a year before taxes. Tipped employees can be paid a cash wage of ${rate$(cash)} as long as tips bring every hour up to ${rate$(mw)}, and workers under 18 may start at ${rate$(trainee)} for their first 90 days. Utah has no overtime statute, so the federal rule of time and a half after ${F.otWeeklyHours} hours a week applies, enforced by the U.S. Department of Labor. There is no state paid sick leave or paid family leave, and adults have no break requirement. What stands out is the exit: a fired employee must be paid within 24 hours, and late wages can keep running for up to 60 days after a written demand.`,
  body: (h) => `
<h2>A wage floor that doubles as a ceiling</h2>
<p>States that write their own minimum wage usually do it to go above ${rate$(F.minWage)}. Utah does the reverse. The Minimum Wage Act lets the Labor Commission adjust the rate, but only up to the federal figure, so the state number and the federal number are both ${rate$(mw)} and will stay aligned unless the Legislature rewrites the statute or Congress moves the federal rate. A second statute shuts the local route: a city, town or county may not establish, mandate or require a minimum wage above the federal one, and that includes wages paid by its own contractors. A cashier in Park City therefore has the same legal floor as one in Vernal or St. George. Anything above it comes from the labor market, never from an ordinance.</p>
<p>The state act also steps aside for employees already covered by the federal Fair Labor Standards Act. In practice the federal law governs most Utah paychecks, and the state act fills the gaps for the few employers outside it.</p>
${h.mini('atWillState', stateArg('Utah'))}
<h2>The 24-hour rule when you are let go</h2>
<p>When an employer ends the job, Utah Code 34-28-5 makes the unpaid wages due immediately and gives the employer 24 hours from the separation to pay them at the usual place of payment. If that deadline passes, the worker can send a written demand. From the date of the demand, wages keep accruing at the worker's daily rate until the money arrives, capped at 60 days. Picture a warehouse lead earning $${techRate} an hour on eight-hour days: the daily rate is ${usd(daily)}, so a dispute that runs the full period could add as much as ${usd(demandCap)} on top of the original wages. The ${h.ext(S.finalPay.source!.url, 'statute')} sets out each step. Quitting works differently: unless a written contract fixed a definite term, the last pay is due on the next regular payday.</p>
<h2>Overtime and tips under federal rules</h2>
<p>With no Utah overtime law, the FLSA answers the question alone: time and a half after ${F.otWeeklyHours} hours in a workweek, no daily threshold, and salaried white-collar staff exempt only if they earn at least ${usd(F.exemptWeekly)} a week and meet the duties tests. A technician paid $${techRate} an hour who works five nine-hour days logs ${wk.otHours} overtime hours, and the week pays ${usd(wk.total)} rather than ${usd(techRate * 45)} at the straight rate. Claims go to the U.S. Department of Labor, not the state Labor Commission. Tipped workers follow the same federal pattern: a cash wage of ${rate$(cash)}, with the employer topping up any hour where tips fall short of ${rate$(mw)}. ${h.a('tipped-minimum-wage', 'Tipped wage rules in other states')} range from this credit to none at all.</p>
<h2>Benefits left to the employer</h2>
<p>The Labor Commission puts it in one line: Utah law generally does not require an employer to provide benefits. That covers vacation, holidays and sick days. If a company does adopt a policy or a practice, it is expected to follow it without discrimination, so a handbook that promises a payout of unused vacation at separation counts, and one that says nothing leaves you with no claim. Family leave runs on the federal FMLA, which needs ${FM.employerEmployees} employees within ${FM.radiusMiles} miles and ${FM.hours.toLocaleString('en-US')} hours worked in the past year. Adults have no meal or rest break rule, while workers under 18 must get a 30-minute lunch within the first five hours and a 10-minute break for each four hours. Utah is a right-to-work state, and employment is at will. The ${h.a('final-paycheck-laws', 'final paycheck comparison')} shows how far other states sit from the 24-hour mark.</p>`,
  faqs: [
    { q: 'Can a Utah city set its own minimum wage?', a: `No. Utah Code forbids cities, towns and counties from establishing, mandating or requiring a minimum wage above the federal minimum, and the ban reaches wages paid by their contractors too. Salt Lake City, Provo or Ogden cannot pass an ordinance like Seattle's, so the legal floor everywhere in the state is ${rate$(mw)} an hour. Employers remain free to pay more, and many do in a tight market.` },
    { q: 'How fast must a Utah employer pay a fired employee?', a: 'Within 24 hours of the separation. The wages become due immediately, and the employer has 24 hours to pay them at the usual place of payment. If it misses that deadline, you can send a written demand, after which your daily wages keep running until you are paid, for up to 60 days. The Labor Commission handles wage claims and decides each one on its facts.' },
    { q: 'Does Utah require paid sick leave or vacation?', a: `No. Utah law generally does not require private employers to provide vacation, holiday or sick pay, and there is no state paid family leave program. If your employer adopts a written policy or an established practice, it must follow that policy and apply it evenly. Unpaid job-protected leave comes only from the federal FMLA, which covers employers with ${FM.employerEmployees} or more employees and eligible workers.` },
    { q: 'What is the Utah training wage for workers under 18?', a: `Employers may pay a worker under 18 a training wage of ${rate$(trainee)} an hour during the first 90 days of employment, after which the regular ${rate$(mw)} applies. The federal youth wage, also ${rate$(F.youthWage)}, covers workers under ${F.youthAgeUnder} for their first ${F.youthDays} days. Minors are also owed a 30-minute lunch within their first five hours and a 10-minute break for each four hours worked.` },
  ],
  related: ['state:idaho', 'state:nevada', 'state:arizona', 'state:colorado', 'state:wyoming', 'final-paycheck-laws'],
});
