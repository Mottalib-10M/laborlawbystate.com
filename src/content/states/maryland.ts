import { defineStatePage } from '../../lib/page-types';
import { sd, mwNow, tippedCash, sickYear, rate$, usd, usdx, day, FM } from '../../lib/kit';
import { cityArg, stateArg } from '../../lib/mini-args';

const S = sd('maryland');
const now = mwNow('maryland');
const cash = tippedCash('maryland')!;
const teen = now * 0.85;
const mont = S.localMinWages.find((l) => l.name.startsWith('Montgomery'))!;
const tiers = mont.note!.match(/\(11-50\): \$(\d+\.\d{2}); small \(10 or fewer\): \$(\d+\.\d{2})/)!;
const montMid = Number(tiers[1]);
const montSmall = Number(tiers[2]);
const montTip = Number(mont.note!.match(/Tipped cash wage \$(\d+\.\d{2})/)![1]);
const howard = S.localMinWages.find((l) => l.name.startsWith('Howard'))!;
const sl = S.sickLeave;
const acc = sickYear('maryland', 30);
const famli = S.familyLeave;
const famCap = Number(famli.replacement!.match(/capped at \$([\d,]+)/)![1].replace(/,/g, ''));
const gap = (mont.rate - now) * 30 * 52;

export default defineStatePage({
  slug: 'maryland',
  title: `Maryland Wage Laws 2026: ${rate$(now)} State, ${rate$(mont.rate)} in Montgomery`,
  description: `Maryland in 2026: ${rate$(now)} state minimum wage, ${rate$(mont.rate)} at large Montgomery County employers since July, a ${rate$(cash)} tipped wage, sick leave and FAMLI pay from 2028.`,
  intro: 'A state wage frozen since 2024, county wages that move every July, and a paid family leave program pushed back to 2028.',
  resume: `Maryland's minimum wage is ${rate$(now)} an hour in 2026, the same since January 2024, with no automatic raise and nothing announced for 2027. Counties fill the gap: Montgomery County pays ${rate$(mont.rate)} at employers with 51 or more workers since ${day(mont.from)}, and Howard County ${rate$(howard.rate)}. Tipped employees may receive a cash wage of ${rate$(cash)} provided tips carry them to the full rate, and workers under 18 can be paid 85% of the state minimum, which is ${rate$(teen)}. Overtime is time and a half after 40 hours a week. Under the Healthy Working Families Act, employers with 15 or more employees owe paid sick and safe leave at ${sl.accrual}, up to ${sl.capHours} hours a year. The FAMLI paid family leave program will collect payroll contributions from January 2027 and pay benefits from ${day(famli.benefitsStart!)}.`,
  body: (h) => `
<h2>Three tiers in Montgomery County, set every July</h2>
<p>Maryland's own rate has not moved since 2024, so the interesting numbers are local. Montgomery County indexes its minimum wage each July 1 to inflation in the Washington region and sorts employers by size: ${rate$(mont.rate)} at 51 or more employees, ${rate$(montMid)} at 11 to 50 and ${rate$(montSmall)} at 10 or fewer, all since ${day(mont.from)}. Tipped staff there get a cash wage of at least ${rate$(montTip)}. Howard County reached ${rate$(howard.rate)} for every employer on ${day(howard.from)}, once its smaller businesses caught up, and plans inflation increases starting in January 2027. Take a cashier working 30 hours a week in Silver Spring for a chain store: compared with the state rate, the county figure adds ${usd(gap)} over a year. Prince George's County also has a local ordinance, listed with the others in the table further down.</p>
${h.mini('cityCompare', cityArg())}
<h2>FAMLI arrives late: contributions in 2027, checks in 2028</h2>
<p>The Family and Medical Leave Insurance program was delayed. Payroll contributions of 0.9% of wages, split evenly between employer and employee, start on January 1, 2027; employers with fewer than 15 workers pay only the employee half. Benefits begin on ${day(famli.benefitsStart!)}: up to ${famli.maxWeeks} weeks for a new child, a relative's serious illness or your own, and as many as 24 weeks in a year when your own health and a new child combine. The weekly payment is 90% of wages up to 65% of the state average weekly wage plus half of anything above, capped at ${usdx(famCap)} a week. Until then, the federal FMLA (${FM.weeks} unpaid weeks) and the Maryland Parental Leave Act, which gives 6 unpaid weeks to parents at employers with 15 to 49 employees, are the job protections available.</p>
<h2>Sick and safe leave, and the tipped wage</h2>
<p>Every Maryland employer must let workers accrue leave at one hour per ${sl.accrualPerHours} worked, but only those with 15 or more employees must pay for it; at smaller firms the hours are unpaid and job-protected. A 30-hour-a-week employee accrues ${Math.floor(acc.accrued)} hours over a year, yet the law lets the employer stop at ${acc.capped}, and the total balance may be capped at 64 hours. For tipped work, the ${rate$(cash)} cash wage is legal only if tips lift the worker to ${rate$(now)}, and restaurants must hand out a Tip Credit Wage Statement showing the calculation.</p>
${h.mini('tipTopUp', stateArg('Maryland'))}
<h2>Breaks, overtime quirks and the last paycheck</h2>
<p>Maryland has no general break law for adults. The exception is the Healthy Retail Employee Act, which applies to retail employers with 50 or more retail employees: a 15-minute break for a shift of 4 to 6 consecutive hours, 30 minutes for more than 6, and another 15 minutes for each extra 4 hours past 8. Bowling alleys and non-hospital residential care institutions use a 48-hour overtime threshold under state law, although the federal 40-hour rule may still bind them. Final wages are due on or before the next regular payday, and accrued vacation is owed unless a written policy shared at hiring says it is forfeited. The Division of Labor and Industry decides wage claims; an employment lawyer can advise on your facts.</p>`,
  faqs: [
    { q: 'Is the Maryland minimum wage going up in 2027?', a: `No statewide increase has been announced. The rate has been ${rate$(now)} an hour since January 1, 2024, and Maryland law has no automatic inflation adjustment. Some counties do adjust: Montgomery County raises its three tiers every July 1, and Howard County plans inflation increases from January 2027. Check your county if you work in either.` },
    { q: 'What is the Montgomery County MD minimum wage for small businesses?', a: `Since ${day(mont.from)}, employers with 10 or fewer employees in Montgomery County pay at least ${rate$(montSmall)} an hour, mid-size employers with 11 to 50 pay ${rate$(montMid)}, and those with 51 or more pay ${rate$(mont.rate)}. The tiers are recalculated each July 1 from the regional consumer price index. Tipped employees in the county must receive a cash wage of at least ${rate$(montTip)}.` },
    { q: 'When does Maryland FAMLI start paying benefits?', a: `Benefits are scheduled to start on ${day(famli.benefitsStart!)}, after a delay. Contributions of 0.9% of wages begin on January 1, 2027, shared equally by employer and employee, with small employers under 15 workers paying only the employee half. The program will pay up to ${famli.maxWeeks} weeks a year, up to 24 in some combined cases, with a maximum of ${usdx(famCap)} a week.` },
    { q: 'Does Maryland require paid sick leave at small companies?', a: `Not paid leave. Employers with 14 or fewer employees must allow workers to accrue up to ${sl.capHours} hours a year of sick and safe leave, but it can be unpaid; the job is still protected when you use it. Employers with 15 or more must pay for the hours, earned at one hour for every ${sl.accrualPerHours} worked.` },
  ],
  related: ['state:delaware', 'state:pennsylvania', 'state:virginia', 'state:district-of-columbia', 'city-minimum-wage', 'paid-family-leave-by-state'],
});
