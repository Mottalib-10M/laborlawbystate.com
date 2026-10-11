import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mw2027, rate$, usd, F, fullTimeAt } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('nebraska');
const mw = mwNow('nebraska');
const next = mw2027('nebraska')!;
const youth = S.minWage.rates2026.find((r) => r.area.startsWith('Youth'))!.rate;
const tip = S.minWage.tipped.cashWage!;
const sick = S.sickLeave;
const year = fullTimeAt(mw).annual;
const gain = fullTimeAt(next.rate).annual - year;

export default defineStatePage({
  slug: 'nebraska',
  title: `Nebraska Minimum Wage 2026: ${rate$(mw)}, Youth Rate and Sick Time`,
  description: `Nebraska in 2026: ${rate$(mw)} an hour, ${rate$(next.rate)} from January 2027, a new ${rate$(youth)} youth and training wage, sick time at 11+ employees, and no state overtime law.`,
  intro: 'A voter-approved wage that now climbs with smaller steps, a lower rate for teenagers since mid-2026 and sick time that skips the smallest shops.',
  resume: `Nebraska's general minimum wage is ${rate$(mw)} an hour in 2026 for employers with four or more workers, and it rises to ${rate$(next.rate)} on January 1, 2027. Since July 2026 an employer may also pay ${rate$(youth)} to 14- and 15-year-olds and, for their first 90 days, to new hires aged 16 to 19. A full-time adult at the general rate grosses ${usd(year)} a year before taxes. Tipped staff can receive a cash wage of ${rate$(tip)} as long as tips lift each hour to the full minimum. The state has no overtime statute of its own, so time and a half after ${F.otWeeklyHours} hours comes from the federal FLSA. Paid sick time, approved by voters in 2024, has applied since October 1, 2025, at employers with 11 or more employees: one hour per ${sick.accrualPerHours} worked, with up to ${sick.capHours} hours a year usable at firms of 20 or more. Unused vacation must be paid out when the job ends.`,
  body: (h) => `
<h2>A second, lower wage for teenagers</h2>
<p>The 2026 change most workers have not heard about is a youth rate. From mid-July, an employer may pay ${rate$(youth)} instead of ${rate$(mw)} to two groups: workers aged 14 or 15, and new employees aged 16 to 19 during their first 90 days, a training wage that seasonal and migrant workers cannot be paid. Both rates are optional, so an employer can keep paying teenagers the general rate. The difference is ${rate$(mw - youth)} an hour, or ${usd((mw - youth) * 20 * 13)} over a 13-week summer job of 20 hours a week. Students in bona fide vocational training can be paid 75 percent of the minimum, a separate exception from the youth and training rates.</p>
<p>The general rate keeps moving. The Department of Labor's updated chart puts it at ${rate$(next.rate)} on January 1, 2027, with further steps each January through 2030. For a 40-hour job the 2027 step is worth ${usd(gain)} a year, while the youth rate stays flat for several years.</p>
${h.mini('raiseTimeline', stateArg('Nebraska'))}
<h2>Sick time under the Healthy Families and Workplaces Act</h2>
<p>The 2024 ballot measure gave every worker a right to sick time; a 2025 amendment exempted employers with fewer than 11 employees before the law started on October 1, 2025. Hours accrue at one per ${sick.accrualPerHours} worked once you have 80 hours of consecutive employment. How much you can use depends on headcount: 40 hours a year at firms of 11 to 19, and ${sick.capHours} hours at firms of 20 or more. A full-timer accrues about ${Math.floor((40 * 52) / sick.accrualPerHours)} hours over a year, so at a larger employer the ${sick.capHours}-hour use limit binds before the accrual does. A 20-hour-a-week worker accrues about ${Math.floor((20 * 52) / sick.accrualPerHours)} hours, under both limits. Workers under 16 and seasonal or temporary farm workers are outside the act.</p>
${h.mini('sickAccrual', stateArg('Nebraska'))}
<h2>Overtime only by agreement under state law</h2>
<p>Nebraska's Wage Payment and Collection Act lets a worker claim overtime only if the employer agreed to pay it. Everyone else relies on the FLSA, which reaches most employers. A warehouse picker paid $18 who works 45 hours is owed 5 hours at $27 under federal law, ${usd(18 * 40 + 27 * 5)} for the week. Where the FLSA does not reach a small employer and nothing was agreed, Nebraska law adds no overtime of its own.</p>
<h2>Meal periods and the final check</h2>
<p>Only mechanical establishments, workshops and assembling plants must give a 30-minute meal break in each 8-hour shift; other employers set their own break policy. When a job ends, final wages are due on the next regular payday or within two weeks, whichever comes first, and earned vacation or PTO is part of that money. Sick hours earned under the 2025 act are not paid out unless the employer folds them into a single PTO bank. The Labor Standards office of the Department of Labor handles unpaid wage questions, and ${h.a('pto-payout-laws', 'vacation payout rules in other states')} vary widely.</p>`,
  faqs: [
    { q: 'Can Nebraska employers pay teenagers less than the minimum wage?', a: `Since July 2026, yes, within limits. An employer may pay ${rate$(youth)} an hour to 14- and 15-year-olds, and the same training wage to new hires aged 16 to 19 for their first 90 days, but not to seasonal or migrant workers. Both are optional. After 90 days, a 16- to 19-year-old must receive the general ${rate$(mw)} rate.` },
    { q: 'Does a small Nebraska business have to give paid sick leave?', a: `Not if it has fewer than 11 employees. A 2025 amendment limited the Healthy Families and Workplaces Act to employers with 11 or more. Firms with 11 to 19 employees must allow 40 hours of use a year, and firms with 20 or more must allow ${sick.capHours}. Accrual is one hour per ${sick.accrualPerHours} hours worked.` },
    { q: 'How much will the Nebraska minimum wage be in 2027?', a: `${rate$(next.rate)} an hour from January 1, 2027, according to the Nebraska Department of Labor chart updated in July 2026, up from ${rate$(mw)}. The chart lists smaller yearly increases after that through 2030. The rate applies to employers with four or more employees; the optional youth and training wage stays at ${rate$(youth)}.` },
    { q: 'Is unused PTO paid out when you leave a job in NE?', a: 'Yes. Nebraska treats earned but unused vacation or PTO as wages owed at separation, whatever the reason the job ended. Employers do not have to offer vacation at all, but once it is earned it must be paid with the final wages, due on the next regular payday or within two weeks. Sick time kept in a separate bank is not paid out.' },
  ],
  related: ['state:iowa', 'state:kansas', 'state:missouri', 'state:south-dakota', 'paid-sick-leave-by-state', 'minimum-wage-increases'],
});
