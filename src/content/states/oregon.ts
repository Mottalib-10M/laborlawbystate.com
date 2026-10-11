import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, mwOn, rate$, usd, F, FM, fullTimeAt, sickYear } from '../../lib/kit';
import { stateArg } from '../../lib/mini-args';

const S = sd('oregon');
const PDX = 'Portland metro (urban growth boundary)';
const STD = 'Standard (most counties)';
const RURAL = 'Non-urban counties';
const now = '2026-10-11';
const pdx = mwOn('oregon', now, PDX)!;
const std = mwNow('oregon');
const rural = mwOn('oregon', now, RURAL)!;
const stdSpring = mwOn('oregon', '2026-06-30', STD)!;
const pdxYear = fullTimeAt(pdx).annual;
const ruralYear = fullTimeAt(rural).annual;
const sick = sickYear('oregon', 40);
const fl = S.familyLeave;
const penaltyRate = 20;
const penaltyMax = penaltyRate * 8 * 30;

export default defineStatePage({
  slug: 'oregon',
  title: `Oregon Minimum Wage 2026: Three Regions, ${rate$(pdx)} in Portland`,
  description: `Oregon in 2026: ${rate$(pdx)} in Portland metro, ${rate$(std)} standard and ${rate$(rural)} rural since July 1, no tip credit, ${fl.maxWeeks} weeks of Paid Leave Oregon, paid rest breaks.`,
  intro: 'Oregon sets its minimum wage by geography, resets it each July and refuses to let tips count toward it.',
  resume: `Oregon pays three minimum wages at once, and the one you are owed depends on where you work: ${rate$(pdx)} an hour inside the Portland urban growth boundary, ${rate$(std)} in most counties and ${rate$(rural)} in eighteen non-urban counties, all in force since July 1, 2026. The rates move every July rather than every January, following inflation, so the standard rate rose from ${rate$(stdSpring)} at midyear. Tips never reduce the wage: servers and bartenders get the full regional rate, with no tip credit. A full-time job at the Portland rate comes to ${usd(pdxYear)} a year before taxes. Overtime follows the ${F.otWeeklyHours}-hour week. Every worker earns sick time, up to ${S.sickLeave.capHours} hours a year, and Paid Leave Oregon covers up to ${fl.maxWeeks} weeks of family or medical leave with partial pay. Adults are owed a paid ten-minute rest for each four hours and an unpaid half-hour meal on longer shifts.`,
  body: (h) => `
<h2>Where your workplace sits decides your rate</h2>
<p>Oregon splits its general minimum wage into three bands written into state law. The Bureau of Labor and Industries (BOLI) applies the Portland metro rate to any job located inside the urban growth boundary drawn around Portland, the standard rate to most of the state, and a lower rate to eighteen counties such as Baker, Coos, Klamath, Malheur and Umatilla. The bands are pinned to each other: Portland sits ${rate$(pdx - std)} above the standard figure and the non-urban rate ${rate$(std - rural)} below it. What counts is the work location, not the employer's head office or your home address, so two warehouses of the same company, one inside the boundary and one in Umatilla County, pay different floors.</p>
<p>The gap adds up. Full time at ${rate$(pdx)} pays ${usd(pdxYear)} a year; the same schedule at ${rate$(rural)} pays ${usd(ruralYear)}, a difference of ${usd(pdxYear - ruralYear)}. Minors earn the same rate as adults.</p>
${h.mini('raiseTimeline', stateArg('Oregon'))}
<h2>The July reset and the tip rule</h2>
<p>Most states raise wages on January 1. Oregon adjusts the standard rate to the consumer price index and applies it on July 1, then derives the two other bands from it. A worker who starts a job in May will therefore see a raise before the summer. Tipped workers are part of the same system with nothing subtracted: BOLI states plainly that tip credits are illegal, so a Portland server earns ${rate$(pdx)} an hour from the employer and keeps tips on top. Federal law would allow a cash wage of ${rate$(F.tippedCash)}; Oregon does not. ${h.a('tipped-minimum-wage', 'Tipped wage rules elsewhere')} vary widely.</p>
<h2>Sick time, OFLA and Paid Leave Oregon</h2>
<p>Sick time builds at one hour per ${S.sickLeave.accrualPerHours} worked, so a full-time employee reaches the ${S.sickLeave.capHours}-hour annual cap after about ${Math.ceil((S.sickLeave.capHours! * S.sickLeave.accrualPerHours!) / 40)} weeks; over a year the raw accrual would be ${Math.round(sick.worked / S.sickLeave.accrualPerHours!)} hours, so the cap binds. The hours are paid at employers with 10 or more Oregon employees, or 6 or more with a Portland location; smaller firms must still protect the time, unpaid. Paid Leave Oregon is a separate insurance program that replaces part of your wages, up to all of them for lower earners, during up to ${fl.maxWeeks} weeks for a new child, a relative's serious illness or your own, with up to two extra weeks for pregnancy limitations. The older Oregon Family Leave Act, at employers with 25 or more workers, keeps unpaid protected leave for situations such as a sick child or bereavement. The federal FMLA, with its ${FM.hours.toLocaleString('en-US')}-hour test, runs alongside both.</p>
<h2>Breaks during the shift</h2>
<p>Oregon is one of the few states that requires paid rest for adults: ten minutes for each four-hour segment, two in a standard eight-hour day, plus an unpaid 30-minute meal when the work period lasts six hours or more and you are relieved of all duties. ${h.a('break-laws-by-state', 'Break laws in other states')} are often silent on rest time.</p>
<h2>Last paycheck deadlines and the penalty</h2>
<p>A fired employee must be paid by the end of the next business day. Someone who quits with at least 48 hours' notice, not counting weekends and holidays, is paid on the last day; with less notice, within five business days or by the next payday, whichever comes first. Vacation is paid out only if a policy or agreement promises it. Late wages are costly for employers: penalty wages of eight times the regular rate for each day unpaid, up to 30 days. For someone earning $${penaltyRate} an hour, that ceiling reaches ${usd(penaltyMax)}. Claims go to BOLI, whose staff rule on the specific situation.</p>`,
  faqs: [
    { q: 'Which Oregon minimum wage applies if I live outside Portland but work there?', a: `The Portland metro rate, ${rate$(pdx)} an hour since July 1, 2026, because Oregon looks at where the work is performed, not where you live. If your job site is inside the Portland urban growth boundary, that rate is the floor. A worker whose home county uses the standard rate of ${rate$(std)} gets the higher figure for the work done inside the boundary.` },
    { q: 'Can an Oregon restaurant pay servers less because of tips?', a: `No. Oregon bans tip credits entirely, so tips cannot be counted toward the minimum wage. A server must receive at least the regional minimum from the employer, ${rate$(std)} under the standard rate or ${rate$(pdx)} in Portland metro, and keeps tips on top. This is stricter than federal law, which lets employers in many states pay a cash wage of ${rate$(F.tippedCash)}.` },
    { q: 'Is Oregon sick time paid at a small business?', a: `It depends on headcount. Employers with 10 or more employees in Oregon, or 6 or more if they have a location in Portland, must pay sick time. Smaller employers must let workers earn and use up to ${S.sickLeave.capHours} hours a year, but the time can be unpaid. Accrual is one hour per ${S.sickLeave.accrualPerHours} hours worked, and the time can be used after 90 days on the job.` },
    { q: 'How fast must an Oregon employer pay a fired worker?', a: `By the end of the next business day after the firing. If the employer is late, it can owe penalty wages equal to eight times the regular hourly rate for each day the pay is late, for up to 30 days. Unused vacation is included only when a policy or agreement promises a payout. BOLI is the agency that investigates unpaid wage complaints.` },
  ],
  related: ['state:washington', 'state:california', 'state:idaho', 'state:nevada', 'tipped-minimum-wage', 'paid-family-leave-by-state'],
});
